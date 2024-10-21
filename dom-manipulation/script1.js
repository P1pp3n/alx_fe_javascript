// Array to store quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
  
  // Load existing quotes from local storage
  function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes'); // Retrieve quotes from local storage
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes); // Parse and set the quotes
    }
  }
  
  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes)); // Store quotes in local storage
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
  
    // Store last viewed quote index in session storage
    sessionStorage.setItem('lastViewedQuoteIndex', randomIndex);
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
      saveQuotes(); // Save updated quotes to local storage
      
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = '';
  
      const quoteTextElement = document.createElement('p');
      quoteTextElement.textContent = `"${newQuoteText}"`;
  
      const quoteCategoryElement = document.createElement('p');
      quoteCategoryElement.textContent = `— ${newQuoteCategory}`;
      quoteCategoryElement.style.fontStyle = 'italic';
  
      quoteDisplay.appendChild(quoteTextElement);
      quoteDisplay.appendChild(quoteCategoryElement);
  
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // Function to export quotes to JSON
  function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Function to import quotes from JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes(); // Save imported quotes to local storage
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Add event listener to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Load quotes when the page loads
  window.onload = function() {
    loadQuotes(); // Load quotes from local storage
    createAddQuoteForm();
  };
  