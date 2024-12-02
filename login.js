let emailInput = document.getElementById('email');
let mensaje = document.getElementById('mensaje');
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
    let email = emailInput.value;

    if (email === "") {
        alert("El campo de correo electrónico no puede estar vacío.");
        evt.preventDefault(); // Evita el envío del formulario
        return;
    }

    if (!patronEmail.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        evt.preventDefault();
        return;
    }

    alert("Inicio de sesión exitoso.");
});
