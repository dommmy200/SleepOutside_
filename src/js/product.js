import ProductDetails from "./ProductDetails.mjs";
import { getParams } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

// Obtener el ID del producto desde la URL
const productId = getParams("product");

if (productId) {
  const dataSource = new ExternalServices();
  const product = new ProductDetails(productId, dataSource); // Crear una instancia de ProductDetails
  product.init(); // Inicializar para obtener los detalles del producto y renderizarlos

  // Inicializar comentarios
  initCommentsSystem(productId); // Llamar a la función para manejar los comentarios
} else {
  //console.error("No product ID found in the URL.");
}

// Sistema de comentarios
function initCommentsSystem(productId) {
  // Renderizar los comentarios guardados al cargar la página
  renderComments(productId);

  // Añadir el evento al formulario para enviar un nuevo comentario
  const commentForm = document.getElementById("comment-form");
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario recargue la página
    addComment(productId);
  });
}

// Función para renderizar los comentarios guardados
function renderComments(productId) {
  const commentsList = document.getElementById("comments-list");
  const comments = getComments(productId); // Obtener comentarios guardados

  commentsList.innerHTML = ""; // Limpiar la lista antes de renderizar

  comments.forEach((comment) => {
    const li = document.createElement("li");
    li.textContent = comment;
    commentsList.appendChild(li);
  });
}

// Función para obtener los comentarios guardados del localStorage
function getComments(productId) {
  const comments = localStorage.getItem(`comments_${productId}`);
  return comments ? JSON.parse(comments) : [];
}

// Función para añadir un nuevo comentario
function addComment(productId) {
  const commentText = document.getElementById("comment-text").value.trim();

  if (commentText) {
    const comments = getComments(productId);
    comments.push(commentText);

    // Guardar los comentarios actualizados en el localStorage
    localStorage.setItem(`comments_${productId}`, JSON.stringify(comments));

    // Limpiar el campo de texto
    document.getElementById("comment-text").value = "";

    // Volver a renderizar los comentarios
    renderComments(productId);
  }
}
