// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get URL parameters
export function getParams(param) {
  const queryString = window.location.search; // Get the query string from the URL
  const urlParams = new URLSearchParams(queryString); // Create a URLSearchParams object
  return urlParams.get(param); // Return the parameter value
}

// Función para renderizar usando una plantilla y un elemento padre, manejando datos estáticos y callback opcional
export function renderWithTemplate(templateFn, parentElement, list = null, position = "afterbegin", clear = false, callback) {
  // Limpia el contenido del elemento padre si se especifica 'clear'
  if (clear) {
    parentElement.innerHTML = "";
  }

  // Si no se proporciona una lista, usamos solo la función de plantilla
  const htmlStrings = list ? list.map(templateFn) : [templateFn()]; // Cambiado para manejar una función estática

  // Insertamos el HTML generado en el elemento padre en la posición especificada
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));

  // Si hay un callback proporcionado, lo ejecutamos
  if (callback) {
    callback(list);
  }
}

// Función para cargar una plantilla HTML desde una ruta
export async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Error al cargar la plantilla: ${response.statusText}`);
    }

    const text = await response.text(); // Obtenemos el contenido del HTML como texto
    const template = document.createElement('template'); // Creamos un elemento <template>
    template.innerHTML = text; // Insertamos el HTML cargado en el template
    return template; // Devolvemos el template con el HTML cargado
  } catch (error) {
    console.error('Error al cargar la plantilla:', error);
    return null; // Retorna null en caso de error
  }
}

// Función para cargar y renderizar los encabezados y pies de página
export async function loadHeaderFooter() {
  try {
    // Cargamos las plantillas de encabezado y pie de página
    const headerTemplate = await loadTemplate('/partials/header.html'); // Actualiza con la ruta correcta
    const footerTemplate = await loadTemplate('/partials/footer.html'); // Actualiza con la ruta correcta

    // Aseguramos que las plantillas fueron cargadas correctamente
    if (headerTemplate && footerTemplate) {
      // Extraemos los elementos del template
      const headerElement = headerTemplate.content.firstElementChild; // Suponiendo que el primer hijo es el header
      const footerElement = footerTemplate.content.firstElementChild; // Suponiendo que el primer hijo es el footer

      // Renderizamos el header y el footer en sus respectivos elementos en el DOM
      renderWithTemplate(() => headerElement.outerHTML, document.querySelector('header'), null);
      renderWithTemplate(() => footerElement.outerHTML, document.querySelector('footer'), null);
    } else {
      console.error('Error: No se pudieron cargar las plantillas de header o footer.');
    }
  } catch (error) {
    console.error('Error al cargar header o footer:', error);
  }
}


// set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  if (element) {
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  }
}
