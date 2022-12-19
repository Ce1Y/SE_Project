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
        console.log($('#time').val());

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/setUserDetails?email=" + localStorage.getItem("email") + "&flag=" + localStorage.getItem("flag"),
             success: function (allProducts) {
                console.log("setUser success");
             }
        });
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/date?date=" + $('#time').val(),
            success: function (allProducts) {
                document.getElementById('email').innerHTML = localStorage.getItem('email')+"<br> By:"+localStorage.getItem('flag');
                var str = '';
                var flag=1;
                if (allProducts.length==0) {
                    flag=0;
                }

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
                         <tr style="background: #7700FF">
                              <td>${product.category}</td>
                              <td>${product.description}</td>
                              <td>${product.price}</td>
                              <td></td>
                         </tr>`
                   }
                });
                if(flag==0){
                    results.html("");
                    results.append(`
                    <input type="image" src="https://subservices.post.gov.tw/post/internet/images/NoResult.jpg" alt="Submit" width="390" height="300">
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
            url: "http://localhost:8080/monthIncome?date=" + $('#time').val(),
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
            url: "http://localhost:8080/monthOutcome?date=" + $('#time').val(),
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
            url: "http://localhost:8080/date?date=" + $('#time').val(),
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
            url: "http://localhost:8080/date?date=" + $('#time').val(),
            success: function (allProducts) {
                var str = '';
                var flag=1;
                if (allProducts.length==0) {
                    flag=0;
                }
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
                         <tr style="background: #7700FF">
                              <td>${product.category}</td>
                              <td>${product.description}</td>
                              <td>${product.price}</td>
                              <td></td>
                         </tr>`
                   }
                });
                if(flag==0){
                    results.html("");
                    results.append(`
                    <input type="image" src="https://subservices.post.gov.tw/post/internet/images/NoResult.jpg" alt="Submit" width="390" height="300">
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
            url: "http://localhost:8080/monthIncome?date=" + $('#time').val(),
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
            url: "http://localhost:8080/monthOutcome?date=" + $('#time').val(),
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
            url: "http://localhost:8080/date?date=" + $('#time').val(),
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
});
