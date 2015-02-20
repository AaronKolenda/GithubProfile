var getUserData = function() {

  $.ajax({

    url: "https://api.github.com/users/AaronKolenda?access_token=85125e5a99be21e5bf22ba26ebd5faf7a388dcb4",

    method: "GET",

    success: function(userData) {

      console.log(userData);

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

$(document).ready(function(){
    getTemplates();
    getUserData();
    getUserRepos();

});


