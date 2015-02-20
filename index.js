var getUserData = function() {

  $.ajax({

    url: "https://api.github.com/users/AaronKolenda?access_token=85125e5a99be21e5bf22ba26ebd5faf7a388dcb4",

    method: "GET",

    success: function(userData) {

      console.log(userData);

      userData.created_at = formatDate(userData.created_at);

      var htmlString = templates.headerUserInfo(userData);
      $("#head-user-info").append(htmlString);  

      var loginUserString = templates.loginNameInfo(userData);
      $("#namesavatar").append(loginUserString);  

      var locationJoinString = templates.locationJoinInfo(userData);
      $("#locationjoin").append(locationJoinString); 

      var followingString = templates.followingInfo(userData);
      $("#following").append(followingString);  


    }

  });

}


var getUserRepos = function() {

  $.ajax({

    url: "https://api.github.com/users/AaronKolenda/repos?access_token=85125e5a99be21e5bf22ba26ebd5faf7a388dcb4",

    method: "GET",

    success: function(userData) {

      console.log(userData);

      var repositoriesString = templates.repositoriesInfo(userData);
      $("#repositories").append(repositoriesString); 


    }

  });

}

var templates = {};

var getTemplates = function(){

  var headerUserTemplateString = $("#header-user-template").text()
  templates.headerUserInfo = Handlebars.compile(headerUserTemplateString);

  var loginNameTemplateString = $("#login-name-template").text()
  templates.loginNameInfo = Handlebars.compile(loginNameTemplateString);

  var locationJoinTemplateString = $("#location-join-template").text()
  templates.locationJoinInfo = Handlebars.compile(locationJoinTemplateString);

  var followingTemplateString = $("#following-template").text()
  templates.followingInfo = Handlebars.compile(followingTemplateString);

  var repositoriesTemplateString = $("#repositories-template").text()
  templates.repositoriesInfo = Handlebars.compile(repositoriesTemplateString);
}

var formatDate = function(str) {
    var split = str.split("T");
    var date = split[0];
    console.log(date);

    var dateSplit = date.split("-");
    var year = dateSplit[0];
    var month = dateSplit[1];
    var day = dateSplit[2];
    console.log(year);
    console.log(month);
    console.log(day);

    var monthString;

    if (month === "01") {monthString = "Jan"}
    if (month === "02") {monthString = "Feb"}
    if (month === "03") {monthString = "Mar"}
    if (month === "04") {monthString = "Apr"}
    if (month === "05") {monthString = "May"}
    if (month === "06") {monthString = "Jun"}
    if (month === "07") {monthString = "Jul"}
    if (month === "08") {monthString = "Aug"}
    if (month === "09") {monthString = "Sep"}
    if (month === "10") {monthString = "Oct"}
    if (month === "11") {monthString = "Nov"}
    if (month === "12") {monthString = "Dec"}

    var dateString = (monthString + " " + day + ", " + year);

    return dateString;
}


$(document).ready(function(){
    getTemplates();
    getUserData();
    getUserRepos();

});


