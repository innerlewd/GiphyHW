var games = ["League of Legends", "Dota 2", "Rocket League", "RuneScape", "Ashes of Creation"];

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
renderButtons();

$(".game-btn").on("click", function() {
    $("#gifDump").empty();
    // In this case, the "this" keyword refers to the button that was clicked
    var game = $(this).attr("data-name");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      game + "&api_key=awVaL4LDqLTHJGo5xGMAKx9acSOFrEd4&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var image = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            image.attr("src", results[i].images.fixed_height_still.url);
            image.attr("data-animate", results[i].images.fixed_height.url);
            image.attr("data-still", results[i].images.fixed_height_still.url);
            image.attr("data-state", "still");
            image.attr("class", "gif");

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(image);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifDump").prepend(gifDiv);
          }
        }
      });
  });
  $("#gifDump").on("click", ".gif", function(event) {
      event.preventDefault();
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
});