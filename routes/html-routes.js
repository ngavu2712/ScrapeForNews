var db = require("../models");


module.exports = function (app) {

    app.get ("/", function (req, res) {
        db.Article.find({}).
        then(dbArticle => {

            var articles = {
                scraped : dbArticle
            };
            console.log(dbArticle)

            res.render('index', articles)
        })
       
    });

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

