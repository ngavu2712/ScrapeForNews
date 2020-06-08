var axios = require ('axios');
var cheerio = require ('cheerio');
var db = require ("../models")
function apiRoute (app){
    app.get("/scrape", function(req,res){
// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from Vietcetera's board:" +
            "\n***********************************\n");

// Making a request via axios for Vietcetera's "webdev" board.
axios.get("https://vietcetera.com/en").then(function(response){
    // Load the Response into cheerio and save it to a variable
    var $ = cheerio.load(response.data);
    // With cheerio, find each home-page with the "title" class
    // (i: iterator. element: the current element)
  $(".home-page").each(function(i, element) {
    
    // Save the text of the element in a "title" variable
    var link = $(element).find('a').attr('href');
    })
    console.log(link);
})
      
    })
}