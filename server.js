const express = require('express');
const path = require('path');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const COMPANY_NAME = 'Global Aluminum Coil Trading';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const pages = {
  home: {
    title: 'Trusted Aluminum Coil Trading Partner | Fast Global Quotations',
    description:
      'Global Aluminum Coil Trading provides reliable aluminum coil sourcing, quality supplier coordination, and fast quotations for importers, factories, and distributors worldwide.',
    canonical: '/'
  },
  products: {
    title: 'Aluminum Coil Products for Importers & Distributors',
    description:
      'Explore aluminum coil grades, tempers, and thickness options sourced through qualified supplier networks for industrial applications.',
    canonical: '/products'
  },
  about: {
    title: 'About Our Aluminum Coil Trading Company',
    description:
      'Learn how our trading-first model helps global buyers source aluminum coil efficiently with transparent communication and dependable execution.',
    canonical: '/about'
  },
  sourcing: {
    title: 'Global Aluminum Coil Sourcing Capability',
    description:
      'Our sourcing capability combines supplier vetting, compliance checks, logistics coordination, and responsive support to reduce procurement risk.',
    canonical: '/sourcing'
  },
  contact: {
    title: 'Contact Us | Request Fast Aluminum Coil RFQ',
    description:
      'Send your aluminum coil requirement and email to receive a fast quotation from our sourcing team.',
    canonical: '/contact'
  }
};

const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

function renderPage(res, view, key, extra = {}) {
  return res.render(view, {
    meta: pages[key],
    baseUrl,
    companyName: COMPANY_NAME,
    currentPath: pages[key].canonical,
    ...extra
  });
}

app.get('/', (req, res) => renderPage(res, 'home', 'home'));
app.get('/products', (req, res) => renderPage(res, 'products', 'products'));
app.get('/about', (req, res) => renderPage(res, 'about', 'about'));
app.get('/sourcing', (req, res) => renderPage(res, 'sourcing', 'sourcing'));
app.get('/contact', (req, res) => {
  const status = req.query.status;
  renderPage(res, 'contact', 'contact', { status });
});

app.post('/contact', async (req, res) => {
  const { email, requirement } = req.body;

  if (!email || !requirement) {
    return res.redirect('/contact?status=missing');
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.RFQ_RECEIVER) {
    return res.redirect('/contact?status=config');
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.RFQ_RECEIVER,
      subject: `New RFQ from ${email}`,
      text: `Customer email: ${email}\n\nRequirement:\n${requirement}`
    });

    return res.redirect('/contact?status=success');
  } catch (error) {
    return res.redirect('/contact?status=error');
  }
});

app.get('/sitemap.xml', (req, res) => {
  const routes = ['/', '/products', '/about', '/sourcing', '/contact'];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `<url><loc>${baseUrl}${route}</loc><changefreq>weekly</changefreq><priority>${route === '/' ? '1.0' : '0.8'}</priority></url>`
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
