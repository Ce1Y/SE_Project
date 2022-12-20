$(document).ready(function () {
    var results = $('#display');
    $(function () {//頁面初始
        $("#time").attr("value", $(this).val());
        var myDate = document.querySelector('#time');
        var today = new Date();
        var monthOutcome = 0;
        var monthIncome = 0;
        console.log(today);
        myDate.value = today.toISOString().substr(0, 10);
        console.log(today.toISOString().substr(0, 10))


        $.ajax({
            type: "GET",
            url: "/setUserDetails?email=" + localStorage.getItem("email") + "&flag=" + localStorage.getItem("flag"),
             success: function (allProducts) {
                console.log("setUser success");
             }
        });

        $.ajax({
            type: "GET",
            url: "/setUserForBudget?email=" + localStorage.getItem("email") + "&flag=" + localStorage.getItem("flag"),
             success: function (allProducts) {
                console.log("setUser success");
             }
        });
        $.ajax({
            type: "GET",
            url: "/date?date=" + $('#time').val(),
            success: function (allProducts) {

                document.getElementById('email').innerHTML = localStorage.getItem('email')+"<br> By:"+localStorage.getItem('flag');
                var str = '';
                var flag1=1;
                if (allProducts.length==0) {
                    flag1=0;

                }
                else{
                $.each(allProducts, function (i, product) {
                    if(product.accountingType=='income'){
                        str+=`
                         <tr >
                              <td>${product.category}</td>
                              <td>${product.description}</td>
                              <td>${product.price}</td>
                         </tr>`
                    }
                   else{str+=`
                         <tr style="background: #F8F8FF">
                              <td>${product.category}</td>
                              <td>${product.description}</td>
                              <td>${product.price}</td>
                              <td></td>
                         </tr>`
                   }
                });
                }

                if(flag1==0){
                    //<input type="image" src="https://img95.699pic.com/element/40103/3918.png_300.png" alt="Submit" width="300" height="300">
                    results.html("");
                    results.append(`
                     <img id="img"
                     src="https://imgur.com/XUbftA4.jpg" >
                   `)
                }
                else{
                    results.html("");
                    results.append(`
                     <table>
                         <thead>
                         <tr class="header" style="color: black;">
                             <th>種類</th>
                             <th>名稱</th>
                             <th>金額</th>
                             <th style="cursor: pointer;">X</th>
                         </tr>
                         </thead>
                        <tbody>

                        </tbody>

                     </table>
                    `)
                    var obToday = document.querySelector('tbody');
                    obToday.innerHTML = str;
                }

            }

        });
        $.ajax({
            type: "GET",
            url: "/monthIncome?date=" + $('#time').val(),
            success: function (allProducts) {
                monthIncome=0;
                $.each(allProducts, function (i, product) {
                    monthIncome = monthIncome + product.price;
                });
                var Income = document.querySelector('#monthIncomeText');
                Income.value="    $"+monthIncome;
            }
        });
        $.ajax({
            type: "GET",
            url: "/monthOutcome?date=" + $('#time').val(),
            success: function (allProducts) {
                monthOutcome=0;
                $.each(allProducts, function (i, product) {
                    monthOutcome = monthOutcome + product.price;
                });
                var outcome = document.querySelector('#monthOutcomeText');
                outcome.value="  $"+monthOutcome;
            }
        });
        $.ajax({
            type: "GET",
            url: "/date?date=" + $('#time').val(),
            success: function (allProducts) {
                var dayOutcome =0;
                $.each(allProducts, function (i, product) {
                    dayOutcome = dayOutcome + product.price;
                });
                var outcome = document.querySelector('#todayOutcome');
                //outcome.value="當天支出 $"+dayOutcome;
                outcome.innerHTML="當天支出 <br>$:"+dayOutcome;
            }
        });


    });
    $('#time').change(function () {//時間更改
        $("#time").attr("value", $(this).val());
        $.ajax({
            type: "GET",
            url: "/date?date=" + $('#time').val(),
            success: function (allProducts) {

                var str = '';
                var flag1=1;
                if (allProducts.length==0) {
                    flag1=0;

                }
                else{
                $.each(allProducts, function (i, product) {
                    if(product.accountingType=='income'){
                        str+=`
                         <tr >
                              <td>${product.category}</td>
                              <td>${product.description}</td>
                              <td>${product.price}</td>
                         </tr>`
                    }
                   else{str+=`
                         <tr style="background: #F8F8FF">
                              <td>${product.category}</td>
                              <td>${product.description}</td>
                              <td>${product.price}</td>
                              <td></td>
                         </tr>`
                   }
                });
                }
                if(flag1==0){
                //<img src="https://img95.699pic.com/element/40103/3918.png_300.png" style="background-color: transparent;" />
                    results.html("");
                    results.append(`
                    <img id="img"
                     src="https://imgur.com/XUbftA4.jpg" >
                     `)
                }
                else{
                    results.html("");
                    results.append(`
                     <table>
                         <thead>
                         <tr class="header" style="color: black;">
                             <th>種類</th>
                             <th>名稱</th>
                             <th>金額</th>
                             <th style="cursor: pointer;">X</th>
                         </tr>
                         </thead>
                        <tbody>

                        </tbody>

                     </table>
                    `)
                    var obToday = document.querySelector('tbody');
                    obToday.innerHTML = str;
                }

            }

        });
        $.ajax({
            type: "GET",
            url: "/monthIncome?date=" + $('#time').val(),
            success: function (allProducts) {
                monthIncome=0;
                $.each(allProducts, function (i, product) {
                    monthIncome = monthIncome + product.price;
                });
                var Income = document.querySelector('#monthIncomeText');
                Income.value="    $"+monthIncome;
            }
        });
        $.ajax({
            type: "GET",
            url: "/monthOutcome?date=" + $('#time').val(),
            success: function (allProducts) {
                monthOutcome=0;
                $.each(allProducts, function (i, product) {
                    monthOutcome = monthOutcome + product.price;
                });
                var outcome = document.querySelector('#monthOutcomeText');
                outcome.value="  $"+monthOutcome;
            }
        });
        $.ajax({
            type: "GET",
            url: "/date?date=" + $('#time').val(),
            success: function (allProducts) {
                console.log($('#time').val());
                console.log(allProducts);
                var dayOutcome =0;
                $.each(allProducts, function (i, product) {
                    dayOutcome = dayOutcome + product.price;
                });
                var outcome = document.querySelector('#todayOutcome');
                //outcome.value="當天支出 $"+dayOutcome;
                outcome.innerHTML="當天支出 <br>$:"+dayOutcome;
            }
        });


    });

    $('#addNewBudgetBtn').click(function(){
        var data = {
        "month": $('#monthChoose').val(),
        "price":$('#budgetPrice').val(),
        "email":localStorage.getItem("email"),
        "loginMethod":localStorage.getItem("flag")
        }

        $.ajax({
            type: "GET",
            url: "/monthBudget?month=" + $('#monthChoose').val(),
            success: function (allProducts) {
                console.log("already have");
                $.ajax({
                     url:'/updateBudget',
                     method:'put',
                     data: JSON.stringify(data),
                     contentType: "application/json",
                     dataType:'JSON',
                     success:function(result){
                        console.log(result);
                         if(result != null) {
                             alert("已修改原本的預算！");
                             location.replace("/home.html") ;
                        }
                     },
                     error:function (data) {
                     }
                });
            },
            error:function(){
                $.ajax({
                     url:'/addBudget',
                     method:'post',
                     data: JSON.stringify(data),
                     contentType: "application/json",
                     dataType:'JSON',
                     success:function(result){
                        console.log(result);
                         if(result != null) {
                             alert("新增預算成功！");
                             location.replace("/home.html") ;
                        }
                     },
                     error:function (data) {
                     }
                });
            }
        });

    });



});
