var mongoose = require('mongoose');

var Schema = mongoose.Schema; 

var articleSchema = new Schema ({
    Headline : {type: String, required: true},
    Summary : {type: String, required : true},
    URL : {type: String, required:true},
    //Img : {type: String, required:true},

    // One to Many relationship. One article can have many notes
    Note : [{
        type: Schema.Types.ObjectId, //foreign key
        ref : "Note"
    }]
})

var Article = mongoose.model("Article", articleSchema); //Assign name and structure to the Article collection

module.exports = Article;