// 1. Sombra en la cabecera al hacer scroll
const cabecera = document.querySelector('.cabecera');

window.addEventListener('scroll', () => {
  if (!cabecera) return;
  if (window.scrollY > 10) {
    cabecera.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
  } else {
    cabecera.style.boxShadow = 'none';
  }
});

// 2. Resaltar enlace activo en el menú de navegación
const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach((enlace) => {
  const href = enlace.getAttribute('href');
  if (href === paginaActual) {
    enlace.classList.add('activo');
    enlace.setAttribute('aria-current', 'page');
  }
});

// 3. Botón flotante "Volver arriba"
const btnArriba = document.createElement('button');
btnArriba.type = 'button';
btnArriba.className = 'btn-arriba';
btnArriba.setAttribute('aria-label', 'Volver arriba');
btnArriba.title = 'Volver arriba';
btnArriba.textContent = '↑';
document.body.appendChild(btnArriba);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnArriba.classList.add('visible');
  } else {
    btnArriba.classList.remove('visible');
  }
});

btnArriba.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 4. Indicador de horario en tiempo real (contacto.html)
const indicadorHorario = document.getElementById('estado-horario');
if (indicadorHorario) {
  const actualizarEstadoHorario = () => {
    const ahora = new Date();
    const dia = ahora.getDay(); // 0 = domingo, 1 = lunes ... 6 = sábado
    const minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();

    const apertura = 8 * 60 + 15; // 08:15
    const cierre = 14 * 60;       // 14:00
    const estaAbierto = dia >= 1 && dia <= 6 && minutosActuales >= apertura && minutosActuales < cierre;

    indicadorHorario.textContent = estaAbierto ? 'Abierto ahora' : 'Cerrado ahora';
    indicadorHorario.classList.toggle('abierto', estaAbierto);
    indicadorHorario.classList.toggle('cerrado', !estaAbierto);
  };

  actualizarEstadoHorario();
  setInterval(actualizarEstadoHorario, 60000);
}