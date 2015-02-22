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

      _.map(userRepos, function(repo){
        repo.updated_at = formatLastUpdated(repo.updated_at);
      });

      var repositoriesString = templates.repositoriesInfo(userRepos);
      $("#repositories").append(repositoriesString); 


    }

  });

} 

var getUserStarred = function() {

  $.ajax({

    url: "https://api.github.com/users/AaronKolenda/starred?access_token=85125e5a99be21e5bf22ba26ebd5faf7a388dcb4",

    method: "GET",

    success: function(starredRepos) {

      console.log(starredRepos);

      if (starredRepos.length === 0) {
        starredRepos = "0";
      }

      var starredString = templates.starredInfo(starredRepos);
      $("#starred").append(starredString);
    


    }

  });

} 

var getUserOrgs = function() {

  $.ajax({

    url: "https://api.github.com/users/AaronKolenda/orgs?access_token=85125e5a99be21e5bf22ba26ebd5faf7a388dcb4",

    method: "GET",

    success: function(userOrgs) {

      console.log(userOrgs);

      var organizationsString = templates.organizationsInfo(userOrgs);
      $("#leftwrapper").append(organizationsString);
    


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

  var starredTemplateString = $("#starred-template").text()
  templates.starredInfo = Handlebars.compile(starredTemplateString);

  var organizationsTemplateString = $("#organizations-template").text()
  templates.organizationsInfo = Handlebars.compile(organizationsTemplateString);
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

    var currentDate = new Date();
    
    var currentDay = currentDate.getUTCDate();
    var currentYear = currentDate.getUTCFullYear();
    var currentHour = currentDate.getUTCHours();
    var currentMinute = currentDate.getUTCMinutes();
    var currentSecond = currentDate.getUTCSeconds();
    var currentMonth = currentDate.getUTCMonth();

    currentMonth = currentMonth + 1;

    var secondsDiff = currentSecond - second;
    var minutesDiff = currentMinute - minute;
    var hoursDiff = currentHour - hour;
    var daysDiff = currentDay - day;
    var monthDiff = currentMonth - month;
    var yearDiff = currentYear - year;

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
      finalString = ("Updated " + monthString + " " + day + ", " + year);
    }

    if (yearDiff == 0 && monthDiff > 0) {
      finalString = ("Updated " + monthString + " " + day + ", " + year);
    }

    if (yearDiff == 0 && monthDiff == 0 && daysDiff > 0) {
      finalString = ("Updated " + daysDiff + " days ago");
    }

    if (yearDiff == 0 && monthDiff == 0 && daysDiff == 0 && hoursDiff > 0) {
      if (hoursDiff == 1) {
      finalString = ("Updated " + hoursDiff + " hour ago");
      }
      if (hoursDiff > 1) {
      finalString = ("Updated " + hoursDiff + " hours ago");
      }
    }

    if (yearDiff == 0 && monthDiff == 0 && daysDiff == 0 && hoursDiff == 0 && minutesDiff > 0) {
      if (minutesDiff == 1) {
      finalString = ("Updated " + minutesDiff + " minute ago");
      }
      if (minutesDiff > 1) {
      finalString = ("Updated " + minutesDiff + " minutes ago");
      }
    }

    if (yearDiff == 0 && monthDiff == 0 && daysDiff == 0 && hoursDiff == 0 && minutesDiff == 0 && secondsDiff > 0) {
      if (secondsDiff == 1) {
      finalString = ("Updated " + secondsDiff + " second ago");
      }
      if (secondsDiff > 1) {
      finalString = ("Updated " + secondsDiff + " seconds ago");
      }
    }

    if (yearDiff == 0 && monthDiff == 0 && daysDiff == 0 && hoursDiff == 0 && minutesDiff == 0 && secondsDiff == 0) {
      finalString = "Updated just now";
    }

    return finalString;
}


$(document).ready(function(){
    getTemplates();
    getUserData();
    getUserRepos();
    getUserStarred();
    getUserOrgs();

});


