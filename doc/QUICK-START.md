# 🚀 Quick Start - PEARL

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Netlify (Recommended)

```bash
# Option 1: Via Netlify CLI
npm install -g netlify-cli
netlify login
netlify deploy --prod

# Option 2: Via Git (automatic)
# 1. Push to GitHub
# 2. Connect repo in Netlify dashboard
# 3. Deployments happen automatically on push
```

### Vercel

```bash
npm install -g vercel
vercel --prod
```

## Environment Variables

Create a `.env` file for email functionality:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=contact@pearl-agency.com
```

## Important URLs

- **Development**: http://localhost:4321
- **Production**: https://pearl-agency.com
- **Sitemap**: https://pearl-agency.com/sitemap-index.xml
- **Robots**: https://pearl-agency.com/robots.txt

## Key Files

```
📁 Configuration
├── astro.config.mjs       → Astro setup
├── tailwind.config.mjs    → Tailwind CSS
├── netlify.toml           → Netlify deploy config
└── tsconfig.json          → TypeScript config

📁 Source
├── src/layouts/Layout.astro     → Main layout with SEO
├── src/pages/*.astro            → Routes (file-based)
├── src/components/*.tsx         → React components
└── src/types.ts                 → TypeScript types

📁 Content
├── public/images/               → Images
├── public/videos/               → Portfolio videos
└── public/robots.txt            → SEO config

📁 Server
└── netlify/functions/sendEmail.ts  → Email function
```

## Performance Checklist

Before deploying:

- [ ] Optimize videos (< 3MB each)
- [ ] Create OG image (1200x630px)
- [ ] Test email form
- [ ] Check all pages on mobile
- [ ] Run Lighthouse test
- [ ] Submit sitemap to Google Search Console

## Troubleshooting

### Build fails
```bash
# Clear cache and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Videos not loading
- Check videos are in `/public/videos/`
- Verify WebM format
- Check file permissions

### Email not sending
- Verify Netlify environment variables
- Check email credentials
- Test locally with `netlify dev`

## Need Help?

1. Check [SEO-PERFORMANCE-OPTIMIZATIONS.md](./SEO-PERFORMANCE-OPTIMIZATIONS.md)
2. Check [MIGRATION-SUMMARY.md](./MIGRATION-SUMMARY.md)
3. Check [Astro Docs](https://docs.astro.build)

---

Made with ❤️ by PEARL Studio
