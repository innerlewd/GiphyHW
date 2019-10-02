var games = ["League of Legends", "Dota 2", "Rocket League", "RuneScape", "Ashes of Creation"]

$("button").on("click", function() {
    var game = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    game + "&api_key=awVaL4LDqLTHJGo5xGMAKx9acSOFrEd4&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        // var gameDiv = $("<div class = 'game'>");
        // var user = response.data.username;
        // var p1 = $("<p>").text("By: " + user);
        // gameDiv.append(p1);
        // var title = response.data.title;
        // var p2 = $("<p>").text("Title: " + title);
        // gameDiv.append(p2);
        // var gifURL = response.data.image_original_url;
        // var gif = $("<img>").attr("src", gifURL);
        // gif.attr("class", "gif");
        // gif.attr("data-state", "animate")
        // gameDiv.append(gif);
        // $("#gifDump").prepend(gameDiv);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r") {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(image);
                $("$gifDump").prepend(gifDiv);
            }
        }
    })
})
$(".gif").on("click", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

function renderButtons() {
    $("#buttonDump").empty();
    for (var i = 0; i < games.length; i++) {
        var a = $("<button>");
        a.addClass("game-btn");
        a.attr("data-name", games[i]);
        a.text(games[i]);
        $("#buttonDump").append(a);
    }
}

$("#searchButton").on("click", function(){
    event.preventDefault();
    var game = $("#game-input").val().trim();
    games.push(game);
    renderButtons();
});
// $(document).on("click", ".game-btn", displayInfo);
renderButtons();
