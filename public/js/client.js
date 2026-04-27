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
  console.log("SOCKET CONNECTED:", socket.id);
  newUserConnected();
});

//when a new user event is detected
socket.on("new user", function (data) {
  data.map(function (user) {
          return addToUsersBox(user);
      });
  newUser = data[data.length - 1]
  window.alert(`${newUser} Has Joined The Chat!`)
});

//when a user leaves
socket.on("user disconnected", function (userName) {
  window.alert(` ${userName} has Left The Chat`)
  document.querySelector(`.${userName}-userlist`).remove();
});


const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".chat_history");
const currentlyTyping = document.querySelector('.currentlyTyping');

const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

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
  
  socket.on("notTyping", (name) => {
  console.log("STOP TYPING RECEIVED:", name);
  currentlyTyping.textContent = "";})
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputField.value) {
    return;
  } 

  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  });
  socket.emit("notTyping",userName)
  inputField.value = "";
});

socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message });
  currentlyTyping.textContent = ``;
});

/*
inputField.addEventListener("input", () => {
  const isEmpty = inputField.value.trim().length === 0;
  if(isEmpty) {
    socket.emit("notTyping",userName);
    currentlyTyping.textContent = "";
  }
  if (!isEmpty) {
    socket.emit("typing", userName);
  }
});
*/

inputField.addEventListener("input", () => {
  const value = inputField.value.trim();

  if (value.length === 0) {
    socket.emit("notTyping", userName);
    return;
  }

  socket.emit("typing", userName);
});

/*
inputField.addEventListener("keydown", (event) => {
  if (event.key == "Backspace" && (inputField.value).length == 1) {
    console.log("One!")
    currentlyTyping.textContent = "";
  }
});

inputField.addEventListener("input", (event) => {
  if ((inputField.value.trim().length) === 0) {
    console.log("One!")
    currentlyTyping.textContent = ``;
    console.log(currentlyTyping)
  }
});
*/


socket.on("typing", (name) => {
  console.log("SERVER got TYPING:",name)
    currentlyTyping.textContent = `${name} is typing...`;
  });

socket.on("NotTyping", (name) => {
  console.log("SERVER got NOT TYPING:",name)
    currentlyTyping.textContent = "";
  });
