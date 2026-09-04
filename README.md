# Professional Software Engineer & Flutter Developer Portfolio

A complete, modern, production-ready, and highly performant personal portfolio website custom-built for **Ahmed Sayed Amroon**. 

This portfolio highlights his software engineering background, Flutter development specialization, and showcases selected projects with fluid, native animations. It runs entirely on client resources without any external CSS or JS frameworks.

---

## 📁 Folder Structure

The project has been organized according to modern frontend standards:

```text
Portfolio/
│
├── index.html                   # Main HTML5 entrypoint (SEO, ARIA & Semantic structure)
├── css/
│   └── style.css                # Comprehensive CSS3 stylesheet (Dark/Light themes, layouts, animations)
├── js/
│   └── script.js                # ES6 JavaScript handler (typewriter, menu, scroll trackers, observers)
├── assets/
│   ├── resume/
│   │      Ahmed_Sayed_CV.pdf    # Light valid PDF CV placeholder (User can replace with custom CV)
│   └── icons/
│          favicon.svg           # High-quality coding icon SVG used as the site favicon
└── README.md                    # Project documentation (this file)
```

---

## ⚡ Features & Technologies

* **Pure Vanilla Architecture**: Constructed using **only** native HTML5, CSS3, and Vanilla JavaScript (ES6+). Zero external libraries (no React, jQuery, Bootstrap, or Tailwind).
* **Glassmorphism Theme UI**: Uses semi-transparent glass panels, customized subtle backdrops (`backdrop-filter`), variable custom shadows, and ambient gradient glowing outlines.
* **Developer Visual Hero**: Features a custom visual container depicting a simulated Flutter mobile application frame, layout rows, widgets, and floating glowing indicators, completely bypassing simple profile photos.
* **Typing Animation**: Typings in the hero headline cycle smoothly through his core focus areas (*Software Engineer*, *Flutter Developer*, *Mobile Architect*).
* **Scroll-Bound Interactions**:
  - **Scroll Progress Bar**: A linear indicator indicating reading depth at the top of the viewport.
  - **Sticky Blurred Navbar**: Glassmorphism navbar that gains background blur and fine border dividers as the page scrolls.
  - **Active State Highlights**: Intersection Observers automatically highlight the navigation items matching the section currently in view.
  - **Animated Skill Progress Bars**: Intersection Observers trace when skill cards enter the viewport and trigger progress fill transitions dynamically from `0%`.
  - **Section Reveals**: Soft scroll-reveal fade transitions on all major components.
* **Adaptive Dark Mode Default**: Default theme is Dark Slate (`#0F172A`), but includes a toggle control. Theme choices are stored in browser memory via `localStorage`.
* **Fully Responsive**: Media queries optimized from mobile and tablets up to standard laptops, desktop screens, and 4K displays.
* **Accessibility (a11y) & SEO Ready**:
  - Validated semantic tags (`header`, `main`, `section`, `article`, `footer`).
  - Strict keyboard accessibility using `tabindex` and visual focus boundaries.
  - Form inputs equipped with float label controls and aria configurations.
  - Open Graph and Twitter Card tags defined for search index optimization.
  - Lightweight coding icon (`favicon.svg`) built in vector paths.

---

## 🚀 Getting Started / Customization

1. **Run Locally**:
   - Simply open the [index.html](file:///e:/portofilo/index.html) file directly in any modern web browser, or run a local dev server (e.g., VS Code Live Server, python `-m http.server`, or Node.js `http-server`).
2. **Replacing the Resume**:
   - Place your official PDF resume in the `assets/resume/` folder and rename it to `Ahmed_Sayed_CV.pdf` to replace the provided placeholder.
3. **Updating Social Links / Text Content**:
   - Locate relevant sections in `index.html` and customize URLs inside the contact grid (`email`, `phone`, `LinkedIn`, `GitHub` elements).
