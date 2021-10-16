/* Variables donde se almacena porciones de HTML seleccionados del DOM, usando el método getElementById. 
Estos son usando a lo largo del archivo
  */
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

/* 
Esta función obtiene el titulo para la seccion nosotros, usando la fetch API propocionado por el navegador 
consulta los datos de la carpeta data del archivo nosotros.txt y lo parsea a formato texto, finalmente retorna
el texto de nosotros y titulo en fomato de objeto. Usa try/catch para capturar error en caso exista ya que es una funcion asincrona
si existe error, muestra el error usando la libreria alertify
 */
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

/* 
Esta función obtiene las categorias para la seccion categorias, usando la fetch API propocionado por el navegador 
consulta los datos de la carpeta data del archivo categorias.json y lo parsea a formato JSON, finalmente retorna
la respuesta . Usa try/catch para capturar error en caso exista muestra el error usando la libreria alertify
 */
const obtenerCategorias = async () => {
  try {
    const response = await fetch('./data/categorias.json');
    return await response.json();
  } catch (error) {
    alertify.notify('Ocurrió un error obteniendo las categorías', 'error', 5);
  }
};

/* 
Otiene las recetas para la seccion recetas, usando fetch  consulta los datos almacenados locamentente en la carpeta 
data del archivo recetas.json y lo parsea a formato JSON, finalmente retorna
la respuesta . Usa try/catch para capturar error en caso exista muestra el error usando la libreria alertify
 */
const obtenerRecetas = async () => {
  try {
    const response = await fetch('./data/recetas.json');
    return await response.json();
  } catch (error) {
    alertify.notify('Ocurrió un error obteniendo las recetas', 'error', 5);
  }
};

/* 
Otiene las iconos para la seccion iconos, usando fetch  consulta los datos almacenados locamentente en la carpeta 
data del archivo iconos.json y lo parsea a formato JSON, finalmente retorna
la respuesta . Al igual que las anteriores funciones usa try/catch y en caso ocurra errpr lo retorna usando alertify.notify
 */
const obtenerIconos = async () => {
  try {
    const response = await fetch('./data/iconos.json');
    return await response.json();
  } catch (error) {
    alertify.notify('Ocurrió un error obteniendo los iconos', 'error', 5);
  }
};

/* 
Muestra la información usando la data de obtenerNosotrosTitulo
 Valida que la informacion no se encuentre duplicada buscando el selector y comprobando en un if. 
 En caso ya exista notifica usando alertify. En caso contrario Activa el spinner, remueve el contenedorNosotros,
obtiene la información y la inserta usando innerHTML en el contenedorNotro. Luego de 2s segunda oculta el spinner y muestra el contenedorNosotros
*/
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

/* 
Muestra la información usando la informacion obtenerCategorias
Muestra el spinner, eliminado la clase none
recorre la informacion y la concantena en htmlParaCategoria usando backticks le agregada el nombre e imagen. Lueg
obtiene la información y la inserta usando innerHTML en el contenedorNotro. Luego de 3s segunda oculta el spinner y muestra el contenedorCategorias
con la informacion insertandola como HTML
*/
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

/* 
Funcion para controlar las recetas en el HTML, usando la funcion obtenerRecetas, obtiene la data.
Muestra el spinner, recorredo los datos, los concantena usando  backticks le agregada el nombre e imagen usando la funcion seTimeout
despues de 3s oculta el spinner y muestra el html usando  innerHTML para el contenedorRecetas
*/
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

/* 
Funcion para controlar los icnoos del footer en el HTML, usando la funcion obtenerIconos, obtiene la data.
Muestra el spinner, recorredo los datos usando un blucle for, los concantena usando  backticks le agregada la clase correspondiente obtenido de la data
despues de 3s oculta el spinner y muestra el html usando  innerHTML para el contenedorSocial
*/
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

/* 
Funcion para crear/controlar el video mostrado en el HTML. Usando createElemento crea el video
Luego le ajustas las propiedades necesarios para el funcionamiento y para que se reproduzca automaticamente, asi como id y clases necesarios
Comprueba que el navegador soporte el formato de video compatible en caso de ser asi, muestra una notificacion inficando que el video es soportado
luego lo inserta como hijo en el selector contenedorVideo. Esto lo realiza despues de 3s usando la funcion setTimeout para evitar que se inserte apenas cargue el html
*/
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

/* 
  Funcon usada para controlar el video que se muestre en el HTML, en caso se precione y noe exista el video. 
  Muestra notificacion indicando que el html no existe.
  En caso este no pausado o el video no haya finalizado lo pauso y cambia el value del input botonVideo, que es el boton que controla la funcionalidad del video
  en caso este pausado o haya terminado, reproduce el video y cambia el value del botonVideo. En ambis casos alterna la clas pausa del boton para cambiar el boton del html usando css y js
*/
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

/* FuncionInicial ejecuta apenas el DOM carga */
const funcionInicial = function () {
  /* Obtiene y establece año actual  */
  document.getElementById('fecha').innerText = new Date().getFullYear();
  /* Ejecuta las fucniones luego de 2,3s y eliminar el spinner inicial cuando carga el DOM */
  setTimeout(async () => {
    document.getElementById('container-spinner').classList.add('none');
    await cargarCategorias();
    await caragarRecetas();
    await cargarIconos();
    crearVideo();
  }, 2300);
};

/* Escucha por el evento  DOMContentLoaded del html y ejecuta la función anteriro */
window.addEventListener('DOMContentLoaded', funcionInicial);
/* Obtiene el boton de nosotros, esuccha por el evento click, y ejecuta la funcion  mostrarInformacionNosotros */
document
  .getElementById('nosotros-boton')
  .addEventListener('click', mostrarInformacionNosotros);

/* Escucha por el botonVideo y en caso es clikeado ejecuta la funcion controlarVideo */
botonVideo.addEventListener('click', controlarVideo, false);

/* 
  Escuha el evento submit del formulario, en caso es ejecutado. Comprueba que el email exista
  en caso no exista lo notifica como un error.
  En caso exista muestra el spinner, oculta el formulario y limpia el valor del input,
  luego de 2s ejecuta una notificacion de éxito y oculta spinner
*/
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
