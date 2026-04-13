# Aluminum Coil B2B Website (Pure Static)

This project is now a pure static website for an aluminum coil trading company.

## Pages
- Home (`index.html`)
- Products (`products.html`)
- About Us (`about.html`)
- Sourcing Capability (`sourcing.html`)
- Contact / RFQ (`contact.html`)

## Reusable layout
Header and footer are reused via static partial files:
- `partials/header.html`
- `partials/footer.html`
- loaded by `public/js/include-layout.js`

## SEO files
- `sitemap.xml`
- `robots.txt`
- page-level title/description/canonical tags

## RFQ form (static)
Contact form posts to FormSubmit:
- Update `your-email@example.com` in `contact.html`
- Update `_next` and canonical URLs to your real domain

## Local preview
Any static host works. Example:
```bash
python3 -m http.server 3000
```
Open `http://localhost:3000`.
