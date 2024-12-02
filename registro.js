let emailInput = document.getElementById('email');
let mensaje = document.createElement('p');
mensaje.id = 'mensaje';
document.querySelector('.register-container').appendChild(mensaje);
let patronEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Validar correo electrónico al perder el foco del campo
emailInput.addEventListener('blur', function () {
    let email = emailInput.value;

    if (patronEmail.test(email)) {
        mensaje.textContent = 'El correo electrónico es válido.';
        mensaje.style.color = 'blue';
    } else {
        mensaje.textContent = 'El correo electrónico no es válido.';
        mensaje.style.color = 'red';
    }
});

// Validar formulario al enviarlo
document.querySelector('form').addEventListener('submit', function (evt) {
    let nombreCompleto = document.getElementById('full-name').value.trim();
    let email = emailInput.value.trim();
    let ubicacion = document.getElementById('location').value.trim();
    let password = document.getElementById('password').value.trim();

    if (!nombreCompleto || !email || !ubicacion || !password) {
        alert("Todos los campos son obligatorios.");
        evt.preventDefault(); // Evitar el envío del formulario
        return;
    }

    if (!patronEmail.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        evt.preventDefault();
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        evt.preventDefault();
        return;
    }

    alert("Usuario registrado con éxito.");
});
