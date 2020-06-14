
//Scrape for Articles
$("#scrape").on("click", function(){
    event.preventDefault()
    alert("Article is saved!")

    $.ajax({
        url: "/savedarticle/",
        method: "POST",
        //data: Article
    }).then(function(data){
        console.log(data)
    })

})

// Save Article
$("#save").on("click", function(){
    var thisId= $(this).attr("data-id")
    
    $.ajax({
        method: "POST",
        url: "/articles/save" + thisId
    }).then(function(data){
        console.log(data)
    })
})

// Delete Article

//
