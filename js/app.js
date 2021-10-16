const spinnerNosotros = document.getElementById('spinner-nosotros');
const spinnerCategorias = document.getElementById('spinner-categoria');
const spinnerRecetas = document.getElementById('spinner-receta');
const spinnerSocial = document.getElementById('spinner-social');
const spinnerVideo = document.getElementById('spinner-video');
const spinnerForm = document.getElementById('spinner-form');
const contenedorNosotros = document.getElementById('nosotros-texto');
const contenedorCategorias = document.getElementById('categorias-contenedor');
const contenedorRecetas = document.getElementById('recetas-contenedor');
const contenedorVideo = document.getElementById('video-contenedor');
const contenedorSocial = document.getElementById('social');
const botonVideo = document.getElementById('boton-video');
const formularioNewsletter = document.getElementById('form-newsletter');

const obtenerNosotrosTitulo = async () => {
  try {
    const respuestaNosotros = await fetch('../data/nosotros.txt');
    const respuestaTitulo = await fetch('../data/titulo-nosotros.txt');
    const nosotros = await respuestaNosotros.text();
    const tituloNosotros = await respuestaTitulo.text();
    return {
      nosotros,
      tituloNosotros,
    };
  } catch (error) {
    alertify.notify(
      'Ocurrió un error obteniendo el texto de nosotros',
      'error',
      5
    );
  }
};

const obtenerCategorias = async () => {
  try {
    const response = await fetch('./data/categorias.json');
    return await response.json();
  } catch (error) {
    alertify.notify('Ocurrió un error obteniendo las categorías', 'error', 5);
  }
};

const obtenerRecetas = async () => {
  try {
    const response = await fetch('./data/recetas.json');
    return await response.json();
  } catch (error) {
    alertify.notify('Ocurrió un error obteniendo las recetas', 'error', 5);
  }
};

const obtenerIconos = async () => {
  try {
    const response = await fetch('./data/iconos.json');
    return await response.json();
  } catch (error) {
    alertify.notify('Ocurrió un error obteniendo los iconos', 'error', 5);
  }
};

const mostrarInformacionNosotros = async () => {
  if (document.querySelector('.text-nosotros')) {
    alertify.notify('El texto ya se encuentra en el HTML', 'error', 5);
    return;
  }
  spinnerNosotros.classList.remove('none');
  contenedorNosotros.classList.add('none');
  const { nosotros, tituloNosotros } = await obtenerNosotrosTitulo();
  contenedorNosotros.innerHTML = `
    <h3 class="top">${tituloNosotros}</h3>
    <p class="text-nosotros">
    ${nosotros}
    </p>
    `;
  setTimeout(() => {
    spinnerNosotros.classList.add('none');
    contenedorNosotros.classList.remove('none');
  }, 2000);
};

const cargarCategorias = async () => {
  const { data } = await obtenerCategorias();
  spinnerCategorias.classList.remove('none');
  let htmlParaCategorias = '';
  data.map(({ nombre, img_url }) => {
    htmlParaCategorias += `
    <div class="categoria-imagen">    
      <img src="img/${img_url}" >    
    <h4>${nombre} </h4>
    </div>
    `;
    setTimeout(() => {
      spinnerCategorias.classList.add('none');
      contenedorCategorias.innerHTML = htmlParaCategorias;
    }, 3000);
  });
};

const caragarRecetas = async () => {
  const { data } = await obtenerRecetas();
  spinnerRecetas.classList.remove('none');
  let htmlParaRecetas = '';
  data.map(({ nombre, img_url }) => {
    htmlParaRecetas += `
    <article>
      <img src="img/${img_url}">    
      <h4> ${nombre} </h4>
    </article>
    `;
    setTimeout(() => {
      spinnerRecetas.classList.add('none');
      contenedorRecetas.innerHTML = htmlParaRecetas;
    }, 3000);
  });
};

const cargarIconos = async function () {
  const { data } = await obtenerIconos();
  spinnerSocial.classList.remove('none');
  let htmlIconos = '';
  for (let index = 0; index < data.length; index++) {
    htmlIconos += `
    <a> <i class="${data[index]}"></i> </a>  
    `;
  }
  setTimeout(() => {
    spinnerSocial.classList.add('none');
    contenedorSocial.innerHTML = htmlIconos;
  }, 3000);
};

const crearVideo = () => {
  spinnerVideo.classList.remove('none');
  const video = document.createElement('video');
  setTimeout(() => {
    spinnerVideo.classList.add('none');
    video.setAttribute('src', 'img/video.mp4');
    video.setAttribute('controls', 'controls');
    video.setAttribute('autoplay', 'autoplay');
    video.setAttribute('loop', 'loop');
    video.setAttribute('muted', 'muted');
    video.setAttribute('playsinline', 'playsinline');
    video.setAttribute('preload', 'preload');
    video.setAttribute('width', '100%');
    video.setAttribute('height', '100%');
    video.setAttribute('id', 'video');
    video.classList.add('video');
    if (video.canPlayType('video/mp4').length > 0) {
      alertify.notify('El navegador soporta el formato de video', 'success', 5);
      contenedorVideo.appendChild(video);
      return;
    } else {
      alertify.notify(
        'El navegador no soporta el formato de video',
        'error',
        5
      );
    }
  }, 3000);
};

function controlarVideo() {
  const videoReceta = document.getElementById('video');
  if (!videoReceta) {
    alertify.notify('El video no existe', 'error', 5);
    return;
  }
  if (!videoReceta.paused && !videoReceta.ended) {
    videoReceta.pause();
    botonVideo.value = 'Reproducir';
  } else {
    videoReceta.play();
    botonVideo.value = 'Pausa';
  }
  botonVideo.classList.toggle('pausa');
}

const funcionInicial = function () {
  document.getElementById('fecha').innerText = new Date().getFullYear();
  setTimeout(async () => {
    document.getElementById('container-spinner').classList.add('none');
    await cargarCategorias();
    await caragarRecetas();
    await cargarIconos();
    crearVideo();
  }, 2300);
};

window.addEventListener('DOMContentLoaded', funcionInicial);
document
  .getElementById('nosotros-boton')
  .addEventListener('click', mostrarInformacionNosotros);

botonVideo.addEventListener('click', controlarVideo, false);

formularioNewsletter.addEventListener('submit', function (e) {
  e.preventDefault();
  const emailInput = document.getElementById('email-input');
  if (!emailInput.value || emailInput.value.trim() === '') {
    alertify.notify('El email no puede estar vacio', 'error', 5);
    return;
  }
  spinnerForm.classList.remove('none');
  formularioNewsletter.classList.add('none');
  emailInput.value = '';
  setTimeout(() => {
    formularioNewsletter.classList.remove('none');
    alertify.notify('Gracias por suscribirte', 'success', 5);
    spinnerForm.classList.add('none');
  }, 2000);
});
