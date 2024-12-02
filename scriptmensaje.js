document.getElementById('sendButton').addEventListener('click', function() {
    const messageInput = document.getElementById('messageInput');
    const messageArea = document.getElementById('messageArea');

    if (messageInput.value.trim() !== '') {
        const message = document.createElement('div');
        message.textContent = messageInput.value;
        message.classList.add('message');
        messageArea.appendChild(message);
        messageInput.value = ''; // Clear the input field
        messageArea.scrollTop = messageArea.scrollHeight; // Scroll to the bottom
    }
});