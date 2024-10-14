// Simulate server interaction using JSONPlaceholder
const apiUrl = 'https://jsonplaceholder.typicode.com/quotes';

// Function to retrieve quotes from the server
async function getQuotes() {
    try {
        const response = await fetch(apiUrl);
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

// Function to update quotes on the server
async function updateQuotes(quotes) {
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quotes),
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

// Function to resolve conflicts
async function resolveConflict(localQuotes, serverQuotes) {
    // Implement conflict resolution strategy here
    // For example, use the Last Writer Wins strategy
    return localQuotes;
}

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
    const quotes = await getQuotes();
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display quotes
function displayQuote(quotes, index) {
    const thought = document.getElementById('thought');
    const quote = quotes[index].text;
    const author = quotes[index].author;

    if (!author) {
        author = 'unknown';
    }

    const htmlQuote = `
        <div class="alert alert-outline-primary">
            ${quote}<br>
            <span style="color:#00ffc5;">${author}</span>
        </div>
    `;

    thought.innerHTML = htmlQuote;
}

// Function to handle button clicks
async function newQuote() {
    const nextthought = document.getElementById('nextthought');
    const previousthought = document.getElementById('previousthought');
    const searchbtn = document.getElementById('searchbtn');
    const countnum = document.getElementById('countnum');
    const inputsearch = document.getElementById('inputsearch');

    let a = 0;

    searchbtn.addEventListener('click', async function () {
        a = inputsearch.value;
        countnum.value = inputsearch.value;
        const quotes = await getQuotes();
        displayQuote(quotes, a);
    });

    nextthought.addEventListener('click', async function () {
        countnum.value = ++a;
        const quotes = await getQuotes();
        displayQuote(quotes, a);
    });

    previousthought.addEventListener('click', async function () {
        if (countnum.value < 0) {
            const thought = document.getElementById('thought');
            thought.innerHTML = `<b><i>You are at first quote</i></b>`;
        } else {
            a = --countnum.value;
            const quotes = await getQuotes();
            displayQuote(quotes, a);
        }
    });

    // Initialize quote display
    const quotes = await getQuotes();
    displayQuote(quotes, 0);

    // Periodically sync data with server
    setInterval(async function () {
        const localQuotes = await getQuotes();
        const serverQuotes = await fetch(apiUrl);
        const resolvedQuotes = await resolveConflict(localQuotes, serverQuotes);

        // Update local storage with resolved quotes
        localStorage.setItem('quotes', JSON.stringify(resolvedQuotes));
    }, 10000); // Sync every 10 seconds
}

newQuote();

// Fetch quotes from server on page load
fetchQuotesFromServer();