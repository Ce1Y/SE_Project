var currentYear,currentMonth,currentDate;
var selectedYear,selectedMonth,selectedDate;
var currentCategoryArr = []
$(document).ready(function(){
    $(function(){
        var today = new Date();
        var todayString = today.toISOString().substr(0, 10 );
        currentYear = parseInt( todayString.substring(0,4) );
        currentMonth = parseInt( todayString.substring(5,7) );
        currentDate = parseInt( todayString.substring(8,10) );
        selectedYear=currentYear;
        selectedMonth=currentMonth;
        selectedDate=currentDate;
        DealMonthOutcome(todayString);
        $("#YearAndDate").append(`<b>${currentYear}年${currentMonth}月</b>`);
    });

    //按下<鍵
    $("#selectTimeBack").click(function(){
        $("#chartFather").html("");
        var displayDate;
        console.log("displayDate in <" + displayDate);
        if( $('#SelectedTimeType input:radio:checked').val() == "month")
        {
            if( (selectedMonth-1) == 0 )
            {
                selectedMonth = 12;
                selectedYear = selectedYear-1;
            }
            else
            {
                selectedMonth = selectedMonth - 1;
            }
            displayDate = selectedYear + "年" + selectedMonth + "月";
            changeYearAndDate(0,displayDate);
            if($('#analysisType_btn input:radio:checked').val() == "income")
            {
                DealMonthIncome(displayDate);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "expense")
            {
                DealMonthOutcome(displayDate);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "balance")
            {
                DealMonthBalance((selectedYear+"-"+selectedMonth));
            }
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "sixMonth" )
        {
            if( (selectedMonth-1) == 0 )
            {
                selectedMonth = 12;
                selectedYear =selectedYear-1;
            }
            else
            {
                selectedMonth = selectedMonth - 1;
            }
            if(selectedMonth<6)
            {
                displayDate =
                (selectedYear-1) +"年" + (selectedMonth+7) + "月~" + selectedYear + "年" + selectedMonth + "月";
            }
            else
            {
                displayDate =
                (selectedYear) +"年" + (selectedMonth-5) + "月~" + selectedYear + "年" + selectedMonth + "月";
            }
            console.log("sixmonth" + displayDate);
            changeYearAndDate(1,displayDate);
            if($('#analysisType_btn input:radio:checked').val() == "income")
            {
                DealSixMonthIncome(displayDate.substring(0,7), displayDate.substring(9,16));
            }
            else if($('#analysisType_btn input:radio:checked').val() == "expense")
            {
                DealSixMonthOutcome(displayDate.substring(0,7), displayDate.substring(9,16));
            }
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "year" )
        {
            selectedYear =selectedYear - 1;
            displayDate = selectedYear + "年";
            changeYearAndDate(0,displayDate);
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "custom" )
        {

        }
        console.log("displayDate in < end" + displayDate);
    });

    //按下>鍵
    $("#selectTimeForward").click(function(){
        $("#chartFather").html("");
        var displayDate;
        if( $('#SelectedTimeType input:radio:checked').val() == "month")
        {
            if( (selectedMonth+1) == 13 )
            {
                selectedMonth = 1;
                selectedYear =selectedYear+1;
            }
            else
            {
                selectedMonth = selectedMonth + 1;
            }
            displayDate = selectedYear + "年" + selectedMonth + "月";
            changeYearAndDate(0,displayDate);
            if($('#analysisType_btn input:radio:checked').val() == "income")
            {
                DealMonthIncome(displayDate);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "expense")
            {
                DealMonthOutcome(displayDate);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "balance")
            {
               DealMonthBalance((selectedYear+"-"+selectedMonth));
            }

        }
        else if($('#SelectedTimeType input:radio:checked').val() == "sixMonth" )
        {
            if( (selectedMonth+1) == 13 )
            {
                selectedMonth = 1;
                selectedYear =selectedYear+1;
            }
            else
            {
                selectedMonth = selectedMonth+ 1;
            }
            if(selectedMonth<6)
            {
                displayDate =
                (selectedYear-1) +"年" + (selectedMonth+7) + "月~" + selectedYear + "年" + selectedMonth + "月";
            }
            else
            {
                displayDate =
                (selectedYear) +"年" + (selectedMonth-5) + "月~" + selectedYear + "年" + selectedMonth + "月";
            }
            changeYearAndDate(1,displayDate);
            console.log("sixmonth" + displayDate);
            if($('#analysisType_btn input:radio:checked').val() == "income")
            {
                DealSixMonthIncome(displayDate.substring(0,7), displayDate.substring(9,16));
            }
            else if($('#analysisType_btn input:radio:checked').val() == "expense")
            {
                DealSixMonthOutcome(displayDate.substring(0,7), displayDate.substring(9,16));
            }
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "year" )
        {
            selectedYear =selectedYear+ 1;
            displayDate = selectedYear + "年";
            changeYearAndDate(0,displayDate);
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "custom" )
        {

        }
    });

    //SearchWithExpense
    $("#analysisTypeExpense").on("change",function(){
         selectedYear=currentYear;
         selectedMonth=currentMonth;
         let displayDate = "" + selectedYear + "年" + selectedMonth + "月";
         changeYearAndDate(0,displayDate);
         resetSelectedTimeType();
    });

    //SearchWithIncome
    $("#analysisTypeIncome").on("change",function(){
         selectedYear=currentYear;
         selectedMonth=currentMonth;
         let displayDate = "" + selectedYear + "年" + selectedMonth + "月";
         changeYearAndDate(0,displayDate);
         resetSelectedTimeType();
    });

    //SearchWithBalance
    $("#analysisTypeBalance").on("change",function(){
         selectedYear=currentYear;
         selectedMonth=currentMonth;
         let displayDate = selectedYear + "年";
         changeYearAndDate(0,displayDate);
         resetSelectedTimeType();
    });

    //SearchWithMonth
    $("#SelectedTimeMonth").on("change",function(){
         selectedYear=currentYear;
         selectedMonth=currentMonth;
         let displayDate = selectedYear + "年" + selectedMonth + "月";
         changeYearAndDate(0,displayDate);
         if($('#analysisType_btn input:radio:checked').val() == "income")
         {
             DealMonthIncome(displayDate);
         }
         else if($('#analysisType_btn input:radio:checked').val() == "expense")
         {
             DealMonthOutcome(displayDate);
         }
         else if($('#analysisType_btn input:radio:checked').val() == "balance")
         {
            DealMonthBalance((selectedYear+"-"+selectedMonth));
         }
    });

    //SearchWithSixMonth
    $("#SelectedTimeSixMonth").on("change",function(){
         selectedYear=currentYear;
         selectedMonth=currentMonth;
         let displayDate = "";
         if(selectedMonth<6)
         {
            displayDate = selectedYear.toString() + "年" + (selectedMonth+7).toString() + "月~" +
                              selectedYear.toString() + "年" +selectedMonth.toString() + "月";
         }
         else
         {
            displayDate = selectedYear.toString() + "年" + (selectedMonth-5).toString() + "月~" +
                              selectedYear.toString() + "年" + selectedMonth.toString() + "月";
         }
         changeYearAndDate(1,displayDate);
         console.log("sixmonth" + displayDate);
         if($('#analysisType_btn input:radio:checked').val() == "income")
         {
             DealSixMonthIncome(displayDate.substring(0,7), displayDate.substring(9,16));
         }
         else if($('#analysisType_btn input:radio:checked').val() == "expense")
         {
             DealSixMonthOutcome(displayDate.substring(0,7), displayDate.substring(9,16));
         }
    });

    //SearchWithYear
    $("#SelectedTimeYear").on("change",function(){
         selectedYear=currentYear;
         selectedMonth=currentMonth;
         let displayDate = selectedYear + "年";
         changeYearAndDate(0,displayDate);
         DealYearOutcome
    });

    //SearchWithCustom
    $("#SelectedTimeCustom").on("change",function(){
         $("#CustomCheckBtn").click(function(){
            console.log("selecetedDateEnd TExt")
            console.log($("#dateStart").val());
            console.log($("#dateEnd").val());
         });

    });

    //由bar換成donut or donut to bar
    $("#changeChart").click(function(){
        if($("#chart").val()=="barChart")
        {
            $("#chartFather").html("");
            $("#chartFather").append(`<canvas class="offset-2" id="donutChart"></canvas>`);
            MakeDoughnutChart(currentCategoryArr, $('#SelectedTimeType input:radio:checked').val());
        }
        else if($("#chart").val()=="donutChart")
        {
            $("#chartFather").html("");
            $("#chartFather").append(`<canvas class="offset-2" id="barChart"></canvas>`);
            MakeBarChart(currentCategoryArr, $('#SelectedTimeType input:radio:checked').val());
        }
    });

});

//struct一個category物件
function structCategory(category, totalPrice)
{
  this.category = category;
  this.totalPrice = totalPrice;
}

function categoryIsPresent(category, categoryArr)
{
    for(var i=0; i<categoryArr.length; i++)
    {
        if(category==categoryArr[i].category)
        {
            return i;
        }
    }
    return (-1);
}

//修改目前搜尋的日期
function changeYearAndDate(isSixMonth, displayDate)
{
    console.log("displayDate="+displayDate);
    if(isSixMonth==1)
    {
        document.getElementById("selectTimeBack").className = "btn col-1 offset-1";
        document.getElementById("YearAndDate").className = "col-8";
        $("#YearAndDate").html("");
        $("#YearAndDate").append(`<b>${displayDate}</b>`);
    }
    else
    {
        document.getElementById("selectTimeBack").className = "btn col-1 offset-2";
        document.getElementById("YearAndDate").className = "col-5 ms-3";
        $("#YearAndDate").html("");
        $("#YearAndDate").append(`<b>${displayDate}</b>`);
    }
    console.log("change year and date end");
}

//下排按鈕重新選擇月
function resetSelectedTimeType()
{
    document.getElementById("SelectedTimeSixMonth").checked=false;
    document.getElementById("SelectedTimeYear").checked=false;
    document.getElementById("SelectedTimeCustom").checked=false;
    document.getElementById("SelectedTimeMonth").checked=true;
}


function DealMonthOutcome(date)
{
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/monthOutcome?date=" + date,
        success: function (allProducts) {
            const categoryArr = [];
            $.each(allProducts, function (i, product) {
                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                if( categoryIndex == (-1) )
                {
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                }
            });
            currentCategoryArr =  categoryArr;
            console.log(currentCategoryArr);
            MakeBarChart(categoryArr, "月支出");
        }
    });
}

function DealMonthIncome(date)
{
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/monthIncome?date=" + date,
        success: function (allProducts) {
            const categoryArr = [];
            $.each(allProducts, function (i, product) {
                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                if( categoryIndex == (-1) )
                {
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                }
            });
            currentCategoryArr =  categoryArr;
            console.log(currentCategoryArr);
            MakeBarChart(categoryArr, "月收入");
        }
    });
}

function DealMonthBalance(month)
{
    console.log("month="+month);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/monthBalance?month=" + month,
        success: function (allProducts) {
            const categoryArr = [];
            $.each(allProducts, function (i, product) {
                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                if( categoryIndex == (-1) )
                {
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                }
            });
            currentCategoryArr =  categoryArr;
            console.log(currentCategoryArr);
            MakeBarChart(categoryArr, "月收入");
        }
    });
}

function DealSixMonthOutcome(dateFrom, dateTo)
{
    console.log("checkSixMonthOutCome"+dateFrom+"  "+dateTo)
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/SixMonthOutcome?dateFrom=" + dateFrom + "&dateTo=" + dateTo,
        success: function (allProducts) {
            const categoryArr = [];
            $.each(allProducts, function (i, product) {
                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                if( categoryIndex == (-1) )
                {
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                }
            });
            currentCategoryArr =  categoryArr;
            console.log(currentCategoryArr);
            MakeBarChart(categoryArr, "六月內支出");
        }
    });
}

function DealSixMonthIncome(dateFrom, dateTo)
{
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/SixMonthIncome?dateFrom=" + dateFrom + "&dateTo=" + dateTo,
        success: function (allProducts) {
            const categoryArr = [];
            $.each(allProducts, function (i, product) {
                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                if( categoryIndex == (-1) )
                {
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                }
            });
            currentCategoryArr =  categoryArr;
            console.log(currentCategoryArr);
            MakeBarChart(categoryArr, "六月內收入");
        }
    });
}

function DealYearOutcome(date)
{
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/YearOutcome?year=" + date,
        success: function (allProducts) {
            const categoryArr = [];
            $.each(allProducts, function (i, product) {
                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                if( categoryIndex == (-1) )
                {
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                }
            });
            currentCategoryArr =  categoryArr;
            console.log(currentCategoryArr);
            MakeBarChart(categoryArr, "月收入");
        }
    });
}

function DealYearIncome(date)
{
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/monthIncome?date=" + date,
        success: function (allProducts) {
            const categoryArr = [];
            $.each(allProducts, function (i, product) {
                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                if( categoryIndex == (-1) )
                {
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                }
            });
            currentCategoryArr =  categoryArr;
            console.log(currentCategoryArr);
            MakeBarChart(categoryArr, "月收入");
        }
    });
}

function MakeBarChart(categoryArr, chartLabelName)
{
    var ctx = document.getElementById('chart').getContext('2d');
    var categoryAsLabels = [];
    var totalPriceAsLabels = [];
    var AllTotalPrice=0;
    for(i=0; i<categoryArr.length; i++)
    {
        categoryAsLabels[i] = categoryArr[i].category;
        totalPriceAsLabels[i] = categoryArr[i].totalPrice;
        AllTotalPrice = AllTotalPrice + categoryArr[i].totalPrice;
    }
    for(i=0; i<categoryArr.length; i++)
    {
        totalPriceAsLabels[i] = Math.floor((totalPriceAsLabels[i]/AllTotalPrice)*100);
    }
    var chart = new Chart(ctx, {
        // 要创建的图表类型
//        plugins: [ChartDataLabels],
        type: 'bar',
        // 数据集
        data: {
            labels: categoryAsLabels,
            datasets: [{
                label: chartLabelName,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: totalPriceAsLabels,
            }]
        },
        // 配置选项
        options: {
            responsive: true,
            maintainAspectRatio: false,
             title: {
               display: false,
               text: 'bar chart'
             },
             scales: {
               // x 軸設置
               xAxes: [{
                 // x 軸標題
                 scaleLabel:{
                   display: false,
                   labelString:"category",
                   fontSize: 16
                 },
                 // x 軸格線
                 gridLines: {
                   display: false
                 }
               }],
               // y 軸設置
               yAxes: [{
                 // y 軸標題
                 scaleLabel:{
                   display: false,
                   labelString:"percent",
                   fontSize: 16
                 },
                 // y 軸格線
                 gridLines: {
                   display: false
                 },
                 // y 軸間距
                 ticks: {
                   beginAtZero: true,
                   min: 0,
                   max: 100,
                   stepSize: 20,
                   callback: function(label, index, labels){
                        return (label) + '%';
                   }
                 }
               }]
             }
        }
    });
}

function MakeDoughnutChart(categoryArr, chartLabelName)
{
    var ctx = document.getElementById('chart').getContext('2d');
    var categoryAsLabels = [];
    var totalPriceAsLabels = [];
    var AllTotalPrice=0;
    for(i=0; i<categoryArr.length; i++)
    {
        categoryAsLabels[i] = categoryArr[i].category;
        totalPriceAsLabels[i] = categoryArr[i].totalPrice;
        AllTotalPrice = AllTotalPrice + categoryArr[i].totalPrice;
    }
    for(i=0; i<categoryArr.length; i++)
    {
        totalPriceAsLabels[i] = Math.floor((totalPriceAsLabels[i]/AllTotalPrice)*100);
    }
    var chart = new Chart(ctx, {
        // 要创建的图表类型
//        plugins: [ChartDataLabels],
        type: 'doughnut',
        // 数据集
        data: {
            labels: categoryAsLabels,
            datasets: [{
                label: chartLabelName,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: totalPriceAsLabels,
            }]
        },
        // 配置选项
        options: {
            responsive: true,
            maintainAspectRatio: false,
             title: {
               display: false,
               text: 'bar chart'
             },
             scales: {
               animation:{
                animateRotate:true
               },
               // x 軸設置
               xAxes: [{
                 // x 軸標題
                 scaleLabel:{
                   display: false,
                   labelString:"category",
                   fontSize: 16
                 },
                 // x 軸格線
                 gridLines: {
                   display: false
                 }
               }],
               // y 軸設置
               yAxes: [{
                 // y 軸標題
                 scaleLabel:{
                   display: false,
                   labelString:"percent",
                   fontSize: 16
                 },
                 // y 軸格線
                 gridLines: {
                   display: false
                 },
                 // y 軸間距
                 ticks: {
                   beginAtZero: true,
                   min: 0,
                   max: 100,
                   stepSize: 20,
                   callback: function(label, index, labels){
                        return (label) + '%';
                   }
                 }
               }]
             }
        }
    });
}