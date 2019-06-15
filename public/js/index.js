// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
//fixed

//Array of objects that each represent a planet and their relative size
var planets = [
  { name: "Mercury", height: 20, width: 20, imageLink: "https://cdn.mos.cms.futurecdn.net/MTEiJvP99DScN3vkAsE9LA-320-80.jpg"},
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
$(window).on("load", function () {
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

  $(".planet").on("click", function () {
    let search = this.id;
    console.log("Planet/Sun: " + search);

    let queryURL = `https://api.le-systeme-solaire.net/rest/bodies/${search}`
    // "https://images-api.nasa.gov/search?q=mars&media_type=image";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // g/cm³ is gram per cubic centimeter, a unit of measurement for density
      if (search != "sun"){
      let density = response.density;
      $(".planetInfo").append("Planet density: "+density+" g/cm³<br>");
      };
      
      // m/s² is metre per second squared, a unit of measurement for gravity
      if (search != "sun"){
      let gravity = response.gravity;
      $(".planetInfo").append("Gravity: "+gravity+" m/s²<br>");
      };

      
      let massEx = response.mass.massExponent;
      $(".planetInfo").append("Mass exponent: "+massEx+"<br>");

     
      let massVal = response.mass.massValue;
      $(".planetInfo").append("Mass value: "+massVal+"<br>");

      if (search != "sun"){
        
        let moons = (response.moons).length;
        $(".planetInfo").append("Moons: "+moons+"<br>");
      };
      
      
    });

    //wikipedia API
        var url2 = `http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${search}&format=json&callback=?`
        //`http://en.wikipedia.org/w/api.php?action=query&titles=sun&prop=images&&format=json&callback=?`
        //`https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&format=json&callback=?`; 
		    $.ajax({
			url: url2,
			type: 'GET',
      contentType: "application/json; charset=utf-8",
      //prop:'images',
			async: false,
        	dataType: "json",
        	success: function(data, status, jqXHR) {
            
            
            

        	}
        })
    
    //console.log the name of whatever planet you clicked on, or the sun
    console.log($(this).attr("id"));

    //hide planets after you click on a planet, and only show the modal
    // $("#sun").hide();
    // $("#planets").hide();
    
    $(".planetHeader").html($(this).attr("id"));
    //Add text to the modal as well as a picture
    $(".planetInfo").html("Planet name: "+$(this).attr("id")+"<br>")

    //switch statement 
        switch ($(this).attr("id")){
          case "Jupiter":
            source = "https://wwwcache.wral.com/asset/weather/2019/06/10/18443440/jupiter-DMID1-5j3gkbsm3-593x593.jpg";
          break;
          case "Mercury":
            source = "https://lh3.googleusercontent.com/kWUcoBpFqezXmWxYEWEXafacRP8D9y4d1jFEiKzWbJFim7dxWK11Knkedz8LdlxJa9YZOx6ihz4N2J3X260b_roxRXgd0Q=s750";
          break;
          case "Venus":
            source = "https://i0.wp.com/sphereandsundry.com/wp-content/uploads/2018/08/24771639777_c053614594_b.jpg?resize=450%2C448&ssl=1";
          break;
          case "Earth":
            source = "https://amp.businessinsider.com/images/5afd808f1ae66234008b466b-750-563.jpg";
          break;
          case "Mars":
            source = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/illustration-of-mars-royalty-free-illustration-1124672049-1560262042.jpg?crop=0.563xw:1.00xh;0.220xw,0&resize=640:*";
          break;
          case "Saturn":
            source = "https://nationalpostcom.files.wordpress.com/2019/01/NY457-AP.jpg?quality=80&strip=all&w=780";
          break;
          case "Uranus": 
            source = "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg";
          break;
          case "Neptune":
            source = "https://www.nasa.gov/sites/default/files/thumbnails/image/neptune_voyager1.jpg";
          break;
          case "Pluto":
            source = "https://spaceplace.nasa.gov/review/ice-dwarf/pluto_new_horizons.en.png";
          break;
          default:
            source = "https://cdn.images.express.co.uk/img/dynamic/151/590x/worldwide-617284.jpg";
        }

    // console.log("density: " + density);
    $(".planetPicture").html(`<img src=${source} alt=${search} height="200" width="250"></img>`)

    // $("#fact-panel").html(
    //   "<h1>" + $(this).attr("id") + "</h1>\n<h2>It's a planet!</h2>"
    // );
    let planetFacts = $("#planetFacts")[0];

    planetFacts.style.display = "block";

    let span = $(".close")[0];

    span.onclick = function() {
        planetFacts.style.display = "none";
        $("#sun").show();
        $("#planets").show();
      }
  });

  $("#pause").on("click", function(){
    console.log("hi");

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
$("#planet-btn").on("click", function () {
  renderPlanets();
});

$("#submitform").on("click", function () {
  console.log("submitted")

});

$("#username").on("click", function () {
  console.log("user name submitted")

});

$("#return-trip").on("click", function () {
  console.log("return-trip selectect yes or no")

});




// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
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
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
