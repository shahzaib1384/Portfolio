# Shahzaib Haider — Portfolio Website

Premium, futuristic AI Engineer portfolio — built with vanilla HTML, CSS & JavaScript.

## 📁 Folder Structure

```
shahzaib-portfolio/
├── index.html     ← Full HTML structure
├── style.css      ← All styling (dark theme, glassmorphism, animations)
├── script.js      ← Interactivity (particles, typing, tilt, filter, etc.)
└── README.md
```

## 🚀 Run Locally

### Option 1 — Just open the file (simplest)
Double-click `index.html` — works instantly in any modern browser.

### Option 2 — Local dev server (recommended)
```bash
# With Python
cd shahzaib-portfolio
python -m http.server 8080
# Open http://localhost:8080

# With Node.js npx serve
npx serve .
```

## ✨ Features

- Neural network particle canvas background
- Typing text effect with multiple phrases
- Custom glowing cursor
- Scroll progress indicator
- Scroll-reveal animations
- 3D card tilt on hover
- Project category filter (All / AI / Web / Systems)
- Animated skill progress bars
- Animated stats counter
- Glassmorphism cards
- Floating code card in hero
- Animated timeline
- Contact form with success feedback
- Fully responsive (mobile hamburger menu)
- Smooth scroll + active nav highlight

## 🎨 Customization

Update personal info in `index.html`:
- Name, email, phone, location
- GitHub / LinkedIn URLs
- Project descriptions and GitHub links

Update colors in `style.css` `:root` section:
```css
--accent-blue:   #3b82f6;
--accent-cyan:   #06b6d4;
--accent-purple: #8b5cf6;
```

## 🌐 Deploy

Upload the 3 files to any static host:
- **Netlify**: drag & drop the folder
- **Vercel**: `vercel deploy`
- **GitHub Pages**: push to `gh-pages` branch
