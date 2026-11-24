const formulario = document.querySelector('.formulario');
const inputFecha = document.getElementById('fecha');

// Obtener fecha local en formato YYYY-MM-DD (evita desfase por zona horaria UTC)
const obtenerFechaLocalHoy = () => {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
};

if (inputFecha) {
  inputFecha.min = obtenerFechaLocalHoy();
}

if (formulario) {
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefonoRaw = document.getElementById('telefono').value.trim();
    const soloDigitos = telefonoRaw.replace(/\D/g, '');
    const especialidad = document.getElementById('especialidad');
    const motivoTexto = especialidad.options[especialidad.selectedIndex].text;
    const fecha = inputFecha.value;
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validar que no sea fecha pasada
    if (fecha < obtenerFechaLocalHoy()) {
      Swal.fire({
        title: 'Fecha no válida',
        text: 'Por favor elige una fecha igual o posterior a hoy.',
        icon: 'warning',
        confirmButtonColor: '#7A5C94'
      });
      return;
    }

    // Validar domingo (0 = domingo)
    const diaSemana = new Date(`${fecha}T00:00:00`).getDay();
    if (diaSemana === 0) {
      Swal.fire({
        title: 'Día no disponible',
        text: 'Atendemos de lunes a sábado (8:15 a 14:00). Por favor elige otra fecha.',
        icon: 'warning',
        confirmButtonColor: '#7A5C94'
      });
      return;
    }

    // Validar teléfono (al menos 9 dígitos)
    if (soloDigitos.length < 9) {
      Swal.fire({
        title: 'Teléfono inválido',
        text: 'Ingresa un número de celular válido de al menos 9 dígitos.',
        icon: 'error',
        confirmButtonColor: '#7A5C94'
      });
      return;
    }

    // Preparar enlace prellenado de WhatsApp
    let textoWhatsApp = `Hola, soy ${nombre}. Quisiera reservar una cita para ${motivoTexto} el día ${fecha}. Mi teléfono de contacto es ${telefonoRaw}.`;
    if (mensaje) {
      textoWhatsApp += ` Consulta: ${mensaje}`;
    }
    const urlWhatsApp = `https://wa.me/51973669638?text=${encodeURIComponent(textoWhatsApp)}`;

    Swal.fire({
      title: `¡Muchas gracias, ${nombre}!`,
      text: `Recibimos tu solicitud de ${motivoTexto} para el ${fecha}. ¿Deseas también enviarla por WhatsApp para una confirmación más rápida?`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Enviar por WhatsApp',
      cancelButtonText: 'Cerrar',
      confirmButtonColor: '#25D366',
      cancelButtonColor: '#7A5C94'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        window.open(urlWhatsApp, '_blank', 'noopener');
      }
    });

    formulario.reset();
    if (inputFecha) {
      inputFecha.min = obtenerFechaLocalHoy();
    }
  });
}
