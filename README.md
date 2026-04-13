# Aluminum Coil B2B Website

Node.js + Express + EJS website for an aluminum coil trading company.

## Features
- Professional industrial UI
- SEO-friendly pages (meta tags, canonical links, sitemap.xml, robots.txt)
- Shared header/footer partials for maintainability
- RFQ form on Contact page sends email via SMTP

## Pages
- Home
- Products (Aluminum Coil)
- About Us
- Sourcing Capability
- Contact / RFQ

## Run locally
```bash
npm install
cp .env.example .env
npm start
```

Configure SMTP variables in `.env` before using RFQ email delivery.
