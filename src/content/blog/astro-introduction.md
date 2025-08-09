---
title: 'Astro - Introduction'
description: "Une introduction au framework astro js"
pubDate: 'Aug 09 2025'
heroImage: '../../assets/astro-logo-dark.png'
---

# Introduction à Astro.js  
Un guide rapide pour démarrer avec le framework full-stack orienté **contenu**.

---

## Qu’est-ce qu’Astro.js ?

Astro est un **framework web moderne** qui vous permet de **construire des sites ultra-rapides** en générant le plus de HTML possible à la compilation (approche **SSG** – *Static Site Generation*) tout en gardant la possibilité d’hydrater **uniquement** les composants qui nécessitent de l’interactivité (technique du **partial hydration**).

- **Zéro JS par défaut**  
- **Compatible** avec React, Preact, Svelte, Vue, Solid, Alpine, Lit…  
- **TypeScript** natif  
- **Routage basé sur le système de fichiers**  
- **Optimisations automatiques** (images, CSS, code-splitting…)

---

## Installation

### Prérequis
- Node.js ≥ 18.14.1  
- npm / pnpm / yarn

### Créer un projet
Si vous n'avez pas créé le dossier
```bash
npm create astro@latest mon-site
# ou
pnpm create astro@latest mon-site
# ou
yarn create astro mon-site
```

Si vous avez déjà créé le dossier
```bash
npm create astro@latest .
# ou
pnpm create astro@latest .
# ou
yarn create astro .
```

Se déplacer dans le dossier et lancer le serveur :
```bash
cd mon-site
npm install
npm run dev
``` 

Votre site est accessible sur [http://localhost:4321](http://localhost:4321).

---

## Arborescence par défaut
```txt
mon-site/
├─ src/
│  ├─ components/       # composants Astro / React / Vue …
│  ├─ layouts/          # gabarits de pages
│  ├─ pages/            # routing automatique
│  └─ styles/           # CSS global ou modules
├─ public/              # fichiers statiques (images, fonts…)
├─ astro.config.mjs     # configuration Astro
└─ package.json
```
 
--- 

## Premier composant .astro
Un composant Astro contient HTML + CSS + JS dans un même fichier :
```astro
---
// Script "frontmatter" (serveur uniquement)
const salutation = "Astro";
---

<style>
  h1 { color: #ff5d01; }
</style>
<h1>Bonjour {salutation} !</h1>
```

- Le bloc `---` s’exécute **au build** (pas dans le navigateur).  
- Aucun JavaScript n’est envoyé au client sauf si vous l’hydratez explicitement.

---

## Utiliser un framework (ex. React)

1. Installez l’adaptateur :
```bash
   npx astro add react
```

2. Créez un composant React :
```tsx
   // src/components/Counter.tsx
   export default function Counter() {
     const [count, setCount] = useState(0);
     return (
       <button onClick={() => setCount(count + 1)}>
         Cliqué {count} fois
       </button>
     );
   }
```

3. Importez et hydratez dans une page `.astro` :
```astro
---
import Counter from '../components/Counter';
---
<Counter client:load />
```
   - `client:load` hydrate le composant **au chargement**.  
   - Autres directives : `client:idle`, `client:visible`, `client:media`.

---

## Routage

Les fichiers dans `src/pages/` deviennent des routes :

| Fichier | URL |
|---|---|
| `index.astro` | `/` |
| `about.astro` | `/about` |
| `blog/[slug].astro` | `/blog/mon-article` (routes dynamiques) |

---

## Markdown & MDX

Astro intègre **nativement** Markdown.

1. Activez l’intégration :
```bash
npx astro add mdx
```

2. Créez `src/pages/blog/mon-post.mdx` :
```mdx
---
title: Mon premier post
description: "Description de mon premier post"
pubDate: 'Aug 09 2025'
heroImage: '../../assets/image-de-mon-premier-post.jpg'
---

# {frontmatter.title}
Publié le {frontmatter.date}

<Counter client:load />  <!-- composant React dans Markdown -->
```

---

## Build & déploiement

Générer le site statique :
```bash
npm run build
```
Le dossier `dist/` contient les fichiers prêts à être hébergés sur **Netlify, Vercel, GitHub Pages, Cloudflare Pages, Firebase Hosting…**

---

## Commandes utiles

| Tâche | Commande |
|---|---|
| Développement | `npm run dev` |
| Build | `npm run build` |
| Prévisualisation | `npm run preview` |
| Lint & format | `npm run check` |

---

## Ressources officielles

- Documentation complète : [https://docs.astro.build](https://docs.astro.build)  
- Playground en ligne : [https://astro.new](https://astro.new)  
- Dépôt GitHub : [https://github.com/withastro/astro](https://github.com/withastro/astro)

---

> Astro est idéal pour **blogs, documentations, sites vitrine ou e-commerce** où la performance et le SEO sont primordiaux.  
> Happy hacking 🚀