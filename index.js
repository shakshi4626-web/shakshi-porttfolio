/* ── SCROLL NAV ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => io.observe(el));

/* ── TESTIMONIALS ── */
const testimonials = [
  { text: "Aria doesn't just make things look beautiful — she makes them work. Her research depth is rare in a visual designer. She changed how our whole team thinks about our product.", author: "— Kabir Mehra, CPO at Nuvault · 2024" },
  { text: "Working with Aria felt like having a product strategist and visual designer in one. She asked the questions no one else was asking and delivered something we couldn't have imagined on our own.", author: "— Priya Agarwal, Founder at Lumio · 2023" },
  { text: "The design system Aria built for us has scaled from 3 designers to 14 without a single breaking change. That level of foresight is extraordinary.", author: "— Daniel Cho, Head of Design at Orbit · 2023" }
];
let currentT = 0;
function setTestimonial(i) {
  currentT = i;
  const textEl   = document.getElementById('testimonialText');
  const authorEl = document.getElementById('testimonialAuthor');
  textEl.style.opacity   = '0'; textEl.style.transform   = 'translateY(8px)';
  authorEl.style.opacity = '0';
  setTimeout(() => {
    textEl.textContent   = testimonials[i].text;
    authorEl.textContent = testimonials[i].author;
    textEl.style.transition   = 'opacity 0.5s, transform 0.5s';
    authorEl.style.transition = 'opacity 0.5s 0.1s';
    textEl.style.opacity   = '1'; textEl.style.transform   = 'translateY(0)';
    authorEl.style.opacity = '1';
  }, 220);
  document.querySelectorAll('.t-dot').forEach((d,j) => d.classList.toggle('active', j === i));
}
setInterval(() => setTestimonial((currentT + 1) % testimonials.length), 6000);

/* ── STAT COUNTER ANIMATION ── */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const raw  = el.textContent;
    const num  = parseInt(raw);
    const suf  = raw.replace(/[0-9]/g, '');
    if (isNaN(num)) return;
    let cur = 0;
    const step = Math.ceil(num / 30);
    const iv = setInterval(() => {
      cur = Math.min(cur + step, num);
      el.textContent = cur + suf;
      if (cur >= num) clearInterval(iv);
    }, 40);
  });
}
const heroSection = document.getElementById('hero');
const heroIO = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateCounters(); heroIO.disconnect(); }
}, { threshold: 0.5 });
heroIO.observe(heroSection);

/* ── SMOOTH HOVER TILT on project cards ── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y*4}deg) rotateY(${x*4}deg)`;
    card.style.transition = 'transform 0.1s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
  });
});
