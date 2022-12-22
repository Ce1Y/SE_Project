$(document).ready(function(){
    $('#btn2').click(function(){


       var email = document.getElementById("email").value
       var password = document.getElementById("password").value

       localStorage.setItem("email",email);
       localStorage.setItem("flag","local");
       $.ajax ({
           url: "/login",
           type: "POST",
           data: "email=" + email + "&password=" + password,
           success: function(response, textStatus, xhr) {
                  alert("Login successfully");
                  window.location.href = "/home.html"
           },
           error: function (xhr, ajaxOptions, thrownError) {
                   alert(xhr.status);
                   alert(thrownError);
           }
       });
    });
});


