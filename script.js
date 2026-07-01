/* ============================================================
   Sofia's Place — interactions & animations
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Preloader ---------- */
  window.addEventListener("load", function () {
    const pre = document.getElementById("preloader");
    if (pre) setTimeout(() => pre.classList.add("is-done"), 500);
  });

  /* ---------- Nav: scroll state + mobile menu ---------- */
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");

  const onScroll = () => {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 60);
    updateProgress();
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  if (burger) {
    burger.addEventListener("click", () => nav.classList.toggle("is-open"));
  }
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("is-open"))
    );
  }

  /* ---------- Scroll progress bar ---------- */
  const progress = document.getElementById("scrollProgress");
  function updateProgress() {
    if (!progress) return;
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = scrolled + "%";
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const delay = e.target.dataset.delay || (i % 3) * 90;
            setTimeout(() => e.target.classList.add("is-in"), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const dur = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      let val = target * eased;
      if (target >= 1000) {
        el.textContent = Math.round(val).toLocaleString() + suffix;
      } else {
        el.textContent = val.toFixed(decimals) + suffix;
      }
      if (p < 1) requestAnimationFrame(step);
      else
        el.textContent =
          (target >= 1000 ? Math.round(target).toLocaleString() : target.toFixed(decimals)) +
          suffix;
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count));
  }

  /* ---------- Parallax ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  let ticking = false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const applyParallax = () => {
    const vh = window.innerHeight;
    parallaxEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const speed = parseFloat(el.dataset.parallax);
      const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
      el.style.transform = `translateY(${offset.toFixed(1)}px)`;
    });
    ticking = false;
  };
  if (!reduceMotion && parallaxEls.length) {
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(applyParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
    applyParallax();
  }

  /* ---------- Cursor glow ---------- */
  const glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let gx = 0, gy = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", (e) => {
      gx = e.clientX;
      gy = e.clientY;
    });
    const loop = () => {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  document.querySelectorAll("[data-lightbox] img").forEach((img) => {
    img.parentElement.addEventListener("click", () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src.replace(/w=\d+/, "w=1600");
      lightboxImg.alt = img.alt;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  });
  const closeLB = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  if (lightboxClose) lightboxClose.addEventListener("click", closeLB);
  if (lightbox)
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLB();
    });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLB();
  });

  /* ---------- Reviews: subtle auto-drift on desktop ---------- */
  const track = document.getElementById("reviewsTrack");
  if (track && window.matchMedia("(hover: hover)").matches) {
    let paused = false;
    track.addEventListener("mouseenter", () => (paused = true));
    track.addEventListener("mouseleave", () => (paused = false));
    setInterval(() => {
      if (paused) return;
      const max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= max - 2) track.scrollTo({ left: 0, behavior: "smooth" });
      else track.scrollBy({ left: 1, behavior: "auto" });
    }, 30);
  }
})();
