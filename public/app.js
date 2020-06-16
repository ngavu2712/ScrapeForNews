
//Scrape for Articles
// $("#scrape").on("click", function(){
//     event.preventDefault()
//     alert("Article is saved!")

//     $.ajax({
//         url: "/savedarticle/",
//         method: "POST",
//         //data: Article
//     }).then(function(data){
//         console.log(data)
//     })

// })
$(".comment").on("click", function(){
    const id = $(this).attr("data-id")
    $("#articleId").html(id)

})

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

//get all comments and once the data comes from server
// via .then call function , jquery to generate unordered list above the textbox
//
// Save Article
$(".save").on("click", function(){
    var thisId= $(this).attr("data-id")
    
    $.ajax({
        method: "PUT",
        url: "/api/articles/" + thisId
    }).then(function(data){
        console.log(data)
        location.reload()
    })
})

// Delete Article

//
