(() => {
  const s = document.querySelector('.lx'); if (!s) return;
  window.__lxStarted = true;
  const all = ['is-prep', 'is-ready', 'is-lit', 'is-open', 'is-text', 'is-static'];
  const up = s.querySelector('.lx-up'), dn = s.querySelector('.lx-dn');
  const num = s.querySelector('.lx-disp b'), arrow = s.querySelector('.lx-disp svg');
  const MAX = 4; let floor = 1, busy = true, last = 'up';
  const quick = () => s.classList.contains('is-static');
  const wait = ms => new Promise(r => setTimeout(r, quick() ? 30 : ms));
  function ui() {                       // subir: del 1 al 4 · bajar: solo disponible en la planta 4
    const canUp = !busy && floor < MAX, canDn = !busy && floor === MAX;
    up.disabled = !canUp; dn.disabled = !canDn;
    up.classList.toggle('on', canUp); dn.classList.toggle('on', canDn);
    arrow.style.transform = last === 'up' ? '' : 'rotate(180deg)';
  }
  function tick() {
    num.textContent = floor; num.classList.remove('flip'); void num.offsetWidth; num.classList.add('flip');
  }
  async function go(dir) {
    if (busy) return;
    busy = true; last = dir; ui();
    s.classList.add('is-fast'); s.classList.remove('is-open');
    await wait(1500);                                   // puertas cerrándose
    const target = dir === 'up' ? floor + 1 : 1;
    s.classList.add('is-moving');
    while (floor !== target) { await wait(800); floor += dir === 'up' ? 1 : -1; tick(); }
    s.classList.remove('is-moving');
    if (floor === MAX) last = 'down'; else if (floor === 1) last = 'up';
    await wait(450);
    s.classList.add('is-open'); busy = false; ui();     // puertas abriéndose
  }
  up.addEventListener('click', () => go('up'));
  dn.addEventListener('click', () => go('down'));
  const ready = () => { busy = false; ui(); };
  ui();
  const finish = () => { s.classList.add(...all); if (busy && !s.classList.contains('is-moving')) ready(); };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || document.body.classList.contains('all-motion-paused')) { finish(); return; }
  const timers = [], at = (ms, f) => timers.push(setTimeout(f, ms));
  const imgs = [...s.querySelectorAll('.lx-unit img')];
  const loaded = Promise.all(imgs.map(i => (i.decode ? i.decode() : Promise.resolve()).catch(() => {})));
  Promise.race([loaded, new Promise(r => setTimeout(r, 2500))]).then(() => {
    s.classList.add('is-ready');                        // 1· aparece el ascensor con las puertas cerradas
    at(600, () => s.classList.add('is-lit'));           // 2· se enciende el indicador y pasa un reflejo suave
    at(1700, () => { s.classList.add('is-open'); ready(); });   // 3· se abren las puertas y se enciende la cabina
    at(3200, () => s.classList.add('is-text'));         // 4· entran titular, subtítulo y botones
  });
  new MutationObserver(() => {                          // «Pausar animaciones» muestra el estado final al instante
    if (document.body.classList.contains('all-motion-paused')) { timers.forEach(clearTimeout); s.classList.add(...all); ready(); }
  }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();
