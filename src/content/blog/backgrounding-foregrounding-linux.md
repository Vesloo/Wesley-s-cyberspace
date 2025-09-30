---
title: 'Backgrounding et foregrounding Linux'
description: 'Changer de second plan à premier plan (background foreground) dans linux'
pubDate: 'Sep 15 2025'
heroImage: '../../assets/linux.png'
---

# Backgrounding et foregrounding sur Linux.
## Backgrounding
Il y a plusieurs méthodes pour lancer ou placer une tâche en arrière plan ou en "background" sur Linux.

### Méthode 1
```sh
~/$ echo "test" &
[1] 16753
~/$ #(lancer une commande)
```

### Méthode 2
Mais également, lorsqu'un script est en cours d'exécution, il y a la possibilité d'appuyer sur **CTRL+Z**.
Cela va éxécuter le script en arrière plan, et pendant ce temps, permet de libérer le terminal pour lancer d'autres commandes en même temps.

## Foregrounding
Maintenant que nous avons notre processus ou tâche exécutée en arrière plan, nous aimerions la faire revenir en premier plan!
Pour cela, nous pouvons consulter nos processus en arrière plan avec la commande **ps aux**.

```sh
~/$ ps aux
#1 root      20   0  103724  12572   8320 S   0.0   0.6   0:01.60 systemd                                                 
#2 root      20   0       0      0      0 S   0.0   0.0   0:00.00 kthreadd                                                
#16753 root  0  -20       0      0      0 I   0.0   0.0   0:00.00 backgrounded.sh
```

Notre processus est bien actif et en arrière plan!

Maintenant, pour le ramener en premier plan, on utilise la commande **fg**

```sh
~/$ fg
```

fg pour "foreground".
après cette commande, notre processus retourne directement en premier plan.