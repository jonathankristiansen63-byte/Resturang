# Sofia's Place 🇬🇷

A modern, animated marketing website for **Sofia's Place** — a beloved
family-run Greek taverna on the harbour of Pigadia, Karpathos.

## ✨ Features

- **Cinematic hero** with zoom + staggered text reveal and parallax imagery
- **Scroll-triggered reveal animations** throughout (IntersectionObserver)
- **Animated stat counters** (reviews, ratings, followers)
- **Signature dish menu** with hover-lift cards & real food photography
- **Masonry gallery** with click-to-open lightbox
- **Auto-drifting review carousel** pulling in real Google / Facebook / Instagram quotes
- **Marquee**, **cursor glow**, **scroll progress bar** and a **preloader**
- Fully **responsive** with a mobile menu, and respects `prefers-reduced-motion`

## 🗂 Structure

| File | Purpose |
|------|---------|
| `index.html` | Page markup & content |
| `styles.css` | All styling & keyframe animations |
| `script.js` | Reveals, counters, parallax, lightbox, carousel |

## 🚀 Run locally

It's a static site — just open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 📍 The restaurant

- **Address:** Port Road, Pigadia, Karpathos 857 00, Greece
- **Phone:** +30 698 773 6423
- **Hours:** Open every day, 5 PM till late
- ⭐ 4.3 (658 Google reviews) · Facebook 4.9 · Instagram [@sofias_place_karpathos](https://www.instagram.com/sofias_place_karpathos/)

> Photography via [Unsplash](https://unsplash.com). Swap in the restaurant's
> own photos by replacing the image URLs in `index.html`.
