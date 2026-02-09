# PEARL - Digital Studio Website

> A premium digital studio website built with Astro, React, and Tailwind CSS.

**Live Site**: https://pearl-agency.com

---

## ✨ Features

- 🎨 **Minimalist Design** - Clean, premium aesthetic with subtle animations
- ⚡ **Blazing Fast** - Built with Astro for optimal performance
- 📱 **Fully Responsive** - Perfect on all devices
- 🔍 **SEO Optimized** - Complete meta tags, structured data, sitemap
- ♿ **Accessible** - WCAG compliant, semantic HTML
- 🎬 **Video Portfolio** - Showcasing projects with smooth lazy-loading
- 📧 **Contact Form** - Serverless function integration with Netlify

## 🏗️ Project Structure

```text
/
├── public/
│   ├── images/          # Images and assets
│   ├── videos/          # Portfolio videos
│   ├── robots.txt       # SEO crawling instructions
│   └── favicon.*        # Favicons
├── src/
│   ├── components/      # React components
│   │   ├── Header.tsx
│   │   ├── StartProject.tsx
│   │   ├── Creations.tsx
│   │   ├── About.tsx
│   │   └── StructuredData.astro
│   ├── layouts/
│   │   └── Layout.astro # Main layout with SEO
│   ├── pages/           # File-based routing
│   │   ├── index.astro
│   │   ├── creations.astro
│   │   └── about.astro
│   └── types.ts         # TypeScript types
├── netlify/
│   └── functions/       # Serverless functions
│       └── sendEmail.ts
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind CSS config
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🎯 Performance

This site is heavily optimized for performance:

- ✅ Static site generation (SSG)
- ✅ Minimal JavaScript (only where needed)
- ✅ CSS code splitting
- ✅ Lazy loading for videos
- ✅ Optimized font loading
- ✅ Preconnect to external domains
- ✅ Manual chunk splitting for vendors

**Expected Lighthouse Scores**: 90-100 across all metrics

## 📊 SEO Features

- Complete meta tags (title, description, Open Graph, Twitter Cards)
- Structured data (JSON-LD) for Organization and Portfolio
- Auto-generated sitemap
- Canonical URLs
- robots.txt configured
- Semantic HTML

See [SEO-PERFORMANCE-OPTIMIZATIONS.md](./SEO-PERFORMANCE-OPTIMIZATIONS.md) for details.

## 🚀 Deployment

### Netlify (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

The `netlify.toml` file is already configured.

### Vercel

```bash
npm install -g vercel
vercel --prod
```

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) 5.x
- **UI Library**: [React](https://react.dev) 19.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 3.x
- **Icons**: [Lucide React](https://lucide.dev)
- **Email**: [Nodemailer](https://nodemailer.com) via Netlify Functions
- **Deployment**: Netlify
- **Language**: TypeScript

## 📝 License

© 2024-2026 PEARL Digital Studio. All rights reserved.

---

Built with ❤️ by Alexis & Marion
