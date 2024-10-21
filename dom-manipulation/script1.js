// Array to store quotes, each quote has text and category
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    const quoteText = document.createElement('p');
    quoteText.textContent = `"${randomQuote.text}"`;

    const quoteCategory = document.createElement('p');
    quoteCategory.textContent = `— ${randomQuote.category}`;
    quoteCategory.style.fontStyle = 'italic';

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);

    // Save the last viewed quote to session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

// Function to create the form to add a new quote
function createAddQuoteForm() {
    const formDiv = document.createElement('div');

    const newQuoteText = document.createElement('input');
    newQuoteText.id = 'newQuoteText';
    newQuoteText.type = 'text';
    newQuoteText.placeholder = 'Enter a new quote';

    const newQuoteCategory = document.createElement('input');
    newQuoteCategory.id = 'newQuoteCategory';
    newQuoteCategory.type = 'text';
    newQuoteCategory.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);

    formDiv.appendChild(newQuoteText);
    formDiv.appendChild(newQuoteCategory);
    formDiv.appendChild(addButton);

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.insertAdjacentElement('afterend', formDiv);
}

// Function to add a new quote to the array and display it
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes(); // Save to local storage

        showRandomQuote(); // Display the new quote

        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
    const jsonQuotes = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonQuotes], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Save to local storage
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Load quotes from local storage when the application initializes
window.onload = function() {
    loadQuotes();
    createAddQuoteForm();

    // Show a random quote if there are quotes available
    if (quotes.length > 0) {
        showRandomQuote();
    }

    // Create buttons for export and import
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Quotes to JSON';
    exportButton.addEventListener('click', exportToJsonFile);
    document.body.appendChild(exportButton);

    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = '.json';
    importInput.addEventListener('change', importFromJsonFile);
    document.body.appendChild(importInput);
};
