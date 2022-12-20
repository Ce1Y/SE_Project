Date.prototype.toISOString = function () {
    let pad =(n)=>(n < 10)?'0' + n:n;
    let hours_offset = this.getTimezoneOffset() / 60;
    let offset_date = this.setHours(this.getHours() - hours_offset);
    let symbol = (hours_offset >= 0) ? "-" : "+";
    let time_zone = symbol+pad(Math.abs(hours_offset))+ ":00";

    return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) +
        'T' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes()) +
        ':' + pad(this.getUTCSeconds()) +
        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        time_zone;
};
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
        myDate.value = today.toISOString().substr(0, 10);
    }
//    $("#Type-text").on("change",selectOnchange_Type(this));
    today();


    $('#postbtn').click(function(){
        var date = new Date();
        var tomorrow=new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        var tempDate = date.toISOString().substr(0, 19);
        console.log(tempDate);
        var data = {
            "date": $('#Date-name').val(),
            "category":$('#Category-text').val(),
            "price": $('#Price-text').val(),
            "description":$('#description-text').val(),
            "accountingType": type,
            "email":localStorage.getItem("email"),
            "accDate": $('#Date-name').val()+"T"+tempDate.substr(11,19),
            "loginMethod":localStorage.getItem("flag")
            }
        var total = 0;
        $.ajax({
            type: "GET",
            url: "/monthOutcome?date=" + $('#Date-name').val(),
            success: function (allProducts) {
                total=0;
                $.each(allProducts, function (i, product) {
                    total = total + product.price;
                });
                total+$('#Price-text').val();
                $.ajax({
                    type:"GET",
                    url: "/monthBudget?month=" + "Month"+$('#monthChoose').val().substring(5,7),
                    success: function(allBudgets){
                        var budget =0;
                        $.each(allBudgets, function (i, budget) {
                            budget = budget + budget.price;
                        });
                        if(total > budget) {
                        console.log("exceed");
                        alert("您已超出當月預算");
                        }
                    }

                });
            }
        });
        console.log(data);
        console.log( $('#Date-name').val());
        $.ajax({
            url:'/products',
            method:'post',
            data: JSON.stringify(data),
           contentType: "application/json",
            dataType:'JSON',
            success:function(result){
               console.log(result);
                if(result != null) {
                    alert("新增成功！");
                    location.replace("/home.html") ;
               }
           },
            error:function (data) {
            }
        });

    });
});