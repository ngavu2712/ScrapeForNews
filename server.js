//Import the  routing packages
var express = require ('express');
var expressHandlebars = require ('express-handlebars');

//Database Model package
var mongoose = require ('mongoose');

//===============================================================================================================
//Scarping Tools
  
//===============================================================================================================
//Require all models
//var db = require ('./models');

//Routes

//===============================================================================================================

// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

//Initialize Express
var app = express();

//Set up handlebar engine
app.engine("handlebars", expressHandlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require ("./routes/api-routes")(app);
//require ("./routes/html-routes")(app);
//Set public folder public
app.use(express.static("public"));

//Connect to MongoDB
 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/news");

//===============================================================================================================
//Start the server
app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT)
})
