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

//creating a new message element and return it (div inside div) 
const createMessageElement = (content,...className)=>{
    const div = document.createElement("div");
    div.classList.add("message", ...className);//to accept any number of additional class names and spread them into the classList.add method
    div.innerHTML = content;
    return div;
}

//Fetch response from the API based on user message
const generateAPIResponse = async(incomingMessageDiv)=>{
    const textElement = incomingMessageDiv.querySelector(".text"); // get text element
    //Send a POST request to API with user's message
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: userMessage }]
                }]
            })
        });

        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message);
        
        //get the API response text and Remove asterisks from the response
        const apiResponse = data?.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
        //textElement.innerHTML = apiResponse;
        showTypingEffect(apiResponse,textElement,incomingMessageDiv)
    } catch (error) {
        isResponseGenerating = false; // setting isResponseGenerating to false once the response is typed or an error occurs
        textElement.innerText = error.message;
        textElement.classList.add("error");
    } finally {
        incomingMessageDiv.classList.remove("loading");

    }
}


//showing a loading animation while waiting for the API response 
const showLoadingAnimation = ()=>{

    const html = `<div class="message-content">
                    <img src="gemini.svg" alt="Gemini Image" class="avathar">
                    <p class="text"></p>
                    <div class="loading-indicator">
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                    </div>
                    </div>
                    <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`
    
                  
    const incomingMessageDiv = createMessageElement(html, "incoming","loading");
    chatList.appendChild(incomingMessageDiv);

    chatList.scrollTo(0, chatList.scrollHeight); // Scroll to bottom

    generateAPIResponse(incomingMessageDiv);
    
}

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





