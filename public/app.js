
//Get Note
//get all comments and once the data comes from server
// via .then call function , use jquery to generate unordered list above the textbox
$(".comment").on("click", function(){

     // Empty the notes from the note section
     $("#notes").empty();

     // Save the id from the title
     const id = $(this).attr("data-id")
     //Assign that id to modal title
     $("#articleId").html(id)
   
    $.ajax({
        url: "/articles/" + id,
        method: "GET"
    })
    .then( commentDb =>{

        console.log(commentDb)

        if(commentDb.Note) {
            $("#notes").val(commentDb.Note.Comments)
        }
    })
})

// Save Note
$(".savedNote").on("click", () => {

    // Grab the id associated with the article from the comment button
     const thisId = $(this).attr("data-id")
    
     // Run a POST request to change the note, using what's entered in the inputs
     $.ajax ({
        url: "/articles/" + thisId,
        method: "POST",
        data : {
            body : $("#notes").val()
        }
    })
    .then(savedNote =>{
        console.log(savedNote);
      
        // Empty the notes section
      $("#notes").empty();
    })
    // Also, remove the values entered in the textarea
    $("#notes").val("")

})

//Add comment
$(".savedChanges").on("click", function(){

    const newComments = {
        Comments : $("#addComment").val() 
    }
    const titleId = $("#articleId").text()
    $.ajax (
        url: "/api/comment",
        method: "POST",
        data: newComments
    }).then(function(data){
        console.log(data)
    })
})


// Save Article
$(".save").on("click", function(){
    var thisId= $(this).attr("data-id")
    
    $.ajax({
        method: "PUT",
        url: "/api/articles/" + thisId
    }).then(function(data){ //wait till data come back from the server
        console.log(data) 
        location.reload()
    })
})

// Delete Article
$(".delete").on("click", function(){

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "DELETE",
        url: "/api/delete/" + thisId
    }).then( data =>{
        console.log(data)
        location.reload()
    })
})


