/*生成6位隨機數*/
function rand(){
        validate="";
        var str="123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789";
        var arr=str.split("");
        var ranNum;
        for(var i=0;i<6;i++){
            ranNum=Math.floor(Math.random()*66);   //隨機數在[0,65]之間
            validate+=arr[ranNum];
        }
        return validate;
}


$(document).ready(function(){
    var validation = rand();
    $('#login').click(function(){
        location.replace("/index.html") ;
    });
    $('#emailVerify').click(function(){
        alert("系統目前正在寄送驗證信請稍等！");
        validation = rand();
        var data = {
            "recipient": $('#email').val(),
            "msgBody":"這裡是記帳助手歡迎您註冊本系統這是您的驗證碼"+validation,
            "subject":"記帳助手驗證信"
        }
        $.ajax({
            url:'/sendMail',
            method:'post',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType:'JSON',
            success:function(result){
                  console.log(result);
                   if(result != null) {
                   alert("系統已成功發送驗證碼至使用者信箱！ 如未收到請確認信箱是否正確");
                   }
            },
            error:function (data) {
                 alert("註冊信箱無效！");
            }
        });
    });

    $('#signup').click(function(){
        if($('#verify').val()==validation){
            console.log("EnterSuccess");
            var data = {
                                "email": $('#email').val(),
                                "password":$('#password').val(),
                                "fullname":$('#fullName').val(),

                                }
                            console.log($('#email').val());
                            console.log(data);

                            $.ajax({
                                url:'/signup',
                                method:'post',
                                data: JSON.stringify(data),
                               contentType: "application/json",
                                dataType:'JSON',
                                success:function(result){
                                   console.log(result);
                                    if(result != null) {
                                        alert("修改成功！");
                                        location.replace("/index.html") ;
                                   }
                               },
                                error:function (data) {
                                }
                            });
        }

    });
});

