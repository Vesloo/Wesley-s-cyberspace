---
title: '13 commandes utiles NestJS'
description: "13 commandes utiles pour la création, la modification et le lancement d'un projet nestJS"
pubDate: 'Aug 10 2025'
heroImage: '../../assets/nestjs.png'
---
# Guide Pratique des Commandes NestJS Essentielles

## 1. Démarrer un projet

### Installer Nest globalement
**Exemple**:  
```bash
npm install -g @nestjs/cli
```

**Utilité**: Installe le CLI NestJS globalement (nécessaire pour créer/gérer des projets Nest).  

### Initialiser un projet Nest
**Exemple**:  
```bash
nest new mon-api
```

**Utilité**: Crée un nouveau projet NestJS avec une structure de base préconfigurée.  

### Lancer le projet en mode dev
**Exemple**:  
```bash
cd mon-api && npm run start:dev
```

**Utilité**: Lance le serveur en mode développement avec rechargement automatique.  

### Infos sur le projet
**Exemple**:  
```bash
nest info
```

**Utilité**: Affiche les versions des packages NestJS et l'environnement système.  

## 2. Modifier/Développer le projet

### Génerer un module
**Exemple**:  
```bash
nest generate module users
```

**Utilité**: Génère un nouveau module (structure de base + fichier module).  

### Generer un controller
**Exemple**:  
```bash
nest generate controller users
```

**Utilité**: Crée un contrôleur avec son fichier et fichier de test.  

### Generer un service
**Exemple**:  
```bash
nest generate service users
```

**Utilité**: Génère un service injectable avec son fichier de test.  

### Generer un crud 
**Exemple**:  
```bash
nest generate resource users
```

**Utilité**: Génère un crud avec ses fichiers de test.  

### Installer un package
**Exemple**:  
```bash
npm install @nestjs/config
```

**Utilité**: Ajoute une dépendance au projet.  (fonctionne pour les package hors nestJS)

### Tests
**Exemple**:  
```bash
npm run test
```

**Utilité**: Exécute les tests unitaires.  

## 3. Finaliser/Déployer le projet

### Build
**Exemple**:  
```bash
npm run build
```

**Utilité**: Compile le projet en production dans le dossier `dist/`.  

### Prod
**Exemple**:  
```bash
npm run start:prod
```

**Utilité**: Lance l'application en mode production (après build).  

### Audit
**Exemple**:  
```bash
npm audit
```

**Utilité**: Vérifie les vulnérabilités dans les dépendances.  

### Bonus : Options utiles
- `--dry-run` : Simule une commande sans effets (ex: `nest new mon-api --dry-run`)
- `--no-spec` : Génère des fichiers sans tests (ex: `nest generate service users --no-spec`)
- `--help` : Affiche l'aide pour une commande (ex: `nest generate --help`)