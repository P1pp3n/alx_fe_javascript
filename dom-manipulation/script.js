// Check if localStorage contains any quotes; if yes, load them; otherwise, use the default array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
  
  // Function to save quotes array to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    // Save the last viewed quote in session storage
    sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
  
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${randomQuote.text}"`;
  
    const quoteCategory = document.createElement('p');
    quoteCategory.textContent = `— ${randomQuote.category}`;
    quoteCategory.style.fontStyle = 'italic';
  
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
  }
  
  // Function to dynamically create the form to add a new quote
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
  
  // Function to add a new quote to the array, update the DOM, and save to localStorage
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      
      // Save the updated quotes array to localStorage
      saveQuotes();
  
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = '';
  
      const quoteTextElement = document.createElement('p');
      quoteTextElement.textContent = `"${newQuoteText}"`;
      
      const quoteCategoryElement = document.createElement('p');
      quoteCategoryElement.textContent = `— ${newQuoteCategory}`;
      quoteCategoryElement.style.fontStyle = 'italic';
  
      quoteDisplay.appendChild(quoteTextElement);
      quoteDisplay.appendChild(quoteCategoryElement);
  
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // Function to export quotes array as a JSON file
  function exportQuotesToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    downloadLink.click();
  
    URL.revokeObjectURL(url);  // Clean up the URL object
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Restore last viewed quote from session storage if it exists
  function loadLastViewedQuote() {
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = '';
  
      const quoteText = document.createElement('p');
      quoteText.textContent = `"${lastQuote.text}"`;
  
      const quoteCategory = document.createElement('p');
      quoteCategory.textContent = `— ${lastQuote.category}`;
      quoteCategory.style.fontStyle = 'italic';
  
      quoteDisplay.appendChild(quoteText);
      quoteDisplay.appendChild(quoteCategory);
    }
  }
  
  // Add event listener to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Call functions to create the form and restore last viewed quote on page load
  window.onload = function() {
    createAddQuoteForm();
    loadLastViewedQuote();
  };
  