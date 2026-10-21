(() => {
  const button = document.querySelector('.menu');
  const nav = document.querySelector('#nav');

  function closeMenu(returnFocus = false) {
    nav.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menú');
    button.textContent = '☰';
    if (returnFocus) button.focus();
  }

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-label', expanded ? 'Cerrar menú' : 'Abrir menú');
    button.textContent = expanded ? '×' : '☰';
  });

  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('click', event => {
    if (nav.classList.contains('open') && !nav.contains(event.target) && !button.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true);
  });
})();
