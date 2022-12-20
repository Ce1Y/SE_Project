var currentYear,currentMonth,currentDate;
var selectedYear,selectedMonth,selectedDate;
var currentCategoryArr = []
var moneyIncomeIconArr = new Array("&#128178;", "&#129689;", "&#128176;", "&#128182;", "&#128180;");//💲 🪙 💰 💶 💴
var moneyExpenseIconArr = new Array("&#128184;", "&#128546;", "&#128557;","&#128575;", "&#128565;");//💸 😢 😭 😿 😵
//var ColorInChart = new Array
//                    ("#FF2D2D","#F9F900","#FF9224","#3D7878","#02DF82","#D9006C","#743A3A",
//                    "#408080","#548C00","#005AB5","#4D0000","#3A006F","#FFFF37","#FF8000");
var ColorInChart = new Array
                    ('rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)',
                    'rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)',"#C48888", "#B9B973",
                    "#8CEA00", "#4A4AFF", "#CE0000");


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
        $("#chart").html("");
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
        $("#chart").html("");
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
         inexResetSelectedTimeType();
    });

    //SearchWithIncome
    $("#analysisTypeIncome").on("change",function(){
         selectedYear=currentYear;
         selectedMonth=currentMonth;
         let displayDate = "" + selectedYear + "年" + selectedMonth + "月";
         changeYearAndDate(0,displayDate);
         inexResetSelectedTimeType();
    });

    //SearchWithBalance
    $("#analysisTypeBalance").on("change",function(){
         selectedYear=currentYear;
         selectedMonth=currentMonth;
         let displayDate = selectedYear + "年";
         changeYearAndDate(0,displayDate);
         balanceSelectedTimeType();
    });

    //SearchWithMonth
    $("#SelectedTimeMonth").on("change",function(){
         selectedYear=currentYear;
         selectedMonth=currentMonth;
         let displayDate = selectedYear + "年" + selectedMonth + "月";
         changeYearAndDate(0,displayDate);
         msmySelectedTimeType();
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
         msmySelectedTimeType();
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
         msmySelectedTimeType();
         DealYearOutcome(selectedYear);
    });

    //SearchWithCustom
    $("#SelectedTimeCustom").on("change",function(){
         $("#CustomCheckBtn").click(function(){
            console.log("selecetedDateEnd TExt")
            let customSelectedYearFrom = parseInt( $("#dateStart").val().substring(0,4) );
            let customSelectedMonthFrom = parseInt( $("#dateStart").val().substring(5,7) );
            let customSelectedDayFrom = parseInt( $("#dateStart").val().substring(8,10) );
            let customSelectedYearTo = parseInt( $("#dateEnd").val().substring(0,4) );
            let customSelectedMonthTo = parseInt( $("#dateEnd").val().substring(5,7) );
            let customSelectedDayTo = parseInt( $("#dateStart").val().substring(8,10) );
            let displayDate = $("#dateStart").val() + "  ~  " + $("#dateEnd").val();
            customSelectedTimeType();
            changeYearAndDate(0,displayDate);
            console.log($("#dateStart").val());
            console.log($("#dateEnd").val());
         });

    });

    //由bar換成donut or donut to bar
    $("#changeChart").click(function(){
        let donut = "&#11093;";
        let bar = "&#128202;"

        $("#changeChart").html("");
        if($("#changeChart").val()=="barChart")
        {
            document.getElementById("changeChart").value = "donutChart";
            $("#changeChart").append(bar);
//            $("#chartFather").append(`<canvas class="offset-2" id="donutChart"></canvas>`);
            MakeDoughnutChart(currentCategoryArr, $('#SelectedTimeType input:radio:checked').val());
        }
        else
        {
            document.getElementById("changeChart").value ="barChart";
            $("#changeChart").append(donut);
//            $("#chartFather").append(`<canvas class="offset-2" id="barChart"></canvas>`);
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

//回到支出or收如時下排按鈕重新選擇月 再把往前搜尋和往後搜尋的按鈕恢復成可使用
function inexResetSelectedTimeType()
{
    document.getElementById("SelectedTimeSixMonth").disabled=false;
    document.getElementById("SelectedTimeCustom").disabled=false;

    document.getElementById("selectTimeBack").disabled=false;
    document.getElementById("selectTimeForward").disabled=false;

    document.getElementById("SelectedTimeSixMonth").checked=false;
    document.getElementById("SelectedTimeYear").checked=false;
    document.getElementById("SelectedTimeCustom").checked=false;
    document.getElementById("SelectedTimeMonth").checked=true;
}

//回到結餘時下排按鈕重新選擇年 把網自訂和6個月搜尋的按鈕設置成不可使用
function balanceSelectedTimeType()
{
    document.getElementById("SelectedTimeSixMonth").disabled=true;
    document.getElementById("SelectedTimeCustom").disabled=true;

    document.getElementById("SelectedTimeSixMonth").checked=false;
    document.getElementById("SelectedTimeCustom").checked=false;
    document.getElementById("SelectedTimeMonth").checked=false;
    document.getElementById("SelectedTimeYear").checked=true;
}

//使用自訂時 把往前搜尋和往後搜尋的按鈕設置成不可使用
function customSelectedTimeType()
{
    document.getElementById("selectTimeBack").disabled=true;
    document.getElementById("selectTimeForward").disabled=true;

    document.getElementById("SelectedTimeSixMonth").checked=false;
    document.getElementById("SelectedTimeMonth").checked=false;
    document.getElementById("SelectedTimeYear").checked=false;
    document.getElementById("SelectedTimeCustom").checked=true;
}

//使用月or六個月or年時 把按鈕enable
function msmySelectedTimeType()
{
    if($('#analysisType_btn input:radio:checked').val() == "balance")
    {
        document.getElementById("selectTimeBack").disabled=false;
        document.getElementById("selectTimeForward").disabled=false;
    }
    else
    {
        document.getElementById("selectTimeBack").disabled=false;
        document.getElementById("selectTimeForward").disabled=false;
        document.getElementById("SelectedTimeSixMonth").disabled=false;
        document.getElementById("SelectedTimeCustom").disabled=false;
    }

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
            MakeRowPercentage(categoryArr);
            MakeRowDetails(categoryArr);
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

function MakeRowPercentage(categoryArr)
{
    var categoryAsArr = [];
    var totalPriceAsArr = [];
    var totalPricePercentageAsArr = [];
    var AllTotalPrice=0;
    for(i=0; i<categoryArr.length; i++)
    {
        categoryAsLabels[i] = categoryArr[i].category;
        totalPriceAsLabels[i] = categoryArr[i].totalPrice;
        AllTotalPrice = AllTotalPrice + categoryArr[i].totalPrice;
    }
    for(i=0; i<categoryArr.length; i++)
    {
        totalPricePercentageAsArr = Math.floor((totalPriceAsArr[i]/AllTotalPrice)*100);
    }
    let categoryColors = ColorInChart.slice(0,categoryAsLabels.length);
    console.log("categoryArr="+categoryArr);

    for(i=0; i<categoryArr.length; i=i+3)
    {
        var demoRow = "";
        if(categoryArr.length-i>2)
        {
            let color1 = categoryColors[i];
            let color2 = categoryColors[i+1];
            let color3 = categoryColors[i+2];
            if(i==0)
            {
                demoRow =
                `
                <div class="col-6 ps-4">
                    <div class="row ps-2">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color1}"></div>
                        <div class="col-1">${categoryAsArr[i]}</div>
                        <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i]}</div>
                    </div>
                    <div class="row ps-2">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color2}"></div>
                         <div class="col-1">${categoryAsArr[i+1]}</div>
                         <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i+1]}</div>
                    </div>
                    <div class="row ps-2">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color3}"></div>
                        <div class="col-1">${categoryAsArr[i+2]}</div>
                        <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i+2]}</div>
                    </div>
                </div>
                `;
            }
            else
            {
                demoRow =
                `
                <div class="col-6">
                    <div class="row">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color1}"></div>
                        <div class="col-1">${categoryAsArr[i]}</div>
                        <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i]}</div>
                    </div>
                    <div class="row">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color2}"></div>
                         <div class="col-1">${categoryAsArr[i+1]}</div>
                         <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i+1]}</div>
                    </div>
                    <div class="row ">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color3}"></div>
                        <div class="col-1">${categoryAsArr[i+2]}</div>
                        <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i+2]}</div>
                    </div>
                </div>
                `;
            }
        }
        else if(categoryArr.length-i>1)
        {
            let color1 = categoryColors[i];
            let color2 = categoryColors[i+1];
            if(i==0)
            {
                demoRow =
                `
                <div class="col-6 ps-4">
                    <div class="row ps-2">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color1}"></div>
                        <div class="col-1">${categoryAsArr[i]}</div>
                        <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i]}</div>
                    </div>
                    <div class="row ps-2">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color2}"></div>
                         <div class="col-1">${categoryAsArr[i+1]}</div>
                         <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i+1]}</div>
                    </div>
                </div>
                `;
            }
            else
            {
                demoRow =
                `
                <div class="col-6">
                    <div class="row">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color1}"></div>
                        <div class="col-1">${categoryAsArr[i]}</div>
                        <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i]}</div>
                    </div>
                    <div class="row">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color2}"></div>
                         <div class="col-1">${categoryAsArr[i+1]}</div>
                         <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i+1]}</div>
                    </div>
                </div>
                `;
            }
            break;
        }
        else
        {
            let color1 = categoryColors[i];
            if(i==0)
            {
                demoRow =
                `
                <div class="col-6 ps-4">
                    <div class="row ps-2">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color1}"></div>
                        <div class="col-1">${categoryAsArr[i]}</div>
                        <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i]}</div>
                    </div>
                </div>
                `;
            }
            else
            {
                demoRow =
                `
                <div class="col-6">
                    <div class="row">
                        <div class="col-1 my-1" style="width: 10px; height: 18px; background-color: ${color1}"></div>
                        <div class="col-1">${categoryAsArr[i]}</div>
                        <div class="col-7" style="text-align: right;">${totalPricePercentageAsArr[i]}</div>
                    </div>
                </div>
                `;
            }
            break;
        }
        $("#percentageDetailsRow").html("");
        $("#percentageDetailsRow").append(demoRow);

    }
}

function MakeRowDetails(categoryArr)
{
    var categoryAsArr = [];
    var totalPriceAsArr = [];
    var totalPricePercentageAsArr = [];
    var AllTotalPrice=0;
    for(i=0; i<categoryArr.length; i++)
    {
        categoryAsLabels[i] = categoryArr[i].category;
        totalPriceAsLabels[i] = categoryArr[i].totalPrice;
        AllTotalPrice = AllTotalPrice + categoryArr[i].totalPrice;
    }
    for(i=0; i<categoryArr.length; i++)
    {
        totalPricePercentageAsArr = Math.floor((totalPriceAsArr[i]/AllTotalPrice)*100);
    }
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
    let categoryColors = ColorInChart.slice(0,categoryAsLabels.length) ;
//    let categoryColorsBorder = ColorInChart.slice(0,categoryAsLabels.length);
    var chart = new Chart(ctx, {
        // 要创建的图表类型
//        plugins: [ChartDataLabels],
        type: 'bar',
        // 数据集
        data: {
            labels: categoryAsLabels, //最下面 x軸的label
            datasets: [{
                backgroundColor: categoryColors, //填滿每一個bar的顏色
                borderColor: "#4F4F4F",         //每一個bar的顏色的外框
                data: totalPriceAsLabels,        //每一個bar的資料(長度)
                label: chartLabelName              //最上面的標題
            }]
        },

        // 配置选项
        options: {
            responsive: true,
            maintainAspectRatio: false,
             title: {
               display: false,
               text: chartLabelName
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
    let categoryColors = ColorInChart.slice(0,categoryAsLabels.length);
//    let categoryColorsBorder = ColorInChart.slice(0,categoryAsLabels.length);
    let chartTItle = "總金額: " + AllTotalPrice;
    console.log("categoryColors="+categoryColors);
    console.log("totalPriceAsLabels"+totalPriceAsLabels);
    console.log("categoryAsLabels="+categoryAsLabels);
    var chart = new Chart(ctx, {
        // 要创建的图表类型
//        plugins: [ChartDataLabels],
        type: 'doughnut',

        // 数据集
        data: {

            datasets: [{
                label: "123",
                backgroundColor: categoryColors,
                borderColor: "#4F4F4F",
                data: totalPriceAsLabels
            }],

        },
        // 配置选项
        options: {
            responsive: true,
            maintainAspectRatio: false,
             title: {
               display: true,
               text: chartTItle
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
                 },
                 // x 軸間距
                 ticks: {
                   display: false,

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
                   display: false,
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