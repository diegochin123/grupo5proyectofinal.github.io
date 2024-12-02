// Mostrar vista previa del archivo cargado
document.getElementById("fileInput").addEventListener("change", function () {
    const files = this.files;
    const previewContainer = document.getElementById("previewContainer");
    previewContainer.innerHTML = ""; // Limpiar el contenedor de vista previa

    for (let file of files) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("preview-image");
            previewContainer.appendChild(img);
        };

        reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    }
});

// Alternar la visibilidad del formulario
function toggleForm() {
    const formContainer = document.getElementById('post-form-container');
    formContainer.classList.toggle('active'); // Alternar clase 'active'
}

// Manejador de envío del formulario de publicación
document.getElementById("uploadForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const postTitle = document.getElementById("post-title").value;
    const postDescription = document.getElementById("post-description").value;
    const fileInput = document.getElementById("fileInput");
    const newPost = document.createElement("div");
    newPost.classList.add("post");

    const postTitleElement = `<h4 class="hola">${postTitle}</h4>`;
    const postDescriptionElement = postDescription ? `<p class="hola"><strong>Descripción:</strong> ${postDescription}</p>` : "";
    let mediaContent = "";
    let filesProcessed = 0;

    // Procesar archivos
    for (let file of fileInput.files) {
        const reader = new FileReader();

        reader.onload = function (e) {
            if (file.type.startsWith("image/")) {
                mediaContent += `<img src='${e.target.result}' alt='Imagen de la publicación'>`;
            } else if (file.type.startsWith("video/")) {
                mediaContent += `<video controls><source src='${e.target.result}' type='${file.type}'>Tu navegador no soporta video.</video>`;
            }

            filesProcessed++;

            // Agregar publicación solo después de que todos los archivos hayan sido procesados
            if (filesProcessed === fileInput.files.length) {
                newPost.innerHTML = postTitleElement + postDescriptionElement + mediaContent + createCommentSection() + createDeleteButton();
                
                // Agregar la nueva publicación al final de la lista
                const postsList = document.getElementById("postsList");
                postsList.appendChild(newPost);
                
                // Reiniciar el formulario y la vista previa
                document.getElementById("uploadForm").reset(); 
                document.getElementById("previewContainer").innerHTML = ""; 
            }
        };
        reader.readAsDataURL(file); // Leer archivo
    }
});

// Crear sección de comentarios
function createCommentSection() {
    return ` 
        <div class="comment-section">
            <button id="specialCommentButton" onclick="toggleCommentForm(this)">Comentar</button>
            <div class="comment-form" style="display: none;">
                <input type="text" class="comment-input" placeholder="Escribe un comentario..." required>
                <button onclick="addComment(this)">Enviar</button>
            </div>
            <div class="comments-list"></div>
        </div>`;
}

// Alternar visibilidad del formulario de comentarios
function toggleCommentForm(button) {
    const form = button.nextElementSibling;
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Agregar comentario a la publicación
function addComment(button) {
    const input = button.previousElementSibling;
    const commentText = input.value.trim();

    if (commentText) {
        const commentsList = button.parentNode.nextElementSibling;
        const newComment = document.createElement("p");
        newComment.textContent = commentText;
        commentsList.appendChild(newComment);
        input.value = ''; // Limpiar el campo de texto
    }
}

// Botón de me gusta
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-like")) {
        let count = parseInt(event.target.dataset.likes) || 0;
        count = event.target.classList.toggle("liked") ? count + 1 : count - 1;
        event.target.textContent = `👍 ${count}`;
        event.target.dataset.likes = count; // Actualizar contador
    }
});

// Función para borrar una publicación
function deletePost(button) {
    const post = button.closest('.post');
    post.remove();
}

// Crear el botón de eliminar para cada publicación
function createDeleteButton() {
    return `<button class="delete-btn" onclick="deletePost(this)">Eliminar</button>`;
}
