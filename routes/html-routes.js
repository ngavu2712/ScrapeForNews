var db = require("../models");


module.exports = function (app) {

    app.get ("/", function (req, res) {
        db.Article.find({saved : false})
        .lean()
        .then(dbArticles => {

            console.log(dbArticles)

            res.render('index', {callingArticles: dbArticles})
        })
       
    });

    // Route for getting all Articles from the db
    app.get("/articles", (req,res)=>{
        // Grab every document in the Articles collection
        db.Article.find({})
        
        .then( dbArticles =>{

            // Remove __v data created by Cheerio, so Handlebars can render the data
            const callingdbArticles = dbArticles.map(article => {
                return {
                    _id: article._id,
                    Headline : article.Headline,
                    Summary: article.Summary,
                    URL: article.URL
                }
            })
            //console.log(dbArticles)
            // If we were able to successfully find Articles, send them back to the client
            res.render("news", {articles: callingdbArticles} )
            
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
    })

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", (req,res) =>{
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({_id: req.params.id})
        //populate all of the notes associated with it
        .populate("Note")
        .then( dbArticle => {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
    })

    //Route to save an article
    app.get("/saved", (req,res) =>{
        console.log("save")
        db.Article.find({saved: true})
        .populate("Note")
        .then(dbSavedArticles =>{
            console.log(dbSavedArticles)
            const newSavedArticle = dbSavedArticles.map(article => {
                return {
                    _id: article._id,
                    Headline : article.Headline,
                    Summary: article.Summary,
                    URL: article.URL
                }
            })
            res.render("savedarticle", {articles : newSavedArticle})
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
    })


    //Route to save an article
    app.get("/articles/save/:id", (req,res) => {
        //Use the article id to find and update its saved boolean
        db.Article.findOneAndUpdate({"_id": req.params.id}, {"saved": true})
        .then(dbArticle =>{
            res.json(dbArticle)
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
    })

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", (req,res) => {
        db.Note.create(req.body)
        .then( dbNote => {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(dbArticle => {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
          })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
            });
    })


    //Route to delete an article
    app.delete("/delete/:id", (req,res) =>{

        db.Article.deleteOne({_id: req.params.id})

    .then(deleteArticle =>{
        res.rendet("savedarticle", {articles: deleteArticle})
    })
    .catch(function (err) {
        res.json(err);
    });
})

    
    // app.get("/scrape", function(req, res) {
    //     db.find({}, function(err, data){
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             res.json(data)
    //             //res.render('index', {Article : data})
    //         }
    //     })
    // })

    // app.get("/", function(req, res, next){
    //     db.find({}, function(err, data){
    //         if(err) {
    //             console.log(err)
    //         } else {
    //             res.render('index', {Article: data})
    //             console.log(data)
    //         }
    //     })
    // })


}

