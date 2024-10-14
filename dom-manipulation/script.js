// Array of quote objects
let quotes = [
    { text: "Believe you can and you're halfway there.", category: "Motivational" },
    { text: "The only way to do great work is to love what you do.", category: "Motivational" },
    { text: "Be the change that you wish to see in the world.", category: "Inspirational" },
    // Add more quotes here
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    // Select a random index from the quotes array
    let randomIndex = Math.floor(Math.random() * quotes.length);
    let randomQuote = quotes[randomIndex];
  
    // Get the #quoteDisplay element
    let quoteDisplay = document.getElementById("quoteDisplay");
  
    // Set the innerHTML of #quoteDisplay to the random quote
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p>Category: ${randomQuote.category}</p>`;
  }
  
  // Call the showRandomQuote function when the page loads
  showRandomQuote();
  
  // Add an event listener to the #newQuote button
  let newQuoteButton = document.getElementById("newQuote");
  newQuoteButton.addEventListener("click", showRandomQuote);
  
  // Function to add a new quote
  function addQuote() {
    // Get the values from the form inputs
    let newQuoteText = document.getElementById("newQuoteText").value;
    let newQuoteCategory = document.getElementById("newQuoteCategory").value;
  
    // Create a new quote object
    let newQuote = { text: newQuoteText, category: newQuoteCategory };
  
    // Add the new quote to the quotes array
    quotes.push(newQuote);
  
    // Clear the form inputs
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  
    // Show a random quote again
    showRandomQuote();
  }