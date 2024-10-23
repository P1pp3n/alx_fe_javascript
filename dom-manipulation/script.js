// Initial quotes array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Leadership" }
  ];
  
  const serverApiUrl = "https://jsonplaceholder.typicode.com/posts";  // Simulated server URL for testing
  
  // Function to display a random quote
  function showRandomQuote() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    const filteredQuotes = selectedCategory === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);
  
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
  
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = `
        <p>"${randomQuote.text}"</p>
        <p style="font-style: italic;">— ${randomQuote.category}</p>
      `;
    } else {
      document.getElementById('quoteDisplay').textContent = "No quotes available for this category.";
    }
  }
  
  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      const newQuote = { text: newQuoteText, category: newQuoteCategory };
      quotes.push(newQuote);
  
      saveQuotes();
      populateCategories();  // Update the dropdown with new categories if needed
      showRandomQuote();  // Display a random quote based on the current filter
  
      syncWithServer();  // Sync with the server after adding a new quote
  
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // Function to populate the category filter dropdown dynamically
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Clear existing options except 'All Categories'
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    // Get unique categories from the quotes array
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    
    // Populate the dropdown with unique categories
    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore the last selected filter from local storage, if available
    const lastSelectedFilter = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = lastSelectedFilter;
    filterQuotes();
  }
  
  // Function to filter quotes by category
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    // Save the selected category to local storage
    localStorage.setItem('selectedCategory', selectedCategory);
    showRandomQuote();  // Display a random quote from the selected category
  }
  
  // Function to fetch quotes from the server (Simulated)
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch(serverApiUrl);
      const serverQuotes = await response.json();
      
      // Assume that the server returns quotes in the correct format (text and category)
      const formattedQuotes = serverQuotes.map(quote => ({
        text: quote.title,  // Using 'title' from the mock API as the quote text
        category: "General"  // Assigning a default category since the mock API doesn't have categories
      }));
  
      return formattedQuotes;
    } catch (error) {
      console.error('Error fetching quotes from server:', error);
      return [];
    }
  }
  
  // Function to sync quotes with the server (Simulated)
  async function syncWithServer() {
    try {
      // Fetch quotes from server
      const serverQuotes = await fetchQuotesFromServer();
  
      // Conflict resolution: server takes precedence
      const conflicts = resolveConflicts(serverQuotes, quotes);
      
      if (conflicts.length > 0) {
        if (confirm('There are conflicts with the server data. Do you want to accept the server changes?')) {
          quotes = serverQuotes;
          alert("Server data accepted.");
        } else {
          alert("No changes made.");
        }
      } else {
        alert("Data is already synced.");
      }
  
      // Save the resolved data and update the UI
      saveQuotes();
      populateCategories();
      showRandomQuote();
    } catch (error) {
      console.error('Error syncing with server:', error);
      alert("Failed to sync with server.");
    }
  }
  
  // Function to resolve conflicts
  function resolveConflicts(serverQuotes, localQuotes) {
    // Check for any differences between server and local quotes
    const conflicts = [];
    
    serverQuotes.forEach(serverQuote => {
      const match = localQuotes.find(localQuote => localQuote.text === serverQuote.text && localQuote.category === serverQuote.category);
      if (!match) {
        conflicts.push(serverQuote);
      }
    });
  
    return conflicts;
  }
  
  // Function to export quotes as a JSON file
  function exportQuotesToJson() {
    const jsonStr = JSON.stringify(quotes);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    
    URL.revokeObjectURL(url);  // Clean up the URL after download
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();  // Save the imported quotes to local storage
      populateCategories();  // Update the dropdown with new categories
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listener for showing a new random quote
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Populate categories and show a random quote on page load
  populateCategories();
  showRandomQuote();
  
  // Periodically sync with the server every 30 seconds
  setInterval(syncWithServer, 30000);
  