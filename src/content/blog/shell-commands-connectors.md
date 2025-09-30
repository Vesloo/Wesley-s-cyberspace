---
title: 'Les opérateur de contrôle Linux'
description: 'Liste des opérateurs de contrôle utilisable sur Linux'
pubDate: 'Sep 30 2025'
heroImage: '../../assets/linux.png'
---

# Les opérateurs dans le shell de linux
Dans Linux, il existe des opérateurs utilisé dans certaines commandes bash.

Ils décident :
- si la commande suivante doit être lancée ou non ;
- si la commande suivante doit être lancée en parallèle ;
- si le flux de sortie (stdout) de la première commande doit servir d’entrée à la seconde.

## Voici la liste des opérateurs dans l'ordre d'apparition le plus courant 
#### 1\. &  – lancement en arrière-plan
   
Ex. : longue_tâche &
Le shell ne bloque pas, affiche le PID et rend la main tout de suite.

#### 2\. ;  – séquence « toujours »
   
Ex. : cmd1 ; cmd2
cmd2 est lancée quoi qu’il arrive (succès ou échec de cmd1).

#### 3\. && – « ET logique »
   
Ex. : ./configure && make
make n’est exécuté que si configure se termine avec le code 0 (succès).

#### 4\. || – « OU logique »
   
Ex. : ping -c1 8.8.8.8 || echo "Pas de réseau"
Le message n’apparaît que si ping échoue (code ≠ 0).

#### 5\. |  – pipe
   
Ex. : ls -l | grep pdf
La sortie standard de ls devient l’entrée standard de grep.
Variante |& : redirige stdout ET stderr (bash 4+).

#### 6\. \>&, <& – duplication de descripteurs
   
Ex. : cmd 2>&1 recopie la sortie d’erreur (2) sur la sortie standard (1).

## Petit moyen mnémotechnique
- &  → « background »
- ;  → « séquence, on s’en fout du résultat »
- && → « seulement si succès »
- || → « seulement si échec »
- |  → « passage de données »