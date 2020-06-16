
//get all comments and once the data comes from server
// via .then call function , jquery to generate unordered list above the textbox
$(".comment").on("click", function(){
    const id = $(this).attr("data-id")
    $("#articleId").html(id)

})

//Add commentm
$(".savedChanges").on("click", function(){

    const newComments = {
        Comments : $("#addComment").val() 
    }
    const titleId = $("#articleId").text()
    $.ajax ({
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

//
