// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

//Array of objects that each represent a planet and their relative size
//, imageLink: "https://cdn.mos.cms.futurecdn.net/MTEiJvP99DScN3vkAsE9LA-320-80.jpg"
var planets = [
  { name: "Mercury", height: 20, width: 20, imageLink: "https://cdn.mos.cms.futurecdn.net/MTEiJvP99DScN3vkAsE9LA-320-80.jpg" },
  { name: "Venus", height: 22, width: 22, imageLink: "https://www.sciencenews.org/sites/default/files/2018/02/main/articles/020618_LG_venus-fobette_feat.jpg" },
  { name: "Earth", height: 30, width: 30, imageLink: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg" },
  { name: "Mars", height: 25, width: 25, imageLink: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg" },
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
    let search = this.id;
    console.log("Planet/Sun: "+search);
    let queryURL = `https://api.le-systeme-solaire.net/rest/bodies/${search}`
    // "https://images-api.nasa.gov/search?q=mars&media_type=image";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

    let queryURL2 = `https://en.wikipedia.org/w/api.php?action=query&list=value&${search}`

    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

    

    console.log($(this).attr("id"));
    $("#sun").hide();
    $("#planets").hide();
    // $("#fact-panel").show();

    $(".planetInfo").text("Planet name: "+$(this).attr("id"))

    // $("#fact-panel").html(
    //   "<h1>" + $(this).attr("id") + "</h1>\n<h2>It's a planet!</h2>"
    // );
    let planetFacts = $("#planetFacts")[0];
    let planet = $("#planet")[0];

    planetFacts.style.display = "block";

    let span = $(".close")[0];
    span.onclick = function() {
        planetFacts.style.display = "none";
        $("#sun").show();
        $("#planets").show();
      }

    // window.onclick = function(event) {
    //   if (event.target !== planetFacts && event.target !== planet) {
    //     planetFacts.style.display = "none";
    //   }
    // }
  });

  $("#pause").on("click", function(){
   // console.log("hi");

    if ($(".planet").attr("style") !== "animation-play-state: paused;") {
      $(".planet").attr("style", "animation-play-state: paused;");
      $("#pause").text(">");
    } else {
      $(".planet").attr("style", "animation-play-state: running;");
      $("#pause").text("||");
    }
  });
}

//When a user clicks take a trip, call the renderPlants function
$("#planet-btn").on("click", function() {
  renderPlanets();
});





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
