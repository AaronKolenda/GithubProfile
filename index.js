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

    success: function(userRepos) {

      console.log(userRepos);

      userRepos = _.map(userRepos, function(repo){
        repo.created_at = formatLastUpdated(repo.created_at);
      });

      var repositoriesString = templates.repositoriesInfo(userRepos);
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

    var dateSplit = date.split("-");
    var year = dateSplit[0];
    var month = dateSplit[1];
    var day = dateSplit[2];

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

var formatLastUpdated = function(s) {
    s = s.slice(0, -1);

    var split = s.split("T");
    var date = split[0];

    var dateSplit = date.split("-");
    var year = dateSplit[0];
    var month = dateSplit[1];
    var day = dateSplit[2];

    var time = split[1];

    var timeSplit = time.split(":");
    var hour = timeSplit[0];
    var minute = timeSplit[1];
    var second = timeSplit[2];

    var userDate = new Date();
    
    var currentDay = userDate.getDate();
    var currentYear = userDate.getFullYear();
    var currentHour = userDate.getHours();
    var currentMinute = userDate.getMinutes();
    var currentSecond = userDate.getSeconds();
    var currentMonth = userDate.getMonth();

    console.log(currentDay);
    console.log(currentMonth);
    console.log(currentYear);
    console.log(currentHour);
    console.log(currentMinute);
    console.log(currentSecond);

    var secondsDiff = currentSecond - second;
    var minutesDiff = currentMinute - minute;
    var hoursDiff = currentHour - hour;
    var daysDiff = currentDay - day;
    var monthDiff = currentMonth - month;
    var yearDiff = currentYear - year;


    console.log(secondsDiff);
    console.log(minutesDiff);
    console.log(hoursDiff);
    console.log(daysDiff);

    var finalString;

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

    if (yearDiff > 0) {
      if (monthDiff > 0) {
        if (daysDiff > 0) {
          if (hoursDiff > 0) {
            if (minutesDiff > 0) {
              if (secondsDiff > 0) {
                finalString = ("Updated " + secondsDiff + " seconds ago");

              }
              finalString = ("Updated " + minutesDiff + " minutes ago");
            }
          finalString = ("Updated " + hoursDiff + " hours ago");
          }
        finalString = ("Updated " + daysDiff + " days ago");
        }
        finalString = ("Updated " + monthString + " " + day + ", " + year);
      }
      finalString = ("Updated " + monthString + " " + day + ", " + year);
    }

console.log(finalString);
return finalString;


}


$(document).ready(function(){
    getTemplates();
    getUserData();
    getUserRepos();
    //formatLastUpdated("2014-04-28T14:42:32Z");

});


