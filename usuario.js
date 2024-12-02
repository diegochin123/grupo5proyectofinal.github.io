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