let socket;

let nameBtn = document.getElementById('name-btn');
nameBtn.addEventListener('click', () => {
    socket = io();

    let name = document.getElementById('name').value;
    socket.emit('newPlayer', name);
});