 const quoteContainer = document.getElementById('quote-container');
 const quoteText = document.getElementById('quote');
 const authorText = document.getElementById('author');
 const twitterBtn = document.getElementById('twitter');
 const newQuoteBtn = document.getElementById('new-quote');

 function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}
let apiQuotes = [];
//show new quote
function newQuote(){
const quote_choice = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
//check if author field is blank and replace it with 'unknown'
if(!quote_choice.author){
    authorText.textContent = 'Unknown';
} else {
    authorText.textContent = quote_choice.author;//
}
//check quote lenth to determine styling
if(quote_choice.text.length > 120){
    quoteText.classList.add('long-quote');
}
else{
    quoteText.classList.remove('long-quote');
}
quoteText.textContent = quote_choice.text;
}
async function getQuotes() {
   // const proxyUrl = 'https://sheltered-taiga-06476.herokuapp.com/'
    const apiUrl  = 'https://type.fit/api/quotes';
    try {
        const response = await fetch( apiUrl );
        apiQuotes = await response.json();
        newQuote();
    }
    catch {
        getQuotes();
        console.log('whoops','no quote',error);
    }
}

function tweetQuote() {
   // const twitterUrl = `https://twitter.com/intent/tweet?text=${quotetext.textContent} -${authorText.textContent}`
   const url = "https://twitter.com/intent/tweet?text=" + quoteText.textContent  + "-" + authorText.textContent;
   PopupCenter(url,"Share to Twitter","590","253");
}

//Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);


// on load
getQuotes();