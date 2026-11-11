const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();
const reviewDialog=document.getElementById('reviewDialog');
document.querySelectorAll('[data-review]').forEach(b=>b.addEventListener('click',()=>{let r=reviews[Number(b.dataset.review)];document.getElementById('reviewName').textContent=r[0];document.getElementById('reviewText').textContent=r[1];reviewDialog.showModal();document.querySelector('.reviews').classList.add('paused');}));
const pause=document.getElementById('pauseReviews');pause.addEventListener('click',()=>{const v=document.querySelector('.reviews').classList.toggle('paused');pause.setAttribute('aria-pressed',String(v));pause.textContent=v?'Reanudar movimiento ▶':'Pausar movimiento Ⅱ';});
reviewDialog.addEventListener('close',()=>{document.querySelector('.reviews').classList.toggle('paused',pause.getAttribute('aria-pressed')==='true');});
document.querySelectorAll('.close-dialog').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.getElementById('cookieSettings').addEventListener('click',()=>document.getElementById('cookieDialog').showModal());
// Formspree almacena cada solicitud y la reenvía al correo receptor verificado.
// No usar mailto:, SMTP ni claves de correo desde JavaScript público.
const contactForm = document.getElementById('contactForm');
const contactFeedback = document.getElementById('contactFeedback');
const contactButton = contactForm.querySelector('button[type="submit"]');
const isReadyEndpoint = endpoint => /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint || '');
const tForm = phrase => window.ABELIFT_I18N?.t(phrase) || phrase;
const contactEndpoint = window.ABELIFT_FORMS?.presupuesto;
if (isReadyEndpoint(contactEndpoint)) {
  contactFeedback.textContent = tForm('Completa tus datos y enviaremos tu solicitud a ABELIFT.');
}
contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!isReadyEndpoint(contactEndpoint)) {
    contactFeedback.textContent = tForm('El formulario aún no está conectado. Contacta por correo a info@abelift.cat.');
    return;
  }
  const values = new FormData(contactForm);
  values.set('tipo_solicitud', 'Presupuesto general');
  contactButton.disabled = true;
  contactForm.setAttribute('aria-busy', 'true');
  contactFeedback.textContent = tForm('Enviando solicitud…');
  try {
    const response = await fetch(contactEndpoint, {
      method: 'POST', body: values, headers: {'Accept': 'application/json'}
    });
    if (!response.ok) throw new Error('Formspree status: ' + response.status);
    contactForm.reset();
    contactFeedback.textContent = tForm('Solicitud enviada correctamente. ABELIFT se pondrá en contacto contigo.');
  } catch (error) {
    console.error('ABELIFT: error en el envío del presupuesto', error);
    contactFeedback.textContent = tForm('No se ha podido enviar la solicitud. Vuelve a intentarlo o escribe a info@abelift.cat.');
  } finally {
    contactButton.disabled = false;
    contactForm.removeAttribute('aria-busy');
  }
});
