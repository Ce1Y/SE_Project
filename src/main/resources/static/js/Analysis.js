var selectedYear;
var selectedMonth;
var selectedDate;
var selectedSixMonth
var currentCategoryArr = []
$(document).ready(function(){
    $(function(){
        var today = new Date();
        var todayString = today.toISOString().substr(0, 10 );
        selectedYear = parseInt( todayString.substring(0,4) );
        selectedMonth = parseInt( todayString.substring(5,7) );
        selectedDate = parseInt( todayString.substring(8,10) );
        selectedSixMonth = parseInt( selectedMonth );
        DealMonthOutcome(todayString);
        $("#YearAndDate").append(`<b>${selectedYear}年${selectedMonth}月</b>`);
    });

    //按下>鍵
    $("#selectTimeBack").click(function(){
        $("#chartFather").html("");
        $("#YearAndDate").html("");
        if( $('#SelectedTimeType input:radio:checked').val() == "month")
        {
            if( (selectedMonth-1) == 0 )
            {
                selectedMonth = 12;
                selectedYear =selectedYear-1;
            }
            else
            {
                selectedMonth =selectedMonth- 1;
            }
            $("#YearAndDate").append(`<b>${selectedYear}年${selectedMonth}月</b>`);
            console.log($('#SelectedTimeType input:radio:checked').val());
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "sixMonth" ){
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
                $("#YearAndDate").append(`<b>${selectedYear-1}年${selectedMonth+7}月~${selectedYear}年${selectedMonth}月</b>`);
            }
            else
            {
                $("#YearAndDate").append(`<b>${selectedYear}年${selectedMonth-5}月~${selectedYear}年${selectedMonth}月</b>`);
            }
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "year" )
        {
            selectedYear = selectedYear - 1;
            $("#YearAndDate").append(`<b>${selectedYear}年</b>`);
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "custom" )
        {

        }
    });

    //按下<鍵
    $("#selectTimeForward").click(function(){
        $("#chartFather").html("");
        $("#YearAndDate").html("");
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
            $("#YearAndDate").append(`<b>${selectedYear}年${selectedMonth}月</b>`);
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
                $("#YearAndDate").append(`<b>${selectedYear-1}年${selectedMonth+7}月~${selectedYear}年${selectedMonth}月</b>`);
            }
            else
            {
                $("#YearAndDate").append(`<b>${selectedYear}年${selectedMonth-5}月~${selectedYear}年${selectedMonth}月</b>`);
            }
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "year" )
        {
            selectedYear =selectedYear+ 1;
            $("#YearAndDate").append(`<b>${selectedYear}年</b>`);
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "custom" )
        {

        }
    });

    //SearchWithExpense
    $("#analysisTypeExpense").on("change",function(){
         $("#chartFather").html("");
         let displayDate = "" + selectedYear + "年" + selectedMonth + "月";
         changeYearAndDate(0,displayDate);
    });

    //SearchWithIncome
    $("#analysisTypeIncome").on("change",function(){
         $("#chartFather").html("");
         let displayDate = "" + selectedYear + "年" + selectedMonth + "月";
         changeYearAndDate(0,displayDate);
    });

    //SearchWithBalance
    $("#analysisTypeBalance").on("change",function(){
         $("#chartFather").html("");
         let displayDate = selectedYear + "年";
         changeYearAndDate(0,displayDate);
    });

    //SearchWithMonth
    $("#SelectedTimeMonth").on("change",function(){
         $("#chartFather").html("");
         let displayDate = selectedYear + "年" + selectedMonth + "月";
         changeYearAndDate(0,displayDate);
    });

    //SearchWithSixMonth
    $("#SelectedTimeSixMonth").on("change",function(){
         $("#chartFather").html("");
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
    });

    //SearchWithYear
    $("#SelectedTimeYear").on("change",function(){
         $("#chartFather").html("");
         let displayDate = selectedYear + "年";
         changeYearAndDate(0,displayDate);
    });

    //SearchWithCustom
    $("#SelectedTimeCustom").on("change",function(){
         $("#chartFather").html("");
    });

    //由bar換成donut
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

//修改目前搜尋的日期
function changeYearAndDate(isNotSixMonth, displayDate)
{
    $("#SelectSearchTime").html("");
    if(isNotSixMonth==1)
    {
        let insertIn =
        `
            <button type="button" class="btn col-1" id="selectTimeBack">
                &#9668;
            </button>
            <span class="col-8 ms-6" style="text-align: center; display:block;" id="YearAndDate"><b>
            ${displayDate}
            </b></span>
            <button type="button" class="btn col-1" id="selectTimeForward">
                &#9658;
            </button>
        `;
        $("#SelectSearchTime").append(insertIn);
    }
    else
    {
        let insertIn =
        `
        <button type="button" class="btn col-1 offset-2" id="selectTimeBack">
            &#9668;
        </button>
        <span class="col-5 ms-3" style="text-align: center; display:block;" id="YearAndDate"><b>
        ${displayDate}
        </b></span>
        <button type="button" class="btn col-1" id="selectTimeForward">
            &#9658;
        </button>
        `;

        $("#SelectSearchTime").append(insertIn);
    }
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
            MakeDoughnutChart(categoryArr, "月收入");
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
            MakeBarChart(categoryArr, "月收入");
        }
    });
}

function resetSelectedTimeType()
{
    let insertIn =
    `
    <input type="radio" class="btn-check" name="btnradioSecond" value="month" id="SelectedTimeMonth" autocomplete="off" checked>
    <label class="btn btn-outline-warning col-3"  for="SelectedTimeMonth">月</label>

    <input type="radio" class="btn-check" name="btnradioSecond" value="sixMonth" id="SelectedTimeSixMonth" autocomplete="off">
    <label class="btn btn-outline-warning col-3"  for="SelectedTimeSixMonth">近六個月</label>

    <input type="radio" class="btn-check" name="btnradioSecond" value="year" id="SelectedTimeYear" autocomplete="off">
    <label class="btn btn-outline-warning col-3"  for="SelectedTimeYear">年</label>

    <input type="radio" class="btn-check" name="btnradioSecond" value="custom" id="SelectedTimeCustom" autocomplete="off">
    <label class="btn btn-outline-warning col-3"  for="SelectedTimeCustom">自訂</label>
    `;
    $("#SelectedTimeType").html("");
    $("#SelectedTimeType").append(insertIn);
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