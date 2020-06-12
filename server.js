//Import the  routing packages
var express = require ('express');


//Database Model package
var mongoose = require ('mongoose');

//Initialize Express
var app = express();
  

// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set up handlebar engine
var expressHandlebars = require ("express-handlebars");
app.engine("handlebars", expressHandlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");



// Import api-routes.js 
require ("./routes/api-routes")(app);
require ("./routes/html-routes")(app);
//Set public folder public
app.use(express.static("public"));

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/news");

//===============================================================================================================
//Start the server
app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT)
})
