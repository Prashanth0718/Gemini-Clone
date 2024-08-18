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

//preventing default form submission and handle outgoing chat
typingForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    handleOutgoingChat();
    
})





