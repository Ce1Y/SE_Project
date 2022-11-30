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
            url: "http://localhost:8080/date?date=" + $('#time').val(),
            success: function (allProducts) {
                //https://subservices.post.gov.tw/post/internet/images/NoResult.jpg
                results.html("");
                results.append(`
                <input type="image" src="https://subservices.post.gov.tw/post/internet/images/NoResult.jpg" alt="Submit" width="390" height="300">
                `)

                $.each(allProducts, function (i, product) {
                    if (i == 0) {
                        results.html("");
                    }
                    results.append(
                        "<div class='card' id = o_card>" +
                        "<div class='card-header'>" + product.category + "</div>" +
                        "<div class='card-body bg-dark text-white'>" +
                        "<p>" + "金額:" + product.price + "<br>" + "時間" + product.date +
                        "</p>" +
                        `<div class="card">
                                    <div class="card-header">
                                        <a class="btn" data-bs-toggle="collapse" href="#collapse${i}">
                                            詳細資訊
                                        </a>
                                    </div>
                                    <div id="collapse${i}" class="collapse" data-bs-parent="#accordion">
                                        <div class="card-body">                                        
                                             <p style="color: black;">${product.description}</p>
                                        </div>
                                    </div>
                                </div>` +

                        "</div>" +
                        "</div>"
                    )

                });

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
                outcome.value="當天支出 $"+dayOutcome;
            }
        });


    });
    $('#time').change(function () {//時間更改
        $("#time").attr("value", $(this).val());
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/date?date=" + $('#time').val(),
            success: function (allProducts) {
                results.html("");
                results.append(`
                <input type="image" src="https://subservices.post.gov.tw/post/internet/images/NoResult.jpg" alt="Submit" width="390" height="300">
                `)

                $.each(allProducts, function (i, product) {
                    if (i == 0) {
                        results.html("");
                    }
                    results.append(
                        "<div class='card' id = o_card>" +
                        "<div class='card-header'>" + product.category + "</div>" +
                        "<div class='card-body bg-dark text-white'>" +
                        "<p>" + "金額:" + product.price + "<br>" + "時間" + product.date +
                        "</p>" +
                        `<div class="card">
                                    <div class="card-header">
                                        <a class="btn" data-bs-toggle="collapse" href="#collapse${i}">
                                            詳細資訊
                                        </a>
                                    </div>
                                    <div id="collapse${i}" class="collapse" data-bs-parent="#accordion">
                                        <div class="card-body">                                        
                                             <p style="color: black;">${product.description}</p>
                                        </div>
                                    </div>
                                </div>` +

                        "</div>" +
                        "</div>"
                    )

                });
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
                outcome.value="當天支出 $"+dayOutcome;
            }
        });


    });
});