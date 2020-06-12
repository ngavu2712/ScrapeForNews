var db = require("../models");

module.exports = function (app) {

    app.get ("/", function (req, res) {
        res.render('index', function (err, html) {
            res.send(html)
          })
    });

    app.get("/scrape", function(req, res) {
        db.find({}, function(err, data){
            if (err) {
                console.log(err)
            } else {
                res.json(data)
                //res.render('index', {Article : data})
            }
        })
    })

    app.get("/news", function(req, res){
        db.find({}, function(err, data){
            if(err) {
                console.log(err)
            } else {
                res.render('news', {Article: data})
            }
        })
    })


}

