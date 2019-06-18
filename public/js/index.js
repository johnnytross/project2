//Array of objects that each represent a planet and their relative size
var planets = [
  // distance in millions of miles, time in days
  { name: "Mercury", distance: 48, time: 2372},
  { name: "Venus", distance: 162, time: 153 },
  { name: "Earth", distance: 0, time: 0 },
  { name: "Mars", distance: 33.9, time: 300 },
  { name: "Jupiter", distance: 600, time: 730 },
  { name: "Saturn", distance: 746, time: 2190 },
  { name: "Uranus", distance: 1600, time: 3468 },
  { name: "Neptune", distance: 2900, time: 4380 },
  { name: "Pluto", distance: 4670, time: 4745 }
];

//On load, hide the planets and the sun
$(window).on("load", function () {
  $("#planet-div").hide();
  $("#sun").hide();
  $(".planetCard").hide();

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

    //Show the planets card once a planet is clicked on
    $(".planetCard").show();

    // This URL is for the Solar System OpenData API
    let queryURL = `https://api.le-systeme-solaire.net/rest/bodies/${search}`
    
    // Ajax call for the Solar System OpenData API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      // g/cm³ is gram per cubic centimeter, a unit of measurement for density. If the search term is not the sun, check density from API
      if (search != "sun") {
        let density = response.density;
        $(".planetInfo").append("Planet density: " + density + " g/cm³<br>");
      };

      // m/s² is metre per second squared, a unit of measurement for gravity. if the search term is not the sun, check gravity from API
      if (search != "sun") {
        let gravity = response.gravity;
        $(".planetInfo").append("Gravity: " + gravity + " m/s²<br>");
      };

      // Check API for mass exponent 
      let massEx = response.mass.massExponent;
      $(".planetInfo").append("Mass exponent: " + massEx + "<br>");

      //Check API for mass value
      let massVal = response.mass.massValue;
      $(".planetInfo").append("Mass value: " + massVal + "<br>");

      //If search term is not the sun, search API for moons
      if (search != "sun") {
        let moons = (response.moons).length;
        $(".planetInfo").append("Moons: " + moons + "<br>");
      };


    });

    //wikipedia API
    var url2 = `http://en.wikipedia.org/w/api.php?format=json&action=query&callback=?&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow`
    //`http://en.wikipedia.org/w/api.php?action=query&titles=sun&format=json&callback=?`
    // `http://en.wikipedia.org/w/api.php?action=query&search=${search}&format=json&callback=?`
    //`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${search}&format=json&callback=?`; 
    
    
    
    $.ajax({
      url: url2,
      type: 'GET',
      async: false,
      dataType: "json",
      success: function (data, status, jqXHR) {

        console.log(this);


      }
    })

    //console.log the name of whatever planet you clicked on, or the sun
    console.log($(this).attr("id"));



    //Add the planets name to the materialize header
    $(".planetHeader").html($(this).attr("id"));
    //Add text to the materialize card as well as a picture
    $(".planetInfo").html("Planet name: " + $(this).attr("id") + "<br>")

    //switch statement 
    switch ($(this).attr("id")) {
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

  
    $(".planetPicture").html(`<img src=${source} alt=${search} height="200" max-width: 100%></img>`)

    
    // let planetFacts = $("#planetFacts")[0];

    // planetFacts.style.display = "block";

    let span = $(".close")[0];

    span.onclick = function () {
      $(".planetCard").hide();
    }
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
$("#planet-btn").on("click", function () {
  renderPlanets();
});

// var a = $("select[name='duration'] option:selected").text();
// var b = $("select[name='duration'] option:selected").val();

$("#submitform").on("click", function () {
  const username = $("#username").val()
  const choose_planet = $("select[name='chooseplanet'] option:selected").val()
  const choose_spacecraft = $("select[name='choosespacecraft'] option:selected").val()
  let checkbox = false
  if ($('#returnTrip').is(":checked")) {
    checkbox = true
  } else {
    checkbox = false
  }
  const myObject = {
    astronaut: username,
    space_craft: choose_spacecraft,
    planet: choose_planet,
    return_trip: checkbox,
  }

  $.ajax({
    url: '/api/voyager',
    type: 'POST',
    data: myObject
  }).then(function (res) {
    console.log('post route')
    // console.log(res)
    window.location.href = '/allvoyages'
  })
  // $('#returnTrip:checked').val();
  console.log(checkbox)
  console.log(username)
  console.log(choose_planet)
  console.log(choose_spacecraft)

});










 

