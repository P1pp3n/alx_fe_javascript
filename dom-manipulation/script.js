// Array of quotes
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Code is like humor. When you have to explain it, it's bad. - Cory House",
    "Optimism is an occupational hazard of programming: feedback is the treatment. - Kent Beck",
    "Simplicity is the soul of efficiency. - Austin Freeman",
    "Before software can be reusable it first has to be usable. - Ralph Johnson",
    "Make it work, make it right, make it fast. - Kent Beck",
  ];
  
  // Function to generate and display a random quote
  function displayQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    const quoteElement = document.getElementById("quoteDisplay");
    quoteElement.textContent = quotes[index];
  }
  
  // Event listener for new quote button
  const newQuoteButton = document.getElementById("newQuote");
  newQuoteButton.addEventListener("click", displayQuote);
  
  // Function to create the add quote form
  function createAddQuoteForm() {
    const addQuoteForm = document.getElementById("addQuoteForm");
    const newQuoteText = document.createElement("input");
    newQuoteText.type = "text";
    newQuoteText.placeholder = "Enter a new quote";
    newQuoteText.id = "newQuoteText";
    
    const newQuoteCategory = document.createElement("input");
    newQuoteCategory.type = "text";
    newQuoteCategory.placeholder = "Enter quote category";
    newQuoteCategory.id = "newQuoteCategory";
    
    const addQuoteButton = document.createElement("button");
    addQuoteButton.textContent = "Add Quote";
    addQuoteButton.id = "addQuoteButton";
    
    addQuoteForm.appendChild(newQuoteText);
    addQuoteForm.appendChild(newQuoteCategory);
    addQuoteForm.appendChild(addQuoteButton);
  }
  
  // Call the createAddQuoteForm function
  createAddQuoteForm();
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteTextValue = document.getElementById("newQuoteText").value;
    const newQuoteCategoryValue = document.getElementById("newQuoteCategory").value;
    const newQuote = `${newQuoteTextValue} - ${newQuoteCategoryValue}`;
    quotes.push(newQuote);
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
  
  // Event listener for add quote button
  const addQuoteButton = document.getElementById("addQuoteButton");
  addQuoteButton.addEventListener("click", addQuote);