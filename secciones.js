// POSICIÓN DE LOS 4 PUNTOS sobre la foto de restauración (en % desde la esquina superior izquierda).
// Si cambias la foto, ajusta estos números. Truco: abre la web con  #ajustar-puntos  al final de la dirección
// y haz clic en la foto: te muestra las coordenadas x / y de ese punto.
const PUNTOS = [{ x: 14, y: 45 }, { x: 92, y: 76 }, { x: 86, y: 33 }, { x: 50, y: 62 }];
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const paused = () => document.body.classList.contains('all-motion-paused');
  if ('IntersectionObserver' in window && !reduced) {         // aparición suave al hacer scroll
    document.documentElement.classList.add('sec-js');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.in-r').forEach(el => { if (el.dataset.d) el.style.transitionDelay = el.dataset.d + 's'; io.observe(el); });
    setTimeout(() => document.querySelectorAll('.in-r:not(.is-in)').forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in'); }), 1200);
  }
  const cta = document.getElementById('svLobbyCta');            // «Consultar vestíbulos» preselecciona el servicio en el formulario
  if (cta) cta.addEventListener('click', () => { const sel = document.querySelector('#contactForm select[name="service"]'); if (sel && sel.options.length > 1) sel.selectedIndex = sel.options.length - 2; });
  const sec = document.getElementById('restauracion'); if (!sec) return;   // restauración: puntos sobre la cabina
  const items = [...sec.querySelectorAll('.rs-item')], dots = [...sec.querySelectorAll('.rs-dot')];
  dots.forEach((d, i) => { if (PUNTOS[i]) { d.style.left = PUNTOS[i].x + '%'; d.style.top = PUNTOS[i].y + '%'; } });
  if (location.hash === '#ajustar-puntos') {
    const st = sec.querySelector('.rs-stage'), b = document.createElement('div'); b.className = 'rs-coords'; b.textContent = 'Haz clic en la foto'; st.appendChild(b);
    st.addEventListener('click', e => { const r = st.getBoundingClientRect(); b.textContent = 'x: ' + Math.round((e.clientX - r.left) / r.width * 100) + '   y: ' + Math.round((e.clientY - r.top) / r.height * 100); });
  }
  let cur = 0, user = false, vis = false;
  const set = i => { cur = i; items.forEach((b, k) => b.classList.toggle('is-on', k === i)); dots.forEach((b, k) => b.classList.toggle('is-on', k === i)); };
  const pick = i => { user = true; set(i); };
  [...items, ...dots].forEach((b, n) => { const i = n % items.length; ['click', 'mouseenter', 'focus'].forEach(ev => b.addEventListener(ev, () => pick(i))); });
  new IntersectionObserver(e => { vis = e[0].isIntersecting; }).observe(sec);
  setInterval(() => { if (!user && vis && !reduced && !paused()) set((cur + 1) % items.length); }, 4200);
  set(0);
})();
