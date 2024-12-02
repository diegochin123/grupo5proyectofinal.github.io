// Botón de seguir
document.getElementById("btn-seguir").addEventListener("click", function () {
    // Verifica si el botón tiene el estado "Siguiendo"
    if (this.innerHTML.includes("Siguiendo")) {
        // Cambia de vuelta a "Seguir"
        this.innerHTML = '<img src="seguir.png" alt="Seguir" class="icono-btn"> Seguir';
    } else {
        // Cambia a "Siguiendo"
        this.innerHTML = '<img src="check.png" alt="Siguiendo" class="icono-btn"> Siguiendo';
    }
});

// Botón de Mensaje para redirigir a mensajes.html
document.getElementById("btn-mensaje").addEventListener("click", function () {
    window.location.href = "mensajes.html";
});

// Botón de editar
document.getElementById('btn-editar').addEventListener('click', function () {
    // Usa una clase para verificar si está en modo edición en lugar de comparar innerHTML
    let isEditing = this.classList.contains('editing');
    const elements = document.querySelectorAll('#perfil .info-usuario span');

    elements.forEach(el => {
        if (isEditing) {
            el.contentEditable = 'false';
            el.style.border = 'none';
        } else {
            el.contentEditable = 'true';
            el.style.border = '1px dashed #ccc';
        }
    });

    // Cambia el contenido del botón y alterna la clase 'editing'
    if (isEditing) {
        this.innerHTML = '<img src="editar.png" alt="Editar" class="icono-btn"> Editar perfil';
        this.classList.remove('editing');
    } else {
        this.innerHTML = '<img src="guardar.png" alt="Guardar" class="icono-btn"> Guardar';
        this.classList.add('editing');
    }
});

// Función para manejar la carga de la imagen
document.getElementById("cargar-imagen").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imagen-perfil").src = e.target.result; // Cambia la imagen
        };
        reader.readAsDataURL(file);
    }
});

// Hacer clic en la imagen de perfil para cargar una nueva imagen solo si se está editando
document.getElementById("imagen-perfil").addEventListener("click", function () {
    const isEditing = document.getElementById('btn-editar').classList.contains('editing');
    if (isEditing) {
        document.getElementById("cargar-imagen").click();
    }
});

//Publicaciones
// Manejador para mostrar/ocultar el área de comentarios
document.querySelectorAll('.btn-comentar').forEach((boton) => {
    boton.addEventListener('click', function () {
        const publicacion = this.closest('.publicacion');
        const comentarioInput = publicacion.querySelector('.comentario-input');

        // Alternar la visibilidad del textarea y el botón
        if (comentarioInput.style.display === 'none' || comentarioInput.style.display === '') {
            comentarioInput.style.display = 'block'; // Mostrar textarea
        } else {
            comentarioInput.style.display = 'none'; // Ocultar textarea
        }
    });
});

// Manejador para el botón "like"
document.querySelectorAll('.btn-like').forEach(function (btn) {
    let count = 0; // Inicializa el contador de likes

    btn.addEventListener('click', function () {
        // Alterna el estado de "like"
        if (btn.classList.contains('liked')) {
            count--; // Si ya está en liked, resta 1
            btn.classList.remove('liked');
        } else {
            count++; // Si no está en liked, suma 1
            btn.classList.add('liked');
        }

        // Actualiza el texto del botón
        btn.textContent = `👍 ${count}`;
    });
});