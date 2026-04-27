//required for front end communication between client and server
const socket = io();
const inboxPeople = document.querySelector(".inbox__people");
let userName = "";
let id;
const newUserConnected = function (data) {
    

    //give the user a random unique id
    id = Math.floor(Math.random() * 1000000);
    userName = 'user-' +id;
    //console.log(typeof(userName));   
    
    //emit an event with the user id
    socket.emit("new user", userName);
    //call
    addToUsersBox(userName);
};

const addToUsersBox = function (userName) {
    //This if statement checks whether an element of the user-userlist
    //exists and then inverts the result of the expression in the condition
    //to true, while also casting from an object to boolean
    if (!!document.querySelector(`.${userName}-userlist`)) {
        return;
    
    }
    //setup the divs for displaying the connected users
    //id is set to a string including the username
    const userBox = `
    <div class="chat_id ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `;
    //set the inboxPeople div with the value of userbox
    inboxPeople.innerHTML += userBox;
};
//call 
socket.on("connect", () => {
  newUserConnected();
});
//when a new user event is detected
socket.on("new user", function (data) {
  // They are added to the list of active users 
  data.map(function (user) {
          return addToUsersBox(user);
      });
  // When a new user joins the chat, an alert window pops up to welcome them
  newUser = data[data.length - 1]
  window.alert(`${newUser} Has Joined The Chat!`)
});
//when a user leaves
socket.on("user disconnected", function (userName) {
  // When a user leaves, a alert window pops up to announce their exit 
  window.alert(` ${userName} has Left The Chat`)
  // They are removed from the list of active users 
  document.querySelector(`.${userName}-userlist`).remove();
});

// Receives data from 'chat.html' script
const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".chat_history");
const currentlyTyping = document.querySelector('.currentlyTyping');

const addNewMessage = ({ user, message }) => {
  // Finds the current time
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  // Constructs HTML for other user's messages so the browser can
  // display the information correctly 
  // The message contains the users: username, message and the time it was sent
  const receivedMsg = `
  <div class="incoming__message">
    <div class="received__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="message__author">${user}</span>
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  // Constructs HTML for the user's messages so the browser can
  // display the information correctly 
  // The message contains the users: username, message and the time it was sent
  const myMsg = `
  <div class="outgoing__message">
    <div class="sent__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  //is the message sent or received
  messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
  console.log('messageBox:',messageBox)
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // If a message is entered with no content, nothing will be emitted so 
  // it looks like nothing has happened
  if (!inputField.value) {
    return;
  } 
  // If there is content, an event is sent to the server 
  // which says that a chat message has been entered with the username and message 
  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  });
  // After the event has been sent, an event is  sent to the server 
  // saying that the user is not typing anymore and clears the message field
  socket.emit("notTyping",userName)
  inputField.value = "";
});

socket.on("chat message", function (data) {
  //When a chat message is sent to the server, the addNewMessage event is called so that the 
  // entered message can be displayed on the chat box to the users of the chat
  addNewMessage({ user: data.nick, message: data.message });
  // After this event is called, the 'User is typing... ' message is 'cleared'.
  currentlyTyping.textContent = ``;
});

inputField.addEventListener("input", () => {
  const value = inputField.value.trim();
  // When the length of the message input field is 0, the 'User is typing...' message is 'cleared.
  if (value.length === 0) {
    currentlyTyping.textContent = ``
    return;
  }
  // When an value is detected in the message input field, the 'User is typing...' message is displayed to other users of the chat 
  socket.emit("typing", userName);
});

// Listens for when a user is typing and displays 'User is typing' message
socket.on("typing", (name) => {
    currentlyTyping.textContent = `${name} is typing...`;
  });

  // Listens for when a user is not typing and 'clears' the 'User is typing...' message
socket.on("NotTyping", (name) => {
    currentlyTyping.textContent = "";
  });