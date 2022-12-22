var currentYear,currentMonth,currentDate;
var selectedYear,selectedMonth,selectedDate;
var currentCategoryArr = []
var moneyIncomeIconArr = new Array("&#128178;", "&#129689;", "&#128176;", "&#128182;", "&#128180;");//💲 🪙 💰 💶 💴
var moneyExpenseIconArr = new Array("&#128184;", "&#128546;", "&#128557;","&#128575;", "&#128565;");//💸 😢 😭 😿 😵
let totalMonthBF =  ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
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
        MakeRowDetails("11");
        $("#YearAndDate").append(`<b>${currentYear}年${currentMonth}月</b>`);
    });
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
    //按下<鍵
    $("#selectTimeBack").click(function(){
        $("#chart").html("");
        var displayDate;
        let selectedMonthWith0 = 0;
        let displayDateFromAjax = "";
        let displayDateToAjax = "";
        console.log("displayDate in <" + displayDate);
        if( $('#SelectedTimeType input:radio:checked').val() == "month")
        {
            if( (selectedMonth-1) == 0 )
            {
                selectedMonth = 12;
                selectedYear = selectedYear-1;
                selectedMonthWith0 = "12";
            }
            else
            {
                selectedMonth = selectedMonth - 1;
                selectedMonthWith0 = totalMonthBF[selectedMonth];
            }
            displayDate = selectedYear + "年" + selectedMonth + "月";
            changeYearAndDate(0,displayDate);
            if($('#analysisType_btn input:radio:checked').val() == "income")
            {
                DealMonthIncome(selectedYear+"-"+selectedMonthWith0);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "expense")
            {
                DealMonthOutcome(selectedYear+"-"+selectedMonthWith0);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "balance")
            {
                DealMonthBalance((selectedYear+"-"+selectedMonthWith0));
            }
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "sixMonth" )
        {
            if( (selectedMonth-1) == 0 )
            {
                selectedMonth = 12;
                selectedYear = selectedYear-1;
                selectedMonthWith0 = "12";
            }
            else
            {
                selectedMonth = selectedMonth - 1;
                selectedMonthWith0 = totalMonthBF[selectedMonth];
            }
            if(selectedMonth<6)
            {
                displayDate =
                    (selectedYear-1) +"年" + (selectedMonth+7) + "月~" + selectedYear + "年" + selectedMonth + "月";
                displayDateFromAjax =
                    (selectedYear-1) +"-" + (totalMonthBF[selectedMonth+7]) ; //in order to print 01 not 1
                displayDateToAjax =
                    selectedYear + "-" + selectedMonthWith0; //in order to print 01 not 1
            }
            else
            {
                displayDate =
                    (selectedYear) +"年" + (selectedMonth-5) + "月~" + selectedYear + "年" + selectedMonth + "月";
                displayDateFromAjax =
                    selectedYear + "-" + (totalMonthBF[selectedMonth-5]) ; //in order to print 01 not 1
                displayDateToAjax =
                    selectedYear + "-" + selectedMonthWith0;
            }
            console.log("sixmonth" + displayDate);
            changeYearAndDate(1,displayDate);
            if($('#analysisType_btn input:radio:checked').val() == "income")
            {
                DealSixMonthIncome(displayDateFromAjax, displayDateToAjax);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "expense")
            {
                DealSixMonthOutcome(displayDateFromAjax, displayDateToAjax);
            }
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "year" )
        {
            selectedYear =selectedYear - 1;
            displayDate = selectedYear + "年";
            changeYearAndDate(0,displayDate);
            if($('#analysisType_btn input:radio:checked').val() == "income")
            {
                DealYearIncome(selectedYear);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "expense")
            {
                DealYearOutcome(selectedYear);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "balance")
            {
                DealYearBalance(selectedYear);
            }
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
        let selectedMonthWith0 = 0;
        let displayDateFromAjax = "";
        let displayDateToAjax = "";
        if( $('#SelectedTimeType input:radio:checked').val() == "month")
        {
            if( (selectedMonth+1) == 13 )
            {
                selectedMonth = 1;
                selectedYear =selectedYear+1;
                selectedMonthWith0 = "01";
            }
            else
            {
                selectedMonth = selectedMonth + 1;
                selectedMonthWith0 = totalMonthBF[selectedMonth];
            }
            displayDate = selectedYear + "年" + selectedMonth + "月";
            changeYearAndDate(0,displayDate);
            if($('#analysisType_btn input:radio:checked').val() == "income")
            {
                DealMonthIncome(selectedYear+"-"+selectedMonthWith0);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "expense")
            {
                DealMonthOutcome(selectedYear+"-"+selectedMonthWith0);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "balance")
            {
                DealMonthBalance(selectedYear+"-"+selectedMonthWith0);
            }

        }
        else if($('#SelectedTimeType input:radio:checked').val() == "sixMonth" )
        {
            if( (selectedMonth+1) == 13 )
            {
                selectedMonth = 1;
                selectedYear =selectedYear+1;
                selectedMonthWith0 = "01";
            }
            else
            {
                selectedMonth = selectedMonth + 1;
                selectedMonthWith0 = totalMonthBF[selectedMonth];
            }
            if(selectedMonth<6)
            {
                displayDate =
                    (selectedYear-1) +"年" + (selectedMonth+7) + "月~" + selectedYear + "年" + selectedMonth + "月";
                displayDateFromAjax =
                    (selectedYear-1) + "-" + (totalMonthBF[selectedMonth+7]) ; //in order to print 01 not 1
                displayDateToAjax =
                    selectedYear + "-" + selectedMonthWith0;
            }
            else
            {
                displayDate =
                    (selectedYear) +"年" + (selectedMonth-5) + "月~" + selectedYear + "年" + selectedMonth + "月";
                displayDateFromAjax =
                    selectedYear + "-" + (totalMonthBF[selectedMonth-5]) ; //in order to print 01 not 1
                displayDateToAjax =
                    selectedYear + "-" + selectedMonthWith0;
            }
            changeYearAndDate(1,displayDate);
            console.log("sixmonth" + displayDate);
            if($('#analysisType_btn input:radio:checked').val() == "income")
            {
                DealSixMonthIncome(displayDateFromAjax, displayDateToAjax);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "expense")
            {
                DealSixMonthOutcome(displayDateFromAjax, displayDateToAjax);
            }
        }
        else if($('#SelectedTimeType input:radio:checked').val() == "year" )
        {
            selectedYear =selectedYear+ 1;
            displayDate = selectedYear + "年";
            changeYearAndDate(0,displayDate);
            if($('#analysisType_btn input:radio:checked').val() == "income")
            {
                DealYearIncome(selectedYear);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "expense")
            {
                DealYearOutcome(selectedYear);
            }
            else if($('#analysisType_btn input:radio:checked').val() == "balance")
            {
                DealYearBalance(selectedYear);
            }
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

        let bar = "&#128202;"
        document.getElementById("changeChart").value = "donutChart";
        $("#changeChart").html("");
        $("#changeChart").append(bar);

        changeYearAndDate(0,displayDate);
        inexResetSelectedTimeType();
        DealMonthOutcome(selectedYear+"-"+selectedMonth);
    });

    //SearchWithIncome
    $("#analysisTypeIncome").on("change",function(){
        selectedYear=currentYear;
        selectedMonth=currentMonth;
        let displayDate = "" + selectedYear + "年" + selectedMonth + "月";

        let bar = "&#128202;"
        document.getElementById("changeChart").value = "donutChart";
        $("#changeChart").html("");
        $("#changeChart").append(bar);

        changeYearAndDate(0,displayDate);
        inexResetSelectedTimeType();
        DealMonthIncome(selectedYear+"-"+selectedMonth);
    });

    //SearchWithBalance
    $("#analysisTypeBalance").on("change",function(){
        selectedYear=currentYear;
        selectedMonth=currentMonth;
        let displayDate = selectedYear + "年";

        document.getElementById("changeChart").value = "lineChart";
        $("#changeChart").html("");

        changeYearAndDate(0,displayDate);
        balanceSelectedTimeType();
        DealYearBalance(selectedYear);
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
            DealMonthIncome(selectedYear+"-"+selectedMonth);
        }
        else if($('#analysisType_btn input:radio:checked').val() == "expense")
        {
            DealMonthOutcome(selectedYear+"-"+selectedMonth);
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
        let selectedMonthWith0 = totalMonthBF[selectedMonth];
        let displayDateFromAjax = "";
        let displayDateToAjax = "";
        msmySelectedTimeType();
        if(selectedMonth<6)
        {
            displayDate = (selectedYear-1) + "年" + (selectedMonth+7).toString() + "月~" +
                selectedYear.toString() + "年" +selectedMonth.toString() + "月";
            displayDateFromAjax =
                (selectedYear-1) + "-" + totalMonthBF[selectedMonth+7] ; //in order to print 01 not 1
            displayDateToAjax =
                selectedYear + "-" + selectedMonthWith0;  //in order to print 01 not 1
        }
        else
        {
            displayDate = selectedYear.toString() + "年" + (selectedMonth-5).toString() + "月~" +
                selectedYear.toString() + "年" + selectedMonth.toString() + "月";
            displayDateFromAjax =
                selectedYear + "-" + totalMonthBF[selectedMonth-5] ; //in order to print 01 not 1
            displayDateToAjax =
                selectedYear + "-" + selectedMonthWith0;  //in order to print 01 not 1
        }
        changeYearAndDate(1,displayDate);
        console.log("sixmonth" + displayDate);
        if($('#analysisType_btn input:radio:checked').val() == "income")
        {
            DealSixMonthIncome(displayDateFromAjax, displayDateToAjax);
        }
        else if($('#analysisType_btn input:radio:checked').val() == "expense")
        {
            DealSixMonthOutcome(displayDateFromAjax, displayDateToAjax);
        }
    });

    //SearchWithYear
    $("#SelectedTimeYear").on("change",function(){
        selectedYear=currentYear;
        selectedMonth=currentMonth;
        let displayDate = selectedYear + "年";
        changeYearAndDate(0,displayDate);
        msmySelectedTimeType();
        if($('#analysisType_btn input:radio:checked').val() == "income")
        {
            DealYearIncome(selectedYear);
        }
        else if($('#analysisType_btn input:radio:checked').val() == "expense")
        {
            DealYearOutcome(selectedYear);
        }
        else if($('#analysisType_btn input:radio:checked').val() == "balance") {
            DealYearBalance(selectedYear);
        }
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
            let yearDiff = customSelectedYearTo - customSelectedYearFrom;
            let monthDiff = customSelectedMonthTo - customSelectedMonthFrom;
            let AllMonthSelected = [];
            let totalMonth =  ["-00", "-01", "-02", "-03", "-04", "-05", "-06", "-07", "-08", "-09", "-10", "-11", "-12"];
            customSelectedTimeType();
            changeYearAndDate(0,displayDate);
            console.log($("#dateStart").val());
            console.log($("#dateEnd").val());
            if(yearDiff==0)
            {
                for(let i=customSelectedMonthFrom; i<=customSelectedMonthTo; i++)
                {
                    AllMonthSelected.push( (customSelectedYearFrom+totalMonth[i]) );
                }
            }
            else
            {
                for(let i=customSelectedYearFrom+1; i<=customSelectedYearTo-1; i++)
                {
                    for(let j=1; j<=12; j++)
                    {
                        AllMonthSelected.push( (i+totalMonth[j]) );
                    }
                }
                for(let i=customSelectedMonthFrom; i<=12; i++)
                {
                    AllMonthSelected.push( (customSelectedYearFrom+totalMonth[i]) );
                }
                for(let i=1; i<=customSelectedMonthTo; i++)
                {
                    AllMonthSelected.push( (customSelectedYearTo+totalMonth[i]) );
                }
            }
            DealCustomOutcomeIncome(AllMonthSelected, customSelectedDayFrom, customSelectedDayTo, customSelectedMonthFrom, customSelectedMonthTo);
        });
    });

    //由bar換成donut or donut to bar
    $("#changeChart").click(function(){
        let donut = "&#11093;";
        let bar = "&#128202;"
        let chartLabelNameFirst = "";
        let chartLabelNameSecond = "";
        $("#changeChart").html("");

        let time = $('#SelectedTimeType input:radio:checked').val();
        let accountingType = $('#analysisType_btn input:radio:checked').val();
        if(time == "month")
            chartLabelNameFirst = "月";
        else if( time == "sixMonth")
            chartLabelNameFirst = "六月內";
        else if( time == "year")
            chartLabelNameFirst = "年";
        else if( time == "custom")
        {
            chartLabelNameFirst = "自訂";
        }
        if(accountingType=="income")
            chartLabelNameSecond = "收入";
        else if(accountingType=="expense")
            chartLabelNameSecond = "支出";
        else if(accountingType=="balance")
        {
            chartLabelNameSecond = "結餘";
        }


        if($("#changeChart").val()=="barChart")
        {
            document.getElementById("changeChart").value = "donutChart";
            $("#changeChart").append(bar);
//            $("#chartFather").append(`<canvas class="offset-2" id="donutChart"></canvas>`);
            MakeDoughnutChart(currentCategoryArr, chartLabelNameFirst+chartLabelNameSecond);
        }
        else if($("#changeChart").val()=="donutChart")
        {
            document.getElementById("changeChart").value ="barChart";
            $("#changeChart").append(donut);
//            $("#chartFather").append(`<canvas class="offset-2" id="barChart"></canvas>`);
            MakeBarChart(currentCategoryArr, chartLabelNameFirst+chartLabelNameSecond);
        }
    });

});

//struct一個category物件
function structCategory(category, totalPrice)
{
    this.category = category;
    this.totalPrice = totalPrice;
}

//struct一個CategoryOfPercent物件 為AllCategory裡的內容物
function structCategoryOfPercent(categoryName, price, accountingType, percent)
{
    this.categoryName = categoryName;
    this.price = price;
    this.accountingType = accountingType;
    this.percent = percent;
}

//struct一個BalanceDayProduct物件
function structBalanceDayProduct(date, dateIncome, dateExpense, AllCategory)
{
    this.date = date;
    this.dateIncome = dateIncome;
    this.dateExpense = dateExpense;
    this.AllCategory = AllCategory;
}

//struct一個BalanceMonthProduct物件
function structBalanceMonthProduct(date, monthIncome, monthExpense, AllBalanceDayProduct)
{
    this.date = date;
    this.monthIncome = monthIncome;
    this.monthExpense = monthExpense;
    this.AllBalanceDayProduct = AllBalanceDayProduct;
}

//category有沒有在categoryArr出現過
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

//date有沒有在balanceProductArr出現過
function dateIsPresent(date, balanceProductArr)
{
    for(let i=0; i<balanceProductArr.length; i++)
    {
        if(date==balanceProductArr[i].date)
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

//選結餘時不顯示文字
function chartLogoToText(incomeTotalPrice,expenseTotalPrice, balanceTotalPrice)
{
    let first = "支出" + incomeTotalPrice;
    let second = "收入" + expenseTotalPrice;
    let third = "結餘" + balanceTotalPrice;
}
//決定要做哪個圖表
function makeWhatChart(categoryArr, categoryLabelName)
{
    if($("#changeChart").val()=="barChart")
    {
        MakeBarChart(categoryArr, categoryLabelName);
    }
    else if($("#changeChart").val()=="donutChart")
    {
        MakeDoughnutChart(categoryArr, categoryLabelName);
    }
    else if($("#changeChart").val()=="lineChart")
    {
        MakeLineChart(categoryArr, categoryLabelName);
    }
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

//回到結餘時下排按鈕重新選擇年 把自訂和6個月搜尋的按鈕設置成不可使用
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
        url: "/monthOutcome?date=" + date,
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

            currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
            makeWhatChart(currentCategoryArr, "月支出");
            MakeRowPercentage(currentCategoryArr);
            MakeRowDetails(currentCategoryArr);
        }
    });
}

function DealMonthIncome(date)
{
    console.log("income date="+date);
    $.ajax({
        type: "GET",
        url: "/monthIncome?date=" + date,
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
            currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
            makeWhatChart(currentCategoryArr, "月收入");
            MakeRowPercentage(currentCategoryArr);
            MakeRowDetails(currentCategoryArr);
            for(let i=0; i<currentCategoryArr.length; i++)
            {
                console.log("category"+ i + currentCategoryArr[i].category + "totalPrice=" + currentCategoryArr[i].totalPrice);
            }
        }
    });
}

function DealMonthBalance(month)
{
    console.log("month="+month);
    $.ajax({
        type: "GET",
        url: "/monthBalance?month=" + month,
        success: function (allBalanceProducts) {
            const BalanceDayProductArr = [];
            $.each(allBalanceProducts, function (i, balanceProduct) {
                let AllCategoryTmp = [];
                $.each(balanceProduct.AllCategory, function (j, cateTmp) {
                    let categoryOfPercentTmp = new structCategoryOfPercent(cateTmp.categoryName, cateTmp.price, cateTmp.accountingType, cateTmp.percent);
                    AllCategoryTmp.push(categoryOfPercentTmp);
                });

                let dateIndex= dateIsPresent(balanceProduct.date, BalanceDayProductArr);
                if( dateIndex == (-1) )
                {
                    BalanceDayProductArr[BalanceDayProductArr.length] =
                        new structBalanceDayProduct(balanceProduct.date, balanceProduct.dateIncome, balanceProduct.dateExpense, AllCategoryTmp);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                }
            });
            currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
            MakeRowPercentage(currentCategoryArr);
            MakeRowDetails(currentCategoryArr);
            makeWhatChart(currentCategoryArr, "月結餘");
            for(let i=0; i<currentCategoryArr.length; i++)
            {
                console.log("category"+ i + currentCategoryArr[i].category + "totalPrice=" + currentCategoryArr[i].totalPrice);
            }

        }
    });
}

function DealSixMonthOutcome(dateFrom, dateTo)
{
    console.log("checksixMonthOutCome"+dateFrom+"  "+dateTo)
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/sixMonthOutcome?dateFrom=" + dateFrom + "&dateTo=" + dateTo,
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
            currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
            makeWhatChart(currentCategoryArr, "六月月支出");
            MakeRowPercentage(currentCategoryArr);
            MakeRowDetails(currentCategoryArr);
            for(let i=0; i<currentCategoryArr.length; i++)
            {
                console.log("category"+ i + currentCategoryArr[i].category + "totalPrice=" + currentCategoryArr[i].totalPrice);
            }
        }
    });
}

function DealSixMonthIncome(dateFrom, dateTo)
{
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/sixMonthIncome?dateFrom=" + dateFrom + "&dateTo=" + dateTo,
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

            currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
            makeWhatChart(currentCategoryArr, "六月內收入");
            MakeRowPercentage(currentCategoryArr);
            MakeRowDetails(currentCategoryArr);
            for(let i=0; i<currentCategoryArr.length; i++)
            {
                console.log("category"+ i + currentCategoryArr[i].category + "totalPrice=" + currentCategoryArr[i].totalPrice);
            }
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
            currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
            MakeRowPercentage(currentCategoryArr);
            MakeRowDetails(currentCategoryArr);
            makeWhatChart(currentCategoryArr, "年支出");
            for(let i=0; i<currentCategoryArr.length; i++)
            {
                console.log("category"+ i + currentCategoryArr[i].category + "totalPrice=" + currentCategoryArr[i].totalPrice);
            }
        }
    });
}

function DealYearIncome(date)
{
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/YearIncome?year=" + date,
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

            currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
            makeWhatChart(currentCategoryArr, "年收入");
            MakeRowPercentage(currentCategoryArr);
            MakeRowDetails(currentCategoryArr)
            for(let i=0; i<currentCategoryArr.length; i++)
            {
                console.log("category"+ i + currentCategoryArr[i].category + "totalPrice=" + currentCategoryArr[i].totalPrice);
            }
        }
    });
}

function DealYearBalance(year)
{
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/yearBalance?year=" + year,
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

            currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
            for(let i=0; i<currentCategoryArr.length; i++)
            {
                console.log("category"+ i + currentCategoryArr[i].category + "totalPrice=" + currentCategoryArr[i].totalPrice);
            }
            makeWhatChart(currentCategoryArr, "年結餘");
        }
    });
}

//選擇custom搜尋income和expense
function DealCustomOutcomeIncome(AllMonthSelected, CustomDateFrom, CustomDateTo, CustomMonthFrom, CustomMonthTo)
{
    const categoryArr = [];
    console.log("MonthFrom="+CustomMonthFrom+"MonthTo="+CustomMonthTo);
    console.log("DateFrom="+CustomDateFrom+"DateTo="+CustomDateTo);
    for(let i=0; i<AllMonthSelected.length; i++)
    {
        console.log("AllMonthSelected this="+AllMonthSelected[i]);
        if($('#analysisType_btn input:radio:checked').val() == "expense")
        {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/monthOutCome?date=" + AllMonthSelected[i],
                success: function (allProducts) {
                    $.each(allProducts, function (i, product) {
                        if(AllMonthSelected[i]==CustomMonthFrom)
                        {
                            if(parseInt(product.date.substring(8.10))>=CustomDateFrom)
                            {
                                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                                if( categoryIndex == (-1) )
                                {
                                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                                }
                                else
                                {
                                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                                }
                            }
                        }
                        else if(AllMonthSelected[i]==CustomMonthTo)
                        {
                            if(parseInt(product.date.substring(8.10))<=CustomDateFrom)
                            {
                                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                                if( categoryIndex == (-1) )
                                {
                                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                                }
                                else
                                {
                                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                                }
                            }
                        }
                        else
                        {
                            let categoryIndex= categoryIsPresent(product.category, categoryArr);
                            if( categoryIndex == (-1) )
                            {
                                categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                            }
                            else
                            {
                                categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                            }
                        }
                    });
                    currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
                    makeWhatChart(currentCategoryArr, "自訂支出");
                    MakeRowPercentage(currentCategoryArr);
                    MakeRowDetails(currentCategoryArr);
                    for(let i=0; i<currentCategoryArr.length; i++)
                    {
                        console.log("category"+ i + currentCategoryArr[i].category + "totalPrice=" + currentCategoryArr[i].totalPrice);
                    }
                }
            });
        }
        else if($('#analysisType_btn input:radio:checked').val() == "income")
        {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/monthInCome?date=" + AllMonthSelected[i],
                success: function (allProducts) {
                    $.each(allProducts, function (i, product) {
                        if(AllMonthSelected[i]==CustomMonthFrom)
                        {
                            if(parseInt(product.date.substring(8.10))>=CustomDateFrom)
                            {
                                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                                if( categoryIndex == (-1) )
                                {
                                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                                }
                                else
                                {
                                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                                }
                            }
                        }
                        else if(AllMonthSelected[i]==CustomMonthTo)
                        {
                            if(parseInt(product.date.substring(8.10))<=CustomDateFrom)
                            {
                                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                                if( categoryIndex == (-1) )
                                {
                                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                                }
                                else
                                {
                                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                                }
                            }
                        }
                        else
                        {
                            let categoryIndex= categoryIsPresent(product.category, categoryArr);
                            if( categoryIndex == (-1) )
                            {
                                categoryArr[categoryArr.length] = new structCategory(product.category, product.price);
                            }
                            else
                            {
                                categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                            }
                        }
                    });
                    currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
                    makeWhatChart(currentCategoryArr, "自訂收入");
                    MakeRowPercentage(currentCategoryArr);
                    MakeRowDetails(currentCategoryArr);
                    for(let i=0; i<currentCategoryArr.length; i++)
                    {
                        console.log("category"+ i + currentCategoryArr[i].category + "totalPrice=" + currentCategoryArr[i].totalPrice);
                    }

                }
            });
        }
    }
}

//用donut圖時 橫向的每個category的percentage
function MakeRowPercentage(categoryArr)
{
    //沒資料不顯示
    if(categoryArr.length==0)
    {
        document.getElementById("makeRowDisappear").style.display = "none";
    }
    else
    {
        document.getElementById("makeRowDisappear").style.display = "block";
    }

    var categoryAsArr = [];
    var totalPriceAsArr = [];
    var totalPricePercentageAsArr = [];
    var AllTotalPrice=0;
    $("#percentageDetailsRow").html("");
    for(i=0; i<categoryArr.length; i++)
    {
        categoryAsArr[i] = categoryArr[i].category;
        totalPriceAsArr[i] = categoryArr[i].totalPrice;
        AllTotalPrice = AllTotalPrice + categoryArr[i].totalPrice;
//        console.log("totalPriceAsArr"+i+"="+totalPriceAsArr[i]);
//        console.log("categoryAsArr"+i+"="+categoryAsArr[i]);
    }
    for(i=0; i<categoryArr.length; i++)
    {
        totalPricePercentageAsArr.push(Math.round((totalPriceAsArr[i]/AllTotalPrice)*1000)/10) ;
//        console.log("totalPricePercentageAsArr"+i+"="+totalPricePercentageAsArr[i]);
//        console.log("number="+(totalPriceAsArr[i]/AllTotalPrice)*100);

    }
    let categoryColors = ColorInChart.slice(0,categoryAsArr.length);
    console.log("categoryArr="+categoryArr);

    for(i=0; i<categoryArr.length; i=i+3)
    {
        var demoRow = "";
//        console.log("i="+i+"category length="+categoryArr.length);
        if(categoryArr.length-i>2)
        {
            let color1 = categoryColors[i];
            let color2 = categoryColors[i+1];
            let color3 = categoryColors[i+2];
            if(i==0)
            {
                demoRow =
                    `
                <div class="col-6 ps-4 ">
                    <div class="row ps-2" style="font-size:14px">
                        <div class="col-1 my-1 " style="width: 3px; height: 13px; background-color: ${color1}"></div>
                        <div class="col-6" >${categoryAsArr[i]}</div>
                        <div class="col-2" style="text-align: right">${totalPricePercentageAsArr[i]}%</div>
                    </div>
                    <div class="row ps-2" style="font-size:14px">
                        <div class="col-1 my-1" style="width: 3px; height: 13px; background-color: ${color2}"></div>
                         <div class="col-6">${categoryAsArr[i+1]}</div>
                         <div class="col-2 " style="text-align: right">${totalPricePercentageAsArr[i+1]}%</div>
                    </div>
                    <div class="row ps-2" style="font-size:14px">
                        <div class="col-1 my-1" style="width: 3px; height: 13px; background-color: ${color3}"></div>
                        <div class="col-6">${categoryAsArr[i+2]}</div>
                        <div class="col-2" style="text-align: right">${totalPricePercentageAsArr[i+2]}%</div>
                    </div>
                </div>
                `;
            }
            else
            {
                demoRow =
                    `
                <div class="col-6">
                    <div class="row " style="font-size:14px">
                        <div class="col-1 my-1 " style="width: 3px; height: 13px; background-color: ${color1}"></div>
                        <div class="col-6">${categoryAsArr[i]}</div>
                        <div class="col-2" style="text-align: right;">${totalPricePercentageAsArr[i]}%</div>
                    </div>
                    <div class="row" style="font-size:14px">
                        <div class="col-1 my-1" style="width: 3px; height: 13px; background-color: ${color2}"></div>
                         <div class="col-6">${categoryAsArr[i+1]}</div>
                         <div class="col-2" style="text-align: right;">${totalPricePercentageAsArr[i+1]}%</div>
                    </div>
                    <div class="row " style="font-size:14px">
                        <div class="col-1 my-1" style="width: 3px; height: 13px; background-color: ${color3}"></div>
                        <div class="col-6">${categoryAsArr[i+2]}</div>
                        <div class="col-2" style="text-align: right;">${totalPricePercentageAsArr[i+2]}%</div>
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
                <div class="col-6 ps-4" style="font-size:14px">
                    <div class="row ps-2 ">
                        <div class="col-1 my-1" style="width: 3px; height: 13px; background-color: ${color1}"></div>
                        <div class="col-6">${categoryAsArr[i]}</div>
                        <div class="col-2" style="text-align: right;">${totalPricePercentageAsArr[i]}%</div>
                    </div>
                    <div class="row ps-2" style="font-size:14px">
                        <div class="col-1 my-1" style="width: 3px; height: 13px; background-color: ${color2}"></div>
                         <div class="col-6">${categoryAsArr[i+1]}</div>
                         <div class="col-2" style="text-align: right;">${totalPricePercentageAsArr[i+1]}%</div>
                    </div>
                </div>
                `;
            }
            else
            {
                demoRow =
                    `
                <div class="col-6">
                    <div class="row " style="font-size:14px">
                        <div class="col-1 my-1" style="width: 3px; height: 13px; background-color: ${color1}"></div>
                        <div class="col-6">${categoryAsArr[i]}</div>
                        <div class="col-2" style="text-align: right;">${totalPricePercentageAsArr[i]}%</div>
                    </div>
                    <div class="row" style="font-size:14px">
                        <div class="col-1 my-1" style="width: 3px; height: 13px; background-color: ${color2}"></div>
                         <div class="col-6">${categoryAsArr[i+1]}</div>
                         <div class="col-2" style="text-align: right;">${totalPricePercentageAsArr[i+1]}%</div>
                    </div>
                </div>
                `;
            }
            $("#percentageDetailsRow").append(demoRow);
            break;
        }
        else
        {
            let color1 = categoryColors[i];
            if(i==0)
            {
                demoRow =
                    `
                <div class="col-6 ps-4 " style="font-size:14px">
                    <div class="row ps-2 ">
                        <div class="col-1 my-1" style="width: 3px; height: 13px; background-color: ${color1}"></div>
                        <div class="col-6">${categoryAsArr[i]}</div>
                        <div class="col-2" style="text-align: right;">${totalPricePercentageAsArr[i]}%</div>
                    </div>
                </div>
                `;
            }
            else
            {
                demoRow =
                    `
                <div class="col-6">
                    <div class="row " style="font-size:14px">
                        <div class="col-1 my-1" style="width: 3px; height: 13px; background-color: ${color1}"></div>
                        <div class="col-6">${categoryAsArr[i]}</div>
                        <div class="col-2" style="text-align: right;">${totalPricePercentageAsArr[i]}%</div>
                    </div>
                </div>
                `;
            }
            $("#percentageDetailsRow").append(demoRow);
            break;
        }
        $("#percentageDetailsRow").append(demoRow);
    }
}
//支出 收入明細
function MakeRowDetails(categoryArr)
{
    //沒資料不顯示
    if(categoryArr.length==0)
    {
        document.getElementById("makeTableDisappear").style.display = "none";
    }
    else
    {
        document.getElementById("makeTableDisappear").style.display = "block";
    }

    var categoryAsArr = [];
    var totalPriceAsArr = [];
    var cateLogo = "";
    var demoDetails;
    for(i=0; i<categoryArr.length; i++)
    {
        categoryAsArr[i] = categoryArr[i].category;
        totalPriceAsArr[i] = categoryArr[i].totalPrice;
    }
    for(let i=0; i<categoryArr.length; i++)
    {
        if($('#analysisType_btn input:radio:checked').val() == "income")
        {
            if(i==0)
            {
                let firstDetails =
                    `
                <tr >
                    <td width="10%"></td>
                    <th width="50%"> 收入明細</th>
                    <td width="20%" ></td> <!-- fs-4 -->
                    <td width="20%" style="text-align: right;">&#8691;</td>
                </tr>
                `;
                $("#ExInDetails").html("");
                $("#ExInDetails").append(firstDetails);
            }
            if(totalPriceAsArr[i]<=100)
                cateLogo = moneyIncomeIconArr[0];
            else if(totalPriceAsArr[i]<=200)
                cateLogo = moneyIncomeIconArr[1];
            else if(totalPriceAsArr[i]<=500)
                cateLogo = moneyIncomeIconArr[2];
            else if(totalPriceAsArr[i]<=1000)
                cateLogo = moneyIncomeIconArr[3];
            else
            {
                cateLogo = moneyIncomeIconArr[4];
            }
            demoDetails =
                `
            <tr style="border: 1px solid gray">
                <th  style="text-align: right;">${cateLogo}</th>
                <td >${categoryAsArr[i]}</td>
                <td ></td>
                <td >${totalPriceAsArr[i]}</td>
            </tr>
            `;

        }
        else if($('#analysisType_btn input:radio:checked').val() == "expense")
        {
            if(i==0)
            {
                let firstDetails =
                    `
                <tr >
                    <td width="10%"></td>
                    <th width="50%"> 支出明細</th>
                    <td width="20%" ></td> <!-- fs-4 -->
                    <td width="20%" style="text-align: right;">&#8691;</td>
                </tr>
                `;
                $("#ExInDetails").html("");
                $("#ExInDetails").append(firstDetails);
            }
            if(totalPriceAsArr[i]<=100)
                cateLogo = moneyExpenseIconArr[0];
            else if(totalPriceAsArr[i]<=200)
                cateLogo = moneyExpenseIconArr[1];
            else if(totalPriceAsArr[i]<=500)
                cateLogo = moneyExpenseIconArr[2];
            else if(totalPriceAsArr[i]<=1000)
                cateLogo = moneyExpenseIconArr[3];
            else
            {
                cateLogo = moneyExpenseIconArr[4];
            }

            demoDetails =
                `
            <tr style="border: 1px solid gray">
                <th  style="text-align: right;">${cateLogo}</th>
                <td >${categoryAsArr[i]}</td>
                <td ></td>
                <td >${totalPriceAsArr[i]}</td>
            </tr>
            `;
        }
        else
        {

        }
        $("#ExInDetails").append(demoDetails);
    }
}

function MakeBarChart(categoryArr, chartLabelName)
{
    //沒資料不顯示
    if(categoryArr.length==0)
    {
        document.getElementById("changeChart").style.display = "none";
        document.getElementById("chart").style.display = "none";
    }
    else
    {
        document.getElementById("changeChart").style.display = "block";
        document.getElementById("chart").style.display = "block";
    }

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
    let categoryColors = ColorInChart.slice(0,categoryArr.length) ;
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
    //沒資料不顯示
    if(categoryArr.length==0)
    {
        document.getElementById("changeChart").style.display = "none";
        document.getElementById("chart").style.display = "none";
    }
    else
    {
        document.getElementById("changeChart").style.display = "block";
        document.getElementById("chart").style.display = "block";
    }

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

//function MakeLineChart(categoryArr, chartLabelName)
//{
//    //沒資料不顯示
//    if(categoryArr.length==0)
//    {
//        document.getElementById("changeChart").style.display = "none";
//        document.getElementById("chart").style.display = "none";
//    }
//    else
//    {
//        document.getElementById("changeChart").style.display = "block";
//        document.getElementById("chart").style.display = "block";
//    }
//    var ctx = document.getElementById('chart').getContext('2d');
//    var categoryAsLabels = [];
//    var totalPriceAsLabels = [];
//    var AllTotalPrice=0;
//    for(i=0; i<categoryArr.length; i++)
//    {
//        categoryAsLabels[i] = categoryArr[i].category;
//        totalPriceAsLabels[i] = categoryArr[i].totalPrice;
//        AllTotalPrice = AllTotalPrice + categoryArr[i].totalPrice;
//    }
//    for(i=0; i<categoryArr.length; i++)
//    {
//        totalPriceAsLabels[i] = Math.floor((totalPriceAsLabels[i]/AllTotalP
//    }
//    let categoryColors = ColorInChart.slice(0,categoryAsLabels.length);
//    let categoryColorsBorder = ColorInChart.slice(0,categoryAsLabels.leng
//    let chartTItle = "總金額: " + AllTotalPrice;
//    console.log("categoryColors="+categoryColors);
//    console.log("totalPriceAsLabels"+totalPriceAsLabels);
//    console.log("categoryAsLabels="+categoryAsLabels);
//    var chart = new Chart(ctx, {
//        // 要创建的图表类型
//        plugins: [ChartDataLabels],
//        type: 'line',
//        // 数据集
//        data: {
//            datasets: [{
//                label: "123",
//                backgroundColor: categoryColors,
//                borderColor: "#4F4F4F",
//                data: totalPriceAsLabels
//            },
//                {
//                    label: "123",
//                    backgroundColor: categoryColors,
//                    borderColor: "#4F4F4F",
//                    data: totalPriceAsLabels
//                }]
//        },
//        // 配置选项
//        options: {
//            responsive: true,
//            maintainAspectRatio: false,
//            title: {
//                display: true,
//                text: chartTItle
//            },
//            scales: {
//                animation:{
//                    animateRotate:true
//                },
//                // x 軸設置
//                xAxes: [{
//                    // x 軸標題
//                    scaleLabel:{
//                        display: false,
//                        labelString:"category",
//                        fontSize: 16
//                    },
//                    // x 軸格線
//                    gridLines: {
//                        display: false
//                    },
//                    // x 軸間距
//                    ticks: {
//                        display: false,
//                    }
//                }],
//                // y 軸設置
//                yAxes: [{
//                    // y 軸標題
//                    scaleLabel:{
//                        display: false,
//                        labelString:"percent",
//                        fontSize: 16
//                    },
//                    // y 軸格線
//                    gridLines: {
//                        display: false
//                    },
//                    // y 軸間距
//                    ticks: {
//                        display: false,
//                        beginAtZero: true,
//                        min: 0,
//                        max: 100,
//                        stepSize: 20,
//                        callback: function(label, index, labels){
//                            return (label) + '%';
//                        }
//                    }
//                }]
//            }
//        }
//    });
//    var config = {
//        type: 'line',
//        data: {
//            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//            datasets: [{
//                label: 'My First dataset',
//                backgroundColor: window.chartColors.red,
//                borderColor: window.chartColors.red,
//                data: [10, 30, 39, 20, 25, 34, -10],
//                fill: false,
//            }, {
//                label: 'My Second dataset',
//                fill: false,
//                backgroundColor: window.chartColors.blue,
//                borderColor: window.chartColors.blue,
//                data: [18, 33, 22, 19, 11, 39, 30],
//            }]
//        },
//        options: {
//            responsive: true,
//            title: {
//                display: true,
//                text: 'Grid Line Settings'
//            },
//            scales: {
//                yAxes: [{
//                    gridLines: {
//                        drawBorder: false,
//                        color: ['pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']
//                    },
//                    ticks: {
//                        min: 0,
//                        max: 100,
//                        stepSize: 10
//                    }
//                }]
//            }
//        }
//    };
//}