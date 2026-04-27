# Web Development - Assessment 2

# Development Approach 
I first read the requirements for the assignment. 
Next, I designed the website. I wanted it to give off a fun, personal impression but met all the requirements. Using wireframes, I designed a layout for the website. The layout fits for both smaller and larger devices. 
I also decided on the functional and end user requirements, these were heavily influenced by the requirements set out for the assignment. 
Implementation was completed after the design phase.
Testing was completed. I preferred manual tests rather than automated ones. 
I jumped between the testing and implementation stage in this project. 

# Challenges Faced 
There were 3 main challenges faced during this assignment: 
1. The website design
At the beginning, there were many elements of the website that I did not like. The colours, the layout and the content were either too simple or too overwhelming. It took a couple of designing sessions to find something that I was happy with. Eventually, I decided that a moderate contrast with no sharp corners gave the webpage the appearance I desired. 

2. The Chat Application
While I have used JavaScript in the past, this was the first project that I was using which required modules such as Node JS, Express and Socket.io. 
The sending messages/receiving messages and the alerts that a user had entered/exited the chat requirements were straightforward. However, the 'User is typing...' message was very difficult. It took hours of trial and error to even get the message to appear. 
The code will now tell the user if the other person is typing, and the message will delete when the message is sent. 
Unfortunately, if the user types a message but deletes the content before entering the message, the 'User is typing...' message will remain until the next message is sent. 

3. User Error With Repositories
When I started this project back in March, I created a repository with GitHub. I was making regular commits with descriptive comments. 
Around this time, I was working on a personal project using websites. 
I discovered I had accidently added this website to my repository and had to make a completely new repository, slowing progress significantly. 

# Technical Details of Chat Application
When the user first joins the chat, the server-side JavaScript will hear the connection and send the 'new user' event to the client side javascript which will add the user to a list of currently active users and an alert window will appear, informing other users of their arrival. 

When the user starts to type a message, the client-side javascript will detect the input. If the length of the content in the message is 0, there will be no 'User is typing...' message. Otherwise the client-side will send the event to the server-side which will send a 'User is Typing... ' event to the client-side javascript so it can be displayed to every user except the one typing. 

When the user sends a message, if there is no content the event will be returned and nothing will happen. Otherwise, the 'typing' event is sent to the server-side javascript where the event will be emitted leading to the 'User is typing...' message to be displayed. 

When the user disconnects from the chat application, the server-side javascript will emit the 'user disconnected' event to the client-side javascript which will hear the event and display an alert window announcing to the other users that the user has left. It will also remove the user from the 'currently active users' list. 

# Instructions on How To Run The Application 
After downloading the files, it is important that the user installs Node JS as this runs the server. This can be done by downloading offcial node.js packages. 
The user will also need to install Express and Socket.io. The user can do this on the terminal. After navigating to the 'assessment2_Working' folder on the terminal, running 'npm install express' and 'npm install socket.io', the user now has all the packages needed to run the website. 

Before accessing the website, the user needs to run the command 'node chatScript.js' to start the 'chatScript.js' script using Node JS. 

Now the user is ready to access the website!

The user can send messages to other users and see information about myself.

# SOURCES 
1. W3Schools, N/A, 'How To Create A Scroll To Top Button', Link:https://www.w3schools.com/howto/howto_js_scroll_to_top.asp, Accessed: 22nd April 2026
2. Socket.IO, 2026, 'Emit Cheatsheet', Link: https://socket.io/docs/v2/emit-cheatsheet/, Accessed: 27th April 2026
3. W3Schools, N/A, 'How TO - Button on Image', Link:  https://www.w3schools.com/howto/howto_css_button_on_image.asp, Accessed:27th April 2026