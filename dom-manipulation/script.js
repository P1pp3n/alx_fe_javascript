// script.js
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "What we think, we become.", category: "Philosophy" },
    { text: "In the end, we only regret the chances we didn’t take.", category: "Regret" },
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.textContent = `"${quotes[randomIndex].text}" - ${quotes[randomIndex].category}`;
}

function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    
    const inputText = document.createElement("input");
    inputText.id = "newQuoteText";
    inputText.type = "text";
    inputText.placeholder = "Enter a new quote";

    const inputCategory = document.createElement("input");
    inputCategory.id = "newQuoteCategory";
    inputCategory.type = "text";
    inputCategory.placeholder = "Enter quote category";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);

    formContainer.appendChild(inputText);
    formContainer.appendChild(inputCategory);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
}

function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;

    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';
        alert("Quote added successfully!");
    } else {
        alert("Please enter both quote and category!");
    }
}

// Create the form on page load
createAddQuoteForm();

// Event listeners for existing elements
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
