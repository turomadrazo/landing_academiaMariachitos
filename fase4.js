(() => {
  console.log('¡Bienvenido a Academia Mariachitos! Descubre la música jugando.');

  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (window.AOS) {
    document.documentElement.classList.add('aos-disponible');
    AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 60,
      disable: () => movimientoReducido.matches });
  }

  let pulsos = 0;
  const contador = document.getElementById('contador-pulsos');
  const boton = document.getElementById('boton-pulso');
  const reiniciar = document.getElementById('reiniciar-pulsos');
  const mostrar = () => {
    contador.textContent = pulsos;
    contador.setAttribute('aria-label', `Pulsos: ${pulsos}`);
  };
  boton.addEventListener('click', () => {
    pulsos += 1;
    mostrar();
    if (!movimientoReducido.matches && contador.animate) {
      contador.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' },
        { transform: 'scale(1)' }], { duration: 220 });
    }
  });
  reiniciar.addEventListener('click', () => { pulsos = 0; mostrar(); });

  document.querySelectorAll('.viaje-pestana').forEach((tab) => {
    const animarNivel = () => {
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (!panel || panel.hidden || movimientoReducido.matches) return;
      const elementos = panel.querySelectorAll('.viaje-cabecera, .viaje-recorrido li, .viaje-metodo');
      elementos.forEach((elemento, indice) => {
        if (!elemento.animate) return;
        elemento.getAnimations().forEach((animacion) => animacion.cancel());
        elemento.animate([{ opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' }],
          { duration: 350, delay: indice * 45, easing: 'ease-out', fill: 'backwards' });
      });
    };
    tab.addEventListener('click', animarNivel);
    tab.addEventListener('focus', animarNivel);
  });
})();
