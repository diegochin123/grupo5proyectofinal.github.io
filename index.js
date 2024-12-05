// Mostrar vista previa del archivo cargado (para imágenes y videos)

//esta seccion actua cuando el usuario escoje un archivo a traves del input
document.getElementById("fileInput").addEventListener("change", function () { 

    //aqui accedemos al archivo seleccionado
    const files = this.files;  

    //aqui obtenemos el contenedor de la vista previa 
    const previewContainer = document.getElementById("previewContainer");
    previewContainer.innerHTML = ""; // Limpiar el contenedor de la vista previa

    for (let file of files) {
        const reader = new FileReader();  // Usar la API FileReader para leer archivos locales

        reader.onload = function (e) {
            if (file.type.startsWith("image/")) {  // Si es una imagen
                const img = document.createElement("img");
                img.src = e.target.result;
                img.classList.add("preview-image");  // Clase opcional para estilos de la imagen
                previewContainer.appendChild(img);
            } else if (file.type.startsWith("video/")) {  // Si es un video
                const video = document.createElement("video");
                video.src = e.target.result;
                video.controls = true;  // Agregar controles para reproducir el video
                video.classList.add("preview-video");  // Clase opcional para estilos del video
                previewContainer.appendChild(video);
            }
        };

        reader.readAsDataURL(file);  // Leer el archivo como una URL de datos
    }
});





// Alternar la visibilidad del formulario
function toggleForm() {
    const formContainer = document.getElementById('post-form-container');
    formContainer.classList.toggle('active');  // Alternar la clase 'active' para mostrar u ocultar el formulario
}

// Manejador de envío del formulario de publicación
document.getElementById("uploadForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevenir la recarga de la página

    const postTitle = document.getElementById("post-title").value;
    const postDescription = document.getElementById("post-description").value;
    const fileInput = document.getElementById("fileInput");

    //aca creamos un nuevo contenedor div con la clase post para la nuieva publicacion
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

            if (filesProcessed === fileInput.files.length) {
                newPost.innerHTML = postTitleElement + postDescriptionElement + mediaContent + createCommentSection() + createDeleteButton();
                
                //aqui la nueva publicacion se agrega a la lista de publicaciones popst list
                const postsList = document.getElementById("postsList");
                postsList.appendChild(newPost);

                 //el formulario queda limpio para poder crear una nueva ,cuando la publicacion ya fue subida
                document.getElementById("uploadForm").reset();  // Reiniciar el formulario
                document.getElementById("previewContainer").innerHTML = "";  // Limpiar la vista previa de la imagen
            }
        };
        reader.readAsDataURL(file);  // Leer el archivo como una URL de datos
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
        input.value = '';  // Limpiar el campo de texto
    }
}

// Botón de me gusta
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-like")) {
        let count = parseInt(event.target.dataset.likes) || 0;
        count = event.target.classList.toggle("liked") ? count + 1 : count - 1;
        event.target.textContent = `👍 ${count}`;
        event.target.dataset.likes = count;  // Actualizar contador
    }
});

// Crear el botón de eliminar en el html para cada publicación subida
function createDeleteButton() {
    return `<button class="delete-btn" onclick="deletePost(this)">Eliminar</button>`;
}

// Función para eliminar una publicación
function deletePost(button) {
    const post = button.closest('.post');
    post.remove();  // Eliminar la publicación correspondiente
}
