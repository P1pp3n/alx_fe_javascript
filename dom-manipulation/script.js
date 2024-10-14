// Initialize an empty array to store quotes
let quotes = [
    { text: "Believe you can and you're halfway there.", category: "Inspirational" },
    { text: "The only way to do great work is to love what you do.", category: "Motivational" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspirational" }
];

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length > 0) {
        let randomIndex = Math.floor(Math.random() * quotes.length);
        let randomQuote = quotes[randomIndex];
        document.getElementById("quoteDisplay").innerHTML = `<p>${randomQuote.text}</p><p>Category: ${randomQuote.category}</p>`;
    } else {
        document.getElementById("quoteDisplay").innerHTML = "<p>No quotes available.</p>";
    }
}

// Function to add a new quote
function addQuote() {
    let quoteText = document.getElementById("newQuoteText").value;
    let quoteCategory = document.getElementById("newQuoteCategory").value;

    if (quoteText && quoteCategory) {
        let newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        showRandomQuote();
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    } else {
        alert("Please enter both quote and category.");
    }
}

// Function to create a form to add new quotes
function createAddQuoteForm() {
    // Create a form element
    let form = document.createElement("form");
    // Create input fields for quote text and category
    let quoteTextInput = document.createElement("input");
    quoteTextInput.type = "text";
    quoteTextInput.placeholder = "Enter a new quote";
    let quoteCategoryInput = document.createElement("input");
    quoteCategoryInput.type = "text";
    quoteCategoryInput.placeholder = "Enter quote category";
    // Create a button to submit the form
    let submitButton = document.createElement("button");
    submitButton.textContent = "Add Quote";
    // Add event listener to the submit button
    submitButton.addEventListener("click", addQuote);
    // Append the input fields and submit button to the form
    form.appendChild(quoteTextInput);
    form.appendChild(quoteCategoryInput);
    form.appendChild(submitButton);
    // Append the form to the page
    document.body.appendChild(form);
}

// Add event listener to the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Call the showRandomQuote function to display a random quote on page load
showRandomQuote();