var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

//========================================================================================================================
function apiRoute(app) {

  //get results of scrape operation
  app.get("/scrape", function (req, res) {
    // First, tell the console what server.js is doing
    console.log(
      "\n***********************************\n" +
        "Grabbing every thread name and link\n" +
        "from Vietcetera's board:" +
        "\n***********************************\n"
    );
    //===============================================================================================================
    //Scarping Tools

    // Making a request via axios for Vietcetera's "webdev" board.
    axios.get("https://vietcetera.com/en").then(function (response) {

      // Load the Response into cheerio and save it to a variable
      var $ = cheerio.load(response.data);
      var results =[];

      $(".home-news").each(function (i, element) {

        // Save the text of the element in variables
        var headline = $(this).children("div").children("div.ant-row").children("div.ant-col").children("div.horizontal-card-content").children("a").children("div.horizontal-card-title").text();
        var summary = $(this).children("div").children("div.ant-row").children("div.ant-col-xs-15").children("div.horizontal-card-content").children("div.horizontal-card-description").text();
        var link = $(this).children("div").children("div.ant-row").children("div.horizontal-card-title-mobile").children("a").attr("href");
        //var img = $(this).children("div").children("div.ant-row").children("div.ant-col ant-col-xs-9 ant-col-md-8").children("div.horizontal-card-image").children("img").attr("src");
        var img = $(this).children("div").children("div.ant-row").children("div.ant-col ant-col-xs-9 ant-col-md-8").children("div.horizontal-card-image").find("img").attr("data-src");
        // Push the results to the empty array
        results.push({
            Headline : headline,
            Summary : summary,
            URL : link,
            Img : img
        })
      });

      //console.log(results)
      //db.Article.create(results).then(function(data){
          res.json(results)
      //})
      //console.log(link);
    });
  });
}

//Get all saved articles
app.get("/api/articles", function(){

})

//Save a scraped article
app.post("/api/articles", function (){

})

//Get a saved article and its comments
app.get("/api/articles/:id", function(){

})

//deletes article and its comments
app.delete("/api/articles/:id"), function(){

}

//creates a new comment for an article
app.post("/api/articles/:article_id/comments", function(){

})

//deletes comment associated with an article
app.delete("/api/articles/:article_id/comments/:id", function(){
  
})


module.exports = apiRoute;
