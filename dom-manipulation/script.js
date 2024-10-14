// Initialize an empty array to store quotes
let quotes = [];

// Load quotes from local storage
function loadQuotesFromStorage() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Call loadQuotesFromStorage on page load
loadQuotesFromStorage();

// Add a new quote to the quotes array
function addQuote() {
    let quoteText = document.getElementById("newQuoteText").value;
    let quoteCategory = document.getElementById("newQuoteCategory").value;

    if (quoteText && quoteCategory) {
        let newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        saveQuotes(); // Save quotes to local storage
        populateCategories(); // Update categories dropdown
        showRandomQuote();
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    } else {
        alert("Please enter both quote and category.");
    }
}

// Populate categories dropdown dynamically
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.text = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory || selectedCategory === "all");
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";
    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement("p");
        quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Remember the last selected filter
function saveFilter() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem('lastFilter', selectedCategory);
}

function loadFilter() {
    const lastFilter = localStorage.getItem('lastFilter');
    if (lastFilter) {
        document.getElementById("categoryFilter").value = lastFilter;
        filterQuotes();
    }
}

// Call loadFilter on page load
loadFilter();

// Add event listeners to buttons
document.getElementById("exportButton").addEventListener("click", exportQuotesToJson);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);