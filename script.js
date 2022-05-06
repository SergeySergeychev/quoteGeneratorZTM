import { localQuotes } from "./quotes.js";
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
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

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
  // Show loading
  loading();
  // Pick a random quote from localQuotes array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // Check if Author filed is blan and replace it with "Unknown"
  checkAuthor(quote.author);
  // Check the quote length to determine styling
  checkQuoteLength(quote.text);
  // Set Quote
  quoteText.innerText = quote.text;
  // Hide loader
  complete();
}

// Get Quotes from API
async function getQuote() {
  loading();
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
    complete();
  } catch (error) {
    // Catch Error Here
    getQuote();
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
