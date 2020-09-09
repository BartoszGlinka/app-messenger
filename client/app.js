/*set const - form in index.html */
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

/*const global*/
let userName = 0;

/*listener on welcome form*/
function login(e) {
    
    e.preventDefault();
    if (userNameInput.value == '')
     alert("Name is requied")
    else {
        userName = userNameInput;
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
    author === userName ? message.classList.add('message--self') : null;
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}
function sendMessage(e) {  
    e.preventDefault();
    if (messageContentInput.value == '')
        alert("Text is requied")
    else {
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
   }
}

addMessageForm.addEventListener('submit', sendMessage)