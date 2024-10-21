// Initialize the quotes array
let quotes = [];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  if (quotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p>Category: ${randomQuote.category}</p>`;
  } else {
    quoteDisplay.innerHTML = '<p>No quotes available.</p>';
  }
}

// Function to create the add quote form
function createAddQuoteForm() {
  const addQuoteForm = document.createElement('div');
  addQuoteForm.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteButton">Add Quote</button>
  `;
  document.body.appendChild(addQuoteForm);
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes(); // Save quotes to local storage
    showRandomQuote();
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert('Please fill in both fields.');
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes)); // Save the quotes array as a JSON string
}

// Load existing quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes'); // Retrieve the quotes from local storage
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes); // Parse the JSON string back into an array
  }
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
  const jsonQuotes = JSON.stringify(quotes);
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
    saveQuotes(); // Save the imported quotes to local storage
    alert('Quotes imported successfully!');
    showRandomQuote(); // Show a random quote after import
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initialize the application
loadQuotes();
createAddQuoteForm();
showRandomQuote();

// Add event listener to the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Add event listener to the "Add Quote" button
document.getElementById('addQuoteButton').addEventListener('click', addQuote);

// Add event listener to the "Export to JSON" button
const exportButton = document.createElement('button');
exportButton.textContent = 'Export to JSON';
exportButton.onclick = exportToJsonFile;
document.body.appendChild(exportButton);

// Add event listener to the "Import from JSON" input
const importInput = document.createElement('input');
importInput.type = 'file';
importInput.accept = '.json';
importInput.onchange = importFromJsonFile;
document.body.appendChild(importInput);