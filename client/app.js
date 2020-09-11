const socket = io();

/*set const - form in index.html */
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

/*const global*/
let userName = '';

/*listener message*/

socket.on('message', ({ author, content }) => addMessage(author, content))
socket.on('newUser', ({ author, content }) => addMessage(author, content))
socket.on('removeUser', (id) => addMessage('chat-bot', id + ' has left the chat!'))
socket.on('join', login)


/*listener on welcome form*/
function login(e) {
    e.preventDefault();
    if (userNameInput.value == '')
     alert("Name is requied")
    else {
        userName = userNameInput.value;
        socket.emit('join', userName)
        socket.emit('newUser', { author: 'chat-bot', content: userName + ' has joined the conversation!' })
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
}

loginForm.addEventListener('submit', login)

/*listener on messages form*/
function addMessage (author, content){
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (author === 'chat-bot' )
        message.classList.add('message--cursive');
    else if (author == userName) 
        message.classList.add('message--self');
    message.innerHTML = 
    `<h3 class="message__author">${userName == author ? 'You' : author}</h3>
        <div class="message__content">
            ${content}
        </div>`;
    messagesList.appendChild(message);
}
function sendMessage(e) {  
    e.preventDefault();


    if (!messageContentInput.value)
        alert("Text is requied")
    else {
        addMessage(userName, messageContentInput.value);
        socket.emit('message', { author: userName, content: messageContentInput.value })
        messageContentInput.value = '';
   }
}

addMessageForm.addEventListener('submit', sendMessage)