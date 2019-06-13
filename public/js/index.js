// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

//Array of objects that each represent a planet and their relative size
var planets = [
  { name: "Mercury", height: 20, width: 20 },
  { name: "Venus", height: 22, width: 22 },
  { name: "Earth", height: 30, width: 30 },
  { name: "Mars", height: 25, width: 25 },
  { name: "Jupiter", height: 100, width: 100 },
  { name: "Saturn", height: 90, width: 90 },
  { name: "Uranus", height: 80, width: 80 },
  { name: "Neptune", height: 80, width: 80 },
  { name: "Pluto", height: 15, width: 15 }
];

//On load, hide the planets and the sun
$(window).on("load", function() {
  $("#planet-div").hide();
  $("#sun").hide();
});

//Function that hides the header and buttons on front page, shows the sun and planets 
function renderPlanets() {
  $("#header").hide();
  $("#front-page").hide();
  $("#planet-div").show();
  $("#sun").show();

  for (var i = 0; i < planets.length; i++) {
    var planet = $("<div>");

    planet.addClass("planet");

    planet.attr("id", planets[i].name);

    $("#planets").append(planet);
  }

  //Once you click a planet or the sun, console log the response from the API URL and hide the planets and the sun
  $(".planet").on("click", function() {
    var queryURL =
      "https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=image";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

    console.log($(this).attr("id"));
    $("#sun").hide();
    $("#planets").hide();
    //$("#fact-panel").show();

    $("#fact-panel").html(
      "<h1>" + $(this).attr("id") + "</h1>\n<h2>It's a planet!</h2>"
    );
  });
}

//When a user clicks take a trip, call the renderPlants function
$("#planet-btn").on("click", function() {
  renderPlanets();
});

//Create a variable to easily be able to loop through all of the planets 
let planetImages = $(".planet")

//Pausing planets attempt 1 
$("ul").filter(function() {
  
})

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
