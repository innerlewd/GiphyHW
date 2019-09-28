var games = ["League of Legends", "Dota 2", "Rocket League", "RuneScape", "Ashes of Creation"]

$("#searchButton").on("click", function(){
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=awVaL4LDqLTHJGo5xGMAKx9acSOFrEd4";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        var imageURL = response.data.image_original_url;
        var image = $("<img>");
        image.attr("src", imageURL);
        image.attr("alt", "image");
        $("#images").prepend(image);
    })
})