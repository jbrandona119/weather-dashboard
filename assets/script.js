// Time of Day Greeting
var time = new Date().getHours();
var greetings;
var morning = "Good Morning";
var afternoon = "Good Afternoon";
var evening = "Good Evening";

if (time >= 0 && time < 12) {
  greetings = morning;
} else if (time >= 12 && time < 17) {
  greetings = afternoon;
} else if (time >= 17 && time < 24) {
  greetings = evening;
}

$(".greeting").append(greetings);
//setting initial variables for weather searches
var currentCity = "Richmond";
var searchHistory = [];
var storedCities = JSON.parse(sessionStorage.getItem("userSearches"));

$(document).ready(function() {
  // adding past searches to html
  function displayCities() {
    $("#pastCities").empty();
    if (storedCities !== null) {
      searchHistory = storedCities;
      for (var i = 0; i < searchHistory.length; i++) {
        $("#pastCities").append("<li>" + searchHistory[i] + "</li>");
      }
      currentCity = searchHistory[searchHistory.length - 1];
    }
  }
  displayCities();

  // API vars
  const api = "ad1063820d1245bf4ab61668dcd51edd";
  const queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    currentCity +
    "&units=imperial&appid=ad1063820d1245bf4ab61668dcd51edd";
  const queryURLCurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    currentCity +
    "&units=imperial&appid=ad1063820d1245bf4ab61668dcd51edd";

  //call grabbing current weather & assigning variables to UV requirements for that call
  $.ajax({
    url: queryURLCurrent,
    method: "GET"
  }).then(function(response) {
    // more variables required for the UV index & URL
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    const uvQueryURL =
      "https://api.openweathermap.org/data/2.5/uvi?appid=ad1063820d1245bf4ab61668dcd51edd=&lat" +
      lat +
      "&lon=" +
      lon;
    $("#currentCityJumbo").text(
      response.name +
        ", " +
        response.sys.country +
        " (" +
        moment().format("dddd MMMM Do") +
        ")"
    );
    $("#currentWind").text("Wind Speed: " + response.wind.speed + " MPH");
    $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
    $("#currentTemp").text("Temperature: " + response.main.temp + " ˚F");
    $("#currentIcon").attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png"
    );

    //call for UV index & color code the Index
    $.ajax({
      url: uvQueryURL,
      method: "GET"
    }).then(function(response) {
      $("#currentUV").text(response.value);
      if (response.value < 3) {
        $("#currentUV")
          .add("h5")
          .css("background-color", "green");
      } else if (response.value >= 3 && response.value < 6) {
        $("#currentUV")
          .add("h5")
          .css("background-color", "orange");
      } else {
        $("#currentUV")
          .add("h5")
          .css("background-color", "red");
      }
    });
  });

  //call for 5 day forecast
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // day 1 of five day
    for (var i = 0; i < response.list.length; i++) {
      if (
        response.list[i].dt_txt ===
        moment()
          .add(1, "day")
          .format("YYYY-MM-DD") +
          " 21:00:00"
      ) {
        $("#day1Temp").text("Temp: " + response.list[i].main.temp + " ˚F");
        $("#day1Hum").text("Humidity: " + response.list[i].main.humidity + "%");
        $("#day1Icon").attr(
          "src",
          "https://openweathermap.org/img/wn/" +
            response.list[i].weather[0].icon +
            "@2x.png"
        );
      }
    }
    // day 2 of five day
    for (var j = 0; j < response.list.length; j++) {
      if (
        response.list[j].dt_txt ===
        moment()
          .add(2, "day")
          .format("YYYY-MM-DD") +
          " 21:00:00"
      ) {
        $("#day2Temp").text("Temp: " + response.list[j].main.temp + " ˚F");
        $("#day2Hum").text("Humidity: " + response.list[j].main.humidity + "%");
        $("#day2Icon").attr(
          "src",
          "https://openweathermap.org/img/wn/" +
            response.list[j].weather[0].icon +
            "@2x.png"
        );
      }
    }
    // day 3 of five day
    for (var k = 0; k < response.list.length; k++) {
      if (
        response.list[k].dt_txt ===
        moment()
          .add(3, "day")
          .format("YYYY-MM-DD") +
          " 21:00:00"
      ) {
        $("#day3Temp").text("Temp: " + response.list[k].main.temp + " ˚F");
        $("#day3Hum").text("Humidity: " + response.list[k].main.humidity + "%");
        $("#day3Icon").attr(
          "src",
          "https://openweathermap.org/img/wn/" +
            response.list[k].weather[0].icon +
            "@2x.png"
        );
      }
    }
    // day 4 of five day
    for (var l = 0; l < response.list.length; l++) {
      if (
        response.list[l].dt_txt ===
        moment()
          .add(4, "day")
          .format("YYYY-MM-DD") +
          " 21:00:00"
      ) {
        $("#day4Temp").text("Temp: " + response.list[l].main.temp + " ˚F");
        $("#day4Hum").text("Humidity: " + response.list[l].main.humidity + "%");
        $("#day4Icon").attr(
          "src",
          "https://openweathermap.org/img/wn/" +
            response.list[l].weather[0].icon +
            "@2x.png"
        );
      }
    }
    // day 5 of five day
    for (var m = 0; m < response.list.length; m++) {
      if (
        response.list[m].dt_txt ===
        moment()
          .add(5, "day")
          .format("YYYY-MM-DD") +
          " 12:00:00"
      ) {
        $("#day5Temp").text("Temp: " + response.list[m].main.temp + " ˚F");
        $("#day5Hum").text("Humidity: " + response.list[m].main.humidity + "%");
        $("#day5Icon").attr(
          "src",
          "https://openweathermap.org/img/wn/" +
            response.list[m].weather[0].icon +
            "@2x.png"
        );
      }
    }
  });

  //trying to set item to store for search history
  function refreshStorage(name) {
    searchHistory.push(name);
    sessionStorage.setItem("userSearches", JSON.stringify(searchHistory));
    storedCities = JSON.parse(sessionStorage.getItem("userSearches"));
    displayCities();
  }
  //click function for searchbar
  $("#searchBtn").click(function(event) {
    event.preventDefault();
    currentCity = $("#userSearch").val();
    $("#userSearch").val("");
    const queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      currentCity +
      "&units=imperial&appid=03ad99cae7c389645ceff85905e3eb2f";
    const queryURLCurrent =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      currentCity +
      "&units=imperial&appid=03ad99cae7c389645ceff85905e3eb2f";
    // user input call to API
    $.ajax({
      url: queryURLCurrent,
      method: "GET"
    }).then(function(response) {
      $("#currentCityJumbo").text(
        response.name +
          ", " +
          response.sys.country +
          " (" +
          moment().format("dddd MMMM Do") +
          ")"
      );
      //UV index vars
      const lat = response.coord.lat;
      const lon = response.coord.lon;
      const uvQueryURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid=03ad99cae7c389645ceff85905e3eb2f&lat=" +
        lat +
        "&lon=" +
        lon;
      $("#currentWind").text("Wind Speed: " + response.wind.speed + " MPH");
      $("#currentHum").text("Humidity: " + response.main.humidity + "%");
      $("#currentTemp").text("Temperature: " + response.main.temp + " ˚F");
      $("#currentIcon").attr(
        "src",
        "https://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          "@2x.png"
      );

      refreshStorage(response.name);

      $.ajax({
        url: uvQueryURL,
        method: "GET"
      }).then(function(response) {
        $("#currentUV").text(response.value);
        if (response.value < 4) {
          $("#currentUV")
            .add("h5")
            .css("background-color", "yellow", "low");
        } else if (response.value >= 4 && response.value < 7) {
          $("#currentUV")
            .add("h5")
            .css("background-color", "orange", "moderate");
        } else {
          $("#currentUV")
            .add("h5")
            .css("background-color", "red", "high");
        }
      });
    });
    //5 day
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Day 1 of 5
      for (var i = 0; i < response.list.length; i++) {
        if (
          response.list[i].dt_txt ===
          moment()
            .add(1, "day")
            .format("YYYY-MM-DD") +
            " 21:00:00"
        ) {
          $("#day1Temp").text("Temp: " + response.list[i].main.temp + " ˚F");
          $("#day1Hum").text(
            "Humidity: " + response.list[i].main.humidity + "%"
          );
          $("#day1Icon").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              response.list[i].weather[0].icon +
              "@2x.png"
          );
        }
      }
      // Day 2 of 5
      for (var j = 0; j < response.list.length; j++) {
        if (
          response.list[j].dt_txt ===
          moment()
            .add(2, "day")
            .format("YYYY-MM-DD") +
            " 21:00:00"
        ) {
          $("#day2Temp").text("Temp: " + response.list[j].main.temp + " ˚F");
          $("#day2Hum").text(
            "Humidity: " + response.list[j].main.humidity + "%"
          );
          $("#day2Icon").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              response.list[j].weather[0].icon +
              "@2x.png"
          );
        }
      }
      // Day 3 of 5
      for (var k = 0; k < response.list.length; k++) {
        if (
          response.list[k].dt_txt ===
          moment()
            .add(3, "day")
            .format("YYYY-MM-DD") +
            " 21:00:00"
        ) {
          $("#day3Temp").text("Temp: " + response.list[k].main.temp + " ˚F");
          $("#day3Hum").text(
            "Humidity: " + response.list[k].main.humidity + "%"
          );
          $("#day3Icon").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              response.list[k].weather[0].icon +
              "@2x.png"
          );
        }
      }
      // Day 4 of 5
      for (var l = 0; l < response.list.length; l++) {
        if (
          response.list[l].dt_txt ===
          moment()
            .add(4, "day")
            .format("YYYY-MM-DD") +
            " 21:00:00"
        ) {
          $("#day4Temp").text("Temp: " + response.list[l].main.temp + " ˚F");
          $("#day4Hum").text(
            "Humidity: " + response.list[l].main.humidity + "%"
          );
          $("#day4Icon").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              response.list[l].weather[0].icon +
              "@2x.png"
          );
        }
      }
      // Day 5 of 5
      for (var m = 0; m < response.list.length; m++) {
        if (
          response.list[m].dt_txt ===
          moment()
            .add(5, "day")
            .format("YYYY-MM-DD") +
            " 12:00:00"
        ) {
          $("#day5Temp").text("Temp: " + response.list[m].main.temp + " ˚F");
          $("#day5Hum").text(
            "Humidity: " + response.list[m].main.humidity + "%"
          );
          $("#day5Icon").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              response.list[m].weather[0].icon +
              "@2x.png"
          );
        }
      }
    });
  });
});
