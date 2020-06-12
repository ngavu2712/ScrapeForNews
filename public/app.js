
$("#scrape").on("click", function(){
    event.preventDefault()
    alert("Added 5 New Articles")

    $.ajax({
        url: "/scrape",
        method: "GET",
        //data: Article
    }).then(function(data){
        console.log(data)
    })

})