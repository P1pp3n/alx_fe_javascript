// Array to store quotes, each quote has text and category
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    // Get a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    // Update the DOM to display the quote
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Clear the current content
    quoteDisplay.innerHTML = '';
  
    // Create paragraph for the quote text
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${randomQuote.text}"`;
  
    // Create paragraph for the quote category (author/category)
    const quoteCategory = document.createElement('p');
    quoteCategory.textContent = `— ${randomQuote.category}`;
    quoteCategory.style.fontStyle = 'italic';
  
    // Append the new elements to the quoteDisplay div
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
  }
  
  // Function to dynamically create the form to add a new quote
  function createAddQuoteForm() {
    // Create a div to wrap the form elements
    const formDiv = document.createElement('div');
  
    // Create input for the new quote text
    const newQuoteText = document.createElement('input');
    newQuoteText.id = 'newQuoteText';
    newQuoteText.type = 'text';
    newQuoteText.placeholder = 'Enter a new quote';
    
    // Create input for the new quote category
    const newQuoteCategory = document.createElement('input');
    newQuoteCategory.id = 'newQuoteCategory';
    newQuoteCategory.type = 'text';
    newQuoteCategory.placeholder = 'Enter quote category';
  
    // Create a button to add the new quote
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);
  
    // Append the inputs and button to the form div
    formDiv.appendChild(newQuoteText);
    formDiv.appendChild(newQuoteCategory);
    formDiv.appendChild(addButton);
  
    // Insert the form div into the DOM, below the quote display
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.insertAdjacentElement('afterend', formDiv);
  }
  
  // Function to add a new quote to the array and display it
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      // Add new quote to the array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      
      // Clear the quote display and show the newly added quote
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = '';  // Clear any previous content
  
      // Display the newly added quote using DOM manipulation
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
  
  // Add event listener to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Call function to create the form after the DOM has loaded
  window.onload = createAddQuoteForm;
  