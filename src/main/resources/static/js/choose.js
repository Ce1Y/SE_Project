$(document).ready(function() {

    $('#postbtn').click(function(){
        //console.log($(this).text());
        var data = {
            "date": $('#Date-name').val(),
            "category":$('#Category-text').val(),
            "price": $('#Price-text').val(),
            "description":$('#description-text').val()}
        console.log( $('#Date-name').val());
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