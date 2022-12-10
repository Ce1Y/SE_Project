$(document).ready(function(){
    $('#signup').click(function(){
        var data = {
                    "email": $('#email').val(),
                    "password":$('#password').val(),
                    "fullname":$('#fullName').val(),

                    }
                console.log($('#email').val());
                console.log(data);

                $.ajax({
                    url:'http://localhost:8080/signup',
                    method:'post',
                    data: JSON.stringify(data),
                   contentType: "application/json",
                    dataType:'JSON',
                    success:function(result){
                       console.log(result);
                        if(result != null) {
                            alert("修改成功！");

                       }
                   },
                    error:function (data) {
                    }
                });
    });
});

