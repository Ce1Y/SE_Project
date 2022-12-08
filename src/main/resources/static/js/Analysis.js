//import {Chart} from 'chart.js';
//import ChartDataLabels from 'chartjs-plugin-datalabels';
//Chart.register(ChartDataLabels);
$(document).ready(function(){
    $(function(){
        var today = new Date();
        var todayString = today.toISOString().substr(0, 10);
        console.log(todayString);
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/monthIncome?date=" + "2022-11-26",
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
                makeChart(categoryArr, "月支出");
//                Income.value="    $"+monthIncome;
            }
        });

//        $.ajax({
//            type: "GET",
//            url: "http://localhost:8080/monthOutcome?date=" + todayString,
//            success: function (allProducts) {
//                $.each(allProducts, function (i, product) {
//                    monthOutcome = monthOutcome + product.price;
//                });
//                var outcome = document.querySelector('#monthOutcomeText');
//                outcome.value="  $"+monthOutcome;
//        }
//        });
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
function makeChart(categoryArr, chartLabelName)
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
        plugins: [ChartDataLabels],
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