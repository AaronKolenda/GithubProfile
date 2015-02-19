var getUserData = function() {

  $.ajax({

    url: "https://api.github.com/users/AaronKolenda?access_token=85125e5a99be21e5bf22ba26ebd5faf7a388dcb4",

    method: "GET",

    success: function(userData) {

      console.log(userData);

      var avatar_url = userData.avatar_url;
      var login = userData.login;

      var htmlString = templates.headerUserInfo(userData);

      $("#menuright").append(htmlString);  

    }

  });

}

var templates = {};

var getTemplates = function(){

  var headerUserTemplateString = $("#header-user-template").text()

  templates.headerUserInfo = Handlebars.compile(headerUserTemplateString)

}


