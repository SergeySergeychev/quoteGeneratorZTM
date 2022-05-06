import { localQuotes } from "./quotes.js";
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let errHappened = 0;
const MAX_ERR_QUANT = 3;
//Helper functions
function checkAuthor(author) {
  // Check if Author filed is blank and replace t with "Unknown"
  if (!author) {
    authorText.innerText = "Unknown";
  } else {
    authorText.innerText = author;
  }
}

function checkQuoteLength(quote) {
  // Check the quote length to determine styling
  if (quote.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
}

function showLoadingSpiner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
  // Show loading
  showLoadingSpiner();
  // Pick a random quote from localQuotes array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // Check if Author filed is blan and replace it with "Unknown"
  checkAuthor(quote.author);
  // Check the quote length to determine styling
  checkQuoteLength(quote.text);
  // Set Quote
  quoteText.innerText = quote.text;
  // Hide loader
  removeLoadingSpinner();
}

// Get Quotes from API
async function getQuote() {
  showLoadingSpiner();
  const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiURL);
    const data = await response.json();
    // Check if Author filed is blan and replace it with "Unknown"
    checkAuthor(data.quoteAuthor);
    // Check the quote length to determine styling
    checkQuoteLength(data.quoteText);
    // Set Quote
    quoteText.innerText = data.quoteText;
    // Hide Loader
    removeLoadingSpinner();
  } catch (error) {
    // Catch Error Here
    if (errHappened > MAX_ERR_QUANT) {
      // Error message to the user.
      quoteText.innerText =
        "Sorry, something went wrong. Please try later. This quote is special for you - 'Winners never quit, and quitters never win.'";
      authorText.innerText = "Vince Lombardi";
      return;
    } else {
      // Count errors.
      errHappened++;
      // Try to get quote.
      getQuote();
    }
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterURL, "_blank");
}

// Event Listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuote);

// On Load
getQuote();
// newQuote();
