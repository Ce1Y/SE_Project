//import {Chart} from 'chart.js';
//import ChartDataLabels from 'chartjs-plugin-datalabels';
//Chart.register(ChartDataLabels);
var selectedYear;
var selectedMonth;
var selectedDate;
$(document).ready(function(){
    $(function(){
        var today = new Date();
        var todayString = today.toISOString().substr(0, 10);
        selectedYear = todayString.substring(0,4);
        selectedMonth = todayString.substring(5,7);
        selectedDate = todayString.substring(8,10);
        console.log("selectedDate="+selectedDate);
        console.log("selectedMonth="+selectedMonth);
        console.log("todayString="+todayString);
        DealMonthOutcome(todayString);
         var mystr=new String("String");
        $("#YearAndDate").append(`<b>${2022}年${12}月</b>`);


    });
    $("#selectTimeBack").click(function(){
        $("#chartFather").html("");
    });
    $("#selectTimeForward").click(function(){
        $("#chartFather").html("");
    });
    $("#click1").click(function(){
        $("#chartFather").html("");
    });
});
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
            MakeBarChart(categoryArr, "月支出");
            //Income.value="    $"+monthIncome;
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
            //Income.value="    $"+monthIncome;
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