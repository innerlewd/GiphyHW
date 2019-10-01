var games = ["League of Legends", "Dota 2", "Rocket League", "RuneScape", "Ashes of Creation"]

function displayInfo() {
    var game = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=awVaL4LDqLTHJGo5xGMAKx9acSOFrEd4&tag=" + game;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        var gameDiv = $("<div class = 'game'>");
        var user = response.data.username;
        var p1 = $("<p>").text("By: " + user);
        gameDiv.append(p1);
        var title = response.data.title;
        var p2 = $("<p>").text("Title: " + title);
        gameDiv.append(p2);
        var gifURL = response.data.image_original_url;
        var gif = $("<img>").attr("src", gifURL);
        gameDiv.append(gif);
        $("#gifDump").prepend(gameDiv);
    })
}

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
$(document).on("click", ".game-btn", displayInfo);
renderButtons();
