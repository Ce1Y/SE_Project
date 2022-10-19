$(document).ready(function() {

    $('#postbtn').click(function(){
        //console.log($(this).text());
        var data = {
            "date": $('#Date-name').get(),
            "category":$('#Category-text').get(),
            "price": $('#Price-text').get(),
            "description":$('#description-text').get()}
        console.log( $('#Date-name').get());
        $.ajax({
            url:'http://localhost:8080/products',
            method:'post',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType:'JSON',
            success:function(result){
                if(result != null) {
                    alert("修改成功！");
                }
            },
            error:function (data) {
            }
        });
    });
});