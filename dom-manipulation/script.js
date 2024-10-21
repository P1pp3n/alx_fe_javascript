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
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- ${randomQuote.category}</em></p>`;
  }
  
  // Function to dynamically create the form to add a new quote
  function createAddQuoteForm() {
    const formHTML = `
      <div>
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
      </div>
    `;
    
    // Insert the form into the DOM below the quote display
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.insertAdjacentHTML('afterend', formHTML);
  }
  
  // Function to add a new quote to the array and display it
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      // Add new quote to the array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      
      // Display the newly added quote
      document.getElementById('quoteDisplay').innerHTML = `<p>"${newQuoteText}"</p><p><em>- ${newQuoteCategory}</em></p>`;
  
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
  