const typingForm  = document.querySelector(".typing-form");
const chatList  = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion-list .suggestion");
const toggleThemeButton = document.querySelector("#toggle-theme-button");
const deleteChatButton = document.querySelector("#delete-chat-button");

let userMessage = null;
let isResponseGenerating = false; 
//API configuration
const API_KEY = "AIzaSyBzGH0mJIGEVOWGRJYlcyCJz0fJrR0DXf4";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;


//Handle sending outgoing chat messages
const handleOutgoingChat = ()=>{
    userMessage = typingForm.querySelector(".typing-input").value.trim() || userMessage;//get the input value and remove extra spaces
const suggestions = document.querySelectorAll(".suggestion-list .suggestion");
    if(!userMessage || isResponseGenerating) return; //return if response is generating or userMessage is empty

    isResponseGenerating = true ;
    
    const html = `<div class="message-content">
                    <img src="assets/p1.jpg" alt="User Image" class="avathar">
                    <p class="text"></p>
                  </div>`
    
                  
    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText = userMessage; // creating an element of outgoing message and adding it to the chat list
    chatList.appendChild(outgoingMessageDiv);

    typingForm.reset(); //Clear input field
    chatList.scrollTo(0, chatList.scrollHeight); // Scroll to bottom
    document.body.classList.add("hide-header"); // hide the header once chat started
    setTimeout(showLoadingAnimation,500); // showing loading animation after a delay
}


//preventing default form submission and handle outgoing chat
typingForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    handleOutgoingChat();
    
})





