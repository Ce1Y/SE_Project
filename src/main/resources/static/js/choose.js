var type = "expense";
function selectOnchange_Type(selectedType)
{
    var selectedValue = selectedType.options[selectedType.selectedIndex].value;

    type = selectedValue;
    return selectedValue;

}


$(document).ready(function() {
    function today() {
        var myDate = document.querySelector('#Date-name');
        var today = new Date();
        var tomorrow=new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1)
        console.log(today);
        myDate.value = tomorrow.toISOString().substr(0, 10);
    }
//    $("#Type-text").on("change",selectOnchange_Type(this));
    today();


    $('#postbtn').click(function(){
        console.log("create");
         console.log($('#Type_text').text());
        //console.log($(this).text());
       // var type = selectOnchange_Type($('#Type_text').val())
        var data = {
            "date": $('#Date-name').val(),
            "category":$('#Category-text').val(),
            "price": $('#Price-text').val(),
            "description":$('#description-text').val(),
            "accountingType": type}
        console.log(data);
        console.log( $('#Date-name').val());
        $.ajax({
            url:'http://localhost:8080/products',
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