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

    // A GET route for scraping Vietcetera via axios.
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
        //var img = $(this).children("div").children("div.ant-row").children("div.ant-col ant-col-xs-9 ant-col-md-8").children("div.horizontal-card-image").find("img");
        // Push the results to the empty array
        results.push({
            Headline : headline,
            Summary : summary,
            URL : link,
            //Img : img
        })

        console.log(results)
        // Create a new Article using the `result` object built from scraping
        db.Article.create(results)
          .then(function(dbArticle){
          console.log(dbArticle)
          })
          .catch(err => {
            console.log(err);
          })
      });

      // Send a message to the client
        res.send("Scrape Complete");
    })
  });

//   //Get all saved articles
// app.get("/api/articles", function(req, res){

//   // Grab every document in the Articles collection
//   db.Article.find({}).sort({dataScraped: -1}).then(dbArticles => {
//      // If we were able to successfully find Articles, send them back to the client
//     res.json(dbArticles);
//   })
//   .catch(err => {
//     // If an error occurred, send it to the client
//     res.json(err)
//   });
// });

// //Save a scraped article
// app.get("/api/articles", function (){
//   db.findOne({_id: req.params.id})
//   .populate('Comments')
//   .then(article => {
//     res.json(article)
//   })
//   .catch(err =>{
//     res.json(err)
//   })
// })

 //Get a saved article and its comments
app.put("/api/articles/:id", function(req,res){

const id = req.params.id;

  db.Article.update({_id: id}, {saved: true}).then(data => {
    res.json(data)
  })
  .catch(err =>{
    res.json(err)
  })
})

//deletes an article and its comments
app.delete("/api/delete/:id", function(req,res){

    db.Article.deleteOne({_id: req.params.id})
    .then(article => {
      res.json(article)
     })
   .catch(err =>{
     res.json(err)
   })

 })

// //creates a new comment for an article
// app.post("/api/articles/:article_id/comments", function(){

// })

// //deletes comment associated with an article
// app.delete("/api/articles/:article_id/comments/:id", function(){

// })

}



module.exports = apiRoute;
