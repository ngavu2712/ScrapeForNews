var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");
function apiRoute(app) {
  app.get("/scrape", function (req, res) {
    // First, tell the console what server.js is doing
    console.log(
      "\n***********************************\n" +
        "Grabbing every thread name and link\n" +
        "from Vietcetera's board:" +
        "\n***********************************\n"
    );

    // Making a request via axios for Vietcetera's "webdev" board.
    axios.get("https://vietcetera.com/en").then(function (response) {
      // Load the Response into cheerio and save it to a variable
      var $ = cheerio.load(response.data);
      var results =[];
      // With cheerio, find each home-page with the "title" class
      // (i: iterator. element: the current element)
      $(".home-news").each(function (i, element) {
        // Save the text of the element in a "title" variable
        var headline = $(this).children("div").children("div.ant-row").children("div.ant-col").children("div.horizontal-card-content").children("a").children("div.horizontal-card-title").text();
        var summary = $(this).children("div").children("div.ant-row").children("div.ant-col").children("div.horizontal-card-content").children("a").children("div.horizontal-card-description").text();
        var link = $(this).children("div").children("div.ant-row").children("div.horizontal-card-title-mobile").children("a").attr("href");
        var img = $(this).children("div").children("div.ant-row").children("div.ant-col-xs-9").children("div.horizontal-card-image").children("img").attr("src");
        console.log(headline, summary, link,img)
        results.push({
            Headline : headline,
            Summary : summary,
            URL : link,
            Img : img
        })
      });
      console.log(results)
      //db.Article.create(results).then(function(data){
          res.send("scraping is completed")
      //})
      //console.log(link);
    });
  });
}

module.exports = apiRoute;
