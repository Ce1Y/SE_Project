var currentYear,currentMonth,currentDate;
var selectedYear,selectedMonth,selectedDate;
var currentCategoryArr = [];
var currentBalanceDayProductArr = [];
var currentBalanceMonthProductArr = [];
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
        $("#YearAndDate").append(`<b>${currentYear}年${currentMonth}月</b>`);
//        let price=55;
//        let price2=57;
//        let category = "food";
//        let date1 = "2022-01-05";
//        let date2 = "2022-01-06";
//        const categoryArr=[];
//        categoryArr[categoryArr.length] = new structCategory(category, price, date1, price);
//        let categoryIndex = categoryIsPresent(category, categoryArr);
//        categoryArr[categoryIndex].dateArr.push(date2);
//        categoryArr[categoryIndex].priceArr.push(price2);
//        console.log(categoryArr);

    });

//    $("#selectTimeBack2").click(function(){
//    console.log("what");
//
//
//    var myOffcanvas =  document.getElementById('offcanvasBottom');
//    var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
//
//    bsOffcanvas.toggle();
//    });

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

        document.getElementById("makeRowDisappear").style.display = "block";

        let bar = "&#128202;"
        document.getElementById("changeChart").value = "donutChart";
        document.getElementById("changeChart").disabled=false;
        $("#changeChart").html("");
        $("#changeChart").append(bar);


        document.getElementById("monthBtnLabel").className = "btn btn-outline-warning col-3";    //把下排按鈕改黃色
        document.getElementById("sixMonthBtnLabel").className = "btn btn-outline-warning col-3";
        document.getElementById("yearBtnLabel").className = "btn btn-outline-warning col-3";
        document.getElementById("customBtnLabel").className = "btn btn-outline-warning col-3";

        changeYearAndDate(0,displayDate);
        inexResetSelectedTimeType();
        DealMonthOutcome(selectedYear+"-"+selectedMonth);
    });

    //SearchWithIncome
    $("#analysisTypeIncome").on("change",function(){
        selectedYear=currentYear;
        selectedMonth=currentMonth;
        let displayDate = "" + selectedYear + "年" + selectedMonth + "月";

        document.getElementById("makeRowDisappear").style.display = "block";

        let bar = "&#128202;"
        document.getElementById("changeChart").value = "donutChart";
        document.getElementById("changeChart").disabled=false;
        $("#changeChart").html("");
        $("#changeChart").append(bar);

        document.getElementById("monthBtnLabel").className = "btn btn-outline-info col-3";   //把下排按鈕改藍色
        document.getElementById("sixMonthBtnLabel").className = "btn btn-outline-info col-3";
        document.getElementById("yearBtnLabel").className = "btn btn-outline-info col-3";
        document.getElementById("customBtnLabel").className = "btn btn-outline-info col-3";

        changeYearAndDate(0,displayDate);
        inexResetSelectedTimeType();
        DealMonthIncome(selectedYear+"-"+selectedMonth);
    });

    //SearchWithBalance
    $("#analysisTypeBalance").on("change",function(){
        selectedYear=currentYear;
        selectedMonth=currentMonth;
        let displayDate = selectedYear + "年";

        document.getElementById("makeRowDisappear").style.display = "none";

        document.getElementById("changeChart").value = "lineChart";
        document.getElementById("changeChart").disabled=true;
        $("#changeChart").html("");

        document.getElementById("monthBtnLabel").className = "btn btn-outline-danger col-3";   //把下排按鈕改紅色
        document.getElementById("sixMonthBtnLabel").className = "btn btn-outline-danger col-3";
        document.getElementById("yearBtnLabel").className = "btn btn-outline-danger col-3";
        document.getElementById("customBtnLabel").className = "btn btn-outline-danger col-3";

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
            let customSelectedYearFrom = parseInt( $("#dateStart").val().substring(0,4) );
            let customSelectedMonthFrom = parseInt( $("#dateStart").val().substring(5,7) );
            let customSelectedDayFrom = parseInt( $("#dateStart").val().substring(8,10) );
            let customSelectedYearTo = parseInt( $("#dateEnd").val().substring(0,4) );
            let customSelectedMonthTo = parseInt( $("#dateEnd").val().substring(5,7) );
            let customSelectedDayTo = parseInt( $("#dateEnd").val().substring(8,10) );
            if(customSelectedYearFrom>customSelectedYearTo)
            {
                alert("開始日期不應大於結束日期!");
                return;
            }
            else if(customSelectedYearFrom==customSelectedYearTo&&customSelectedMonthFrom>customSelectedMonthTo)
            {
                alert("開始日期不應大於結束日期!");
                return;
            }
            else if(customSelectedYearFrom==customSelectedYearTo
                    &&customSelectedMonthFrom==customSelectedMonthTo
                    &&customSelectedDayFrom>customSelectedDayTo)
            {
                alert("開始日期不應大於結束日期!");
                return;
            }
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
function structCategory(category, totalPrice, date, price)
{
    this.category = category;
    this.totalPrice = totalPrice;
    this.dateArr = [date];
    this.priceArr = [price];
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
function structBalanceMonthProduct(month, monthIncome, monthExpense, AllBalanceDayProduct)
{
    this.month = month;
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

//date有沒有在structCategory中的dateArr出現
function dateIsPresent(date, dateArr)
{
    for(let i=0; i<dateArr.length; i++)
    {
        if(date==dateArr[i])
        {
            return i;
        }
    }
    return (-1);
}

//修改offcanvas body的高度
function changeOffcanvasHeight(numElements)
{
    console.log("numElements"+numElements);
    if (numElements <= 55) {
      document.getElementById("offcanvasBottom").style.height = "450px";
    } else {
      document.getElementById("offcanvasBottom").style.height = "670px";
    }
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
//    console.log("change year and date end");
}

//選結餘時不顯示logo ， 顯示文字
function chartLogoToText(incomeTotalPrice,expenseTotalPrice, balanceTotalPrice)
{
    if(balanceTotalPrice>0)
        balanceTotalPrice = "+" + balanceTotalPrice;


    let demoTextAppend =
        `
    <div style="font-size:10px">
        <span>支出 : </span>
        <span class="text-warning">${expenseTotalPrice}</span>
    </div>
    <div style="font-size:10px">
        <span>收入 : </span>
        <span class="text-info">+${incomeTotalPrice}</span>
    </div>
    <div style="font-size:10px">
        <span>結餘 : </span>
        <span class="text-danger">${balanceTotalPrice}</span>
    </div>
    `;
    $("#changeChart").html("");
    $("#changeChart").append(demoTextAppend);
}
//決定要做哪個圖表
function makeWhatChart(categoryArr, categoryLabelName)
{
    if($("#changeChart").val()=="barChart")
    {
        document.getElementById("paddingDetails").style.display = "block";
        document.getElementById("chartFather").style = "position: relative; height:200px; width:70%";
        document.getElementById("chartFather").className = "chart-container";
        document.getElementById("makeTableDisappear").className = "container py-5 pe-2";
        document.getElementById("changeChart").className = "btn col-5 offset-7";
        document.getElementById("changeChart").style = "text-align: right";
        MakeBarChart(currentCategoryArr, categoryLabelName);
    }
    else if($("#changeChart").val()=="donutChart")
    {
        document.getElementById("paddingDetails").style.display = "block";
        document.getElementById("chartFather").style = "position: relative; height:200px; width:70%";
        document.getElementById("makeTableDisappear").className = "container py-5 pe-2";
        document.getElementById("changeChart").className = "btn col-5 offset-7";
        document.getElementById("chartFather").className = "chart-container";
        document.getElementById("changeChart").style = "text-align: right";
        MakeDoughnutChart(currentCategoryArr, categoryLabelName);
    }
    else if($("#changeChart").val()=="lineChart")
    {
         document.getElementById("paddingDetails").style.display = "none";
         document.getElementById("chartFather").style = "position: relative; height:310px; width:85%";
         document.getElementById("makeTableDisappear").className = "container py-2 pe-3";
         document.getElementById("chartFather").className = "chart-container pe-5 pt-5";
         document.getElementById("changeChart").className = "btn col-4 offset-8 position-absolute button-10";
         document.getElementById("changeChart").style = "";
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
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                    let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                    if(dateIndex == (-1))
                    {
                        categoryArr[categoryIndex].dateArr.push(product.date);
                        categoryArr[categoryIndex].priceArr.push(product.price);
                    }
                    else
                    {
                        categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                    }
                }
            });
            for(let i=0; i<categoryArr.length; i++)
            {
                console.log("categoryArr[" +i+ "]=" +categoryArr[i].category);
                console.log("categoryArr price="+categoryArr[i].totalPrice);
                for(let j=0; j<categoryArr[i].dateArr.length; j++)
                {
                    console.log("dateArr["+j+"]="+categoryArr[i].dateArr[j]);
                    console.log("priceArr["+j+"]="+categoryArr[i].priceArr[j]);
                }
            }

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
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                    let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                    if(dateIndex == (-1))
                    {
                        categoryArr[categoryIndex].dateArr.push(product.date);
                        categoryArr[categoryIndex].priceArr.push(product.price);
                    }
                    else
                    {
                        categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                    }
                }
            });
            currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
            makeWhatChart(currentCategoryArr, "月收入");
            MakeRowPercentage(currentCategoryArr);
            MakeRowDetails(currentCategoryArr);
            for(let i=0; i<currentCategoryArr.length; i++)
            {
//                console.log("category"+ i + currentCategoryArr[i].category + "totalPrice=" + currentCategoryArr[i].totalPrice);
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
            let monthIncome = 0;
            let monthExpense= 0;
            $.each(allBalanceProducts, function (i, balanceProduct) {
                let AllCategoryTmp = [];
//                console.log("categoryNum="+balanceProduct.allCategory.length);
                $.each(balanceProduct.allCategory, function (j, cateTmp) {
                    let categoryOfPercentTmp = new structCategoryOfPercent(cateTmp.categoryName, cateTmp.price, cateTmp.accountingType, cateTmp.percent);
                    AllCategoryTmp.push(categoryOfPercentTmp);
                });
                BalanceDayProductArr[BalanceDayProductArr.length] =
                    new structBalanceDayProduct(balanceProduct.date.substring(5,10), balanceProduct.dateIncome, balanceProduct.dateExpense, AllCategoryTmp);
            });
            currentBalanceDayProductArr = BalanceDayProductArr;
            MakeMonthBalanceRowDetails(BalanceDayProductArr, "month");
            makeWhatChart(BalanceDayProductArr, "月結餘");
            for(let i=0; i<BalanceDayProductArr.length; i++)
            {
                BalanceDayProductArr[i];
            }
        }
    });
}

function DealSixMonthOutcome(dateFrom, dateTo)
{
    console.log("checksixMonthOutCome"+dateFrom+"  "+dateTo)
    $.ajax({
        type: "GET",
        url: "/sixMonthOutcome?dateFrom=" + dateFrom + "&dateTo=" + dateTo,
        success: function (allProducts) {
            const categoryArr = [];
            $.each(allProducts, function (i, product) {
                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                if( categoryIndex == (-1) )
                {
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                    let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                    if(dateIndex == (-1))
                    {
                        categoryArr[categoryIndex].dateArr.push(product.date);
                        categoryArr[categoryIndex].priceArr.push(product.price);
                    }
                    else
                    {
                        categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                    }
                }
            });
            currentCategoryArr = categoryArr.sort(function(a, b) { return b.totalPrice - a.totalPrice;});
            makeWhatChart(currentCategoryArr, "六月內支出");
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
        url: "/sixMonthIncome?dateFrom=" + dateFrom + "&dateTo=" + dateTo,
        success: function (allProducts) {
            const categoryArr = [];
            $.each(allProducts, function (i, product) {
                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                if( categoryIndex == (-1) )
                {
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                    let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                    if(dateIndex == (-1))
                    {
                        categoryArr[categoryIndex].dateArr.push(product.date);
                        categoryArr[categoryIndex].priceArr.push(product.price);
                    }
                    else
                    {
                        categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                    }
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
        url: "/YearOutcome?year=" + date,
        success: function (allProducts) {
            const categoryArr = [];
            $.each(allProducts, function (i, product) {
                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                if( categoryIndex == (-1) )
                {
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                    let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                    if(dateIndex == (-1))
                    {
                        categoryArr[categoryIndex].dateArr.push(product.date);
                        categoryArr[categoryIndex].priceArr.push(product.price);
                    }
                    else
                    {
                        categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                    }
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
        url: "/YearIncome?year=" + date,
        success: function (allProducts) {
            const categoryArr = [];
            $.each(allProducts, function (i, product) {
                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                if( categoryIndex == (-1) )
                {
                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                }
                else
                {
                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                    let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                    if(dateIndex == (-1))
                    {
                        categoryArr[categoryIndex].dateArr.push(product.date);
                        categoryArr[categoryIndex].priceArr.push(product.price);
                    }
                    else
                    {
                        categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                    }
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
    console.log("year="+year);
    $.ajax({
        type: "GET",
        url: "/yearBalance?year=" + year,
        success: function (allBalanceProducts) {
            const BalanceMonthProductArr = [];
            let yearIncome = 0;
            let yearExpense= 0;
            $.each(allBalanceProducts, function (i, balanceMonthProduct) {
                let BalanceDayProductArr = [];
                yearIncome += balanceMonthProduct.monthIncome;
                yearExpense += balanceMonthProduct.monthExpense;
//                console.log("yearIncome="+yearIncome+"yearExpense="+yearExpense);
                console.log(balanceMonthProduct);
                if(balanceMonthProduct.allBalanceDayProduct.length>0)
                {
                    $.each(balanceMonthProduct.allBalanceDayProduct, function (j, balanceDayProduct) {
                        let AllCategoryArr = [];
//                        console.log(balanceDayProduct);
                        $.each(balanceDayProduct.allCategory, function (k, cateTmp) {
//                            console.log(cateTmp);
                            let categoryOfPercentTmp = new structCategoryOfPercent(cateTmp.categoryName, cateTmp.price, cateTmp.accountingType, cateTmp.percent);
                            AllCategoryArr.push(categoryOfPercentTmp);
                        });
                        BalanceDayProductArr.push(
                            new structBalanceDayProduct(balanceDayProduct.date.substring(5,10), balanceDayProduct.dateIncome, balanceDayProduct.dateExpense, AllCategoryArr) );

                    });
                    BalanceMonthProductArr.push(
                        new structBalanceMonthProduct(balanceMonthProduct.month.substring(5,7), balanceMonthProduct.monthIncome, balanceMonthProduct.monthExpense, BalanceDayProductArr) );
                }
            });
            currentBalanceMonthProductArr = BalanceMonthProductArr;
            MakeYearBalanceRowDetails(BalanceMonthProductArr, "month");
            makeWhatChart(BalanceMonthProductArr, "年結餘");
//            for (let k=0; k<BalanceMonthProductArr.length; k++)
//            {
//                console.log("month:"+  + BalanceMonthProductArr[k].month + "monthIncome=" + BalanceMonthProductArr[k].monthIncome);
//                console.log("monthExpense=" + BalanceMonthProductArr[k].monthExpense);
//                console.log(BalanceMonthProductArr[k].AllBalanceDayProduct);
//                for(let i=0; i<BalanceMonthProductArr[k].AllBalanceDayProduct.length; i++)
//                {
//                    console.log("date:"+   BalanceMonthProductArr[k].AllBalanceDayProduct[i].date + "dateIncome=" + BalanceMonthProductArr[k].AllBalanceDayProduct[i].dateIncome);
//                    console.log("dateExpense="+   BalanceMonthProductArr[k].AllBalanceDayProduct[i].dateExpense);
//                    for(let j=0; j<BalanceMonthProductArr[k].AllBalanceDayProduct[i].AllCategory.length; j++)
//                    {
//                        console.log(j + " = " + BalanceMonthProductArr[k].AllBalanceDayProduct[i].AllCategory[j]);
//                    }
//                }
//            }
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
                url: "/monthOutcome?date=" + AllMonthSelected[i],
                success: function (allProducts) {
                    $.each(allProducts, function (i, product) {
                        if(AllMonthSelected[i]==CustomMonthFrom)
                        {
                            if(parseInt(product.date.substring(8.10))>=CustomDateFrom)
                            {
                                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                                if( categoryIndex == (-1) )
                                {
                                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                                }
                                else
                                {
                                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                                    let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                                    if(dateIndex == (-1))
                                    {
                                        categoryArr[categoryIndex].dateArr.push(product.date);
                                        categoryArr[categoryIndex].priceArr.push(product.price);
                                    }
                                    else
                                    {
                                        categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                                    }
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
                                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                                }
                                else
                                {
                                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                                    let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                                    if(dateIndex == (-1))
                                    {
                                        categoryArr[categoryIndex].dateArr.push(product.date);
                                        categoryArr[categoryIndex].priceArr.push(product.price);
                                    }
                                    else
                                    {
                                        categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                                    }
                                }
                            }
                        }
                        else
                        {
                            let categoryIndex= categoryIsPresent(product.category, categoryArr);
                            if( categoryIndex == (-1) )
                            {
                                categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                            }
                            else
                            {
                                categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                                let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                                if(dateIndex == (-1))
                                {
                                    categoryArr[categoryIndex].dateArr.push(product.date);
                                    categoryArr[categoryIndex].priceArr.push(product.price);
                                }
                                else
                                {
                                    categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                                }
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
                url: "/monthIncome?date=" + AllMonthSelected[i],
                success: function (allProducts) {
                    $.each(allProducts, function (i, product) {
                        if(AllMonthSelected[i]==CustomMonthFrom)
                        {
                            if(parseInt(product.date.substring(8.10))>=CustomDateFrom)
                            {
                                let categoryIndex= categoryIsPresent(product.category, categoryArr);
                                if( categoryIndex == (-1) )
                                {
                                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                                }
                                else
                                {
                                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                                    let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                                    if(dateIndex == (-1))
                                    {
                                        categoryArr[categoryIndex].dateArr.push(product.date);
                                        categoryArr[categoryIndex].priceArr.push(product.price);
                                    }
                                    else
                                    {
                                        categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                                    }
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
                                    categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                                }
                                else
                                {
                                    categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                                    let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                                    if(dateIndex == (-1))
                                    {
                                        categoryArr[categoryIndex].dateArr.push(product.date);
                                        categoryArr[categoryIndex].priceArr.push(product.price);
                                    }
                                    else
                                    {
                                        categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                                    }
                                }
                            }
                        }
                        else
                        {
                            let categoryIndex= categoryIsPresent(product.category, categoryArr);
                            if( categoryIndex == (-1) )
                            {
                                categoryArr[categoryArr.length] = new structCategory(product.category, product.price, product.date, product.price);
                            }
                            else
                            {
                               categoryArr[categoryIndex].totalPrice =  categoryArr[categoryIndex].totalPrice + product.price;
                               let dateIndex = dateIsPresent(product.date, categoryArr[categoryIndex].dateArr);
                               if(dateIndex == (-1))
                               {
                                   categoryArr[categoryIndex].dateArr.push(product.date);
                                   categoryArr[categoryIndex].priceArr.push(product.price);
                               }
                               else
                               {
                                   categoryArr[categoryIndex].priceArr[dateIndex] += product.price;
                               }
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
//    console.log("categoryArr="+categoryArr);

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
                    <td class="fs-5" width="20%" style="text-align: right;">&#8691;</td>
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
            let demoDetails =
            `
            <tr style="border: 1px solid gray"   onclick="tableClickToCanvas(this)">
                <th  style="text-align: right;">${cateLogo}</th>
                <td value="${i}">${categoryAsArr[i]}</td>
                <td ></td>
                <td >$${totalPriceAsArr[i]}</td>
            </tr>
            `;
            $("#ExInDetails").append(demoDetails);
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
                    <td class="fs-5" width="20%" style="text-align: right;">&#8691;</td>
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

            let demoDetails =
            `<tr style="border: 1px solid gray"   onclick="tableClickToCanvas(this)">
                <th  style="text-align: right;">${cateLogo}</th>
                <td value="${i}">${categoryAsArr[i]}</td>
                <td ></td>
                <td >$${totalPriceAsArr[i]}</td>
            </tr>`;
            $("#ExInDetails").append(demoDetails);
        }
        $("#elementId").click(function() {

        });
    }
}

//Year結餘明細
function MakeYearBalanceRowDetails(BalanceProductArr, BalanceProductType)
{
    //沒資料不顯示
    if(BalanceProductArr.length==0)
    {
        document.getElementById("makeTableDisappear").style.display = "none";
    }
    else
    {
        document.getElementById("makeTableDisappear").style.display = "block";
    }
    $("#ExInDetails").html("");
    for(let i=0; i<BalanceProductArr.length; i++)
    {
        if(i==0)
        {
            let firstDetails =
            `
            <tr >
                <th class="ps-3" width="70%"> 日期明細</th>
                <td class="fs-5" width="30%" style="text-align: right;">&#8691;</td>
            </tr>
            `;
            $("#ExInDetails").append(firstDetails);
        }
        if(BalanceProductArr[i].AllBalanceDayProduct.length>0)
        {
            console.log(BalanceProductArr[i].month);
            let demoDetails =  "";
            let balancePrice = BalanceProductArr[i].monthIncome - BalanceProductArr[i].monthExpense;
            let displayBalancePrice =balancePrice.toString();

            demoDetails =
            `
            <tr style="border: 1px solid gray" onclick="tableClickToCanvas(this)">
                <td class="ps-3">${BalanceProductArr[i].month}月</td>
                <td class="text-danger" style="text-align: right">$${displayBalancePrice}</td>
            </tr>
            `;
            $("#ExInDetails").append(demoDetails);
        }
    }
}

//month結餘明細
function MakeMonthBalanceRowDetails(BalanceProductArr, BalanceProductType)
{
    //沒資料不顯示
    if(BalanceProductArr.length==0)
    {
        document.getElementById("makeTableDisappear").style.display = "none";
    }
    else
    {
        document.getElementById("makeTableDisappear").style.display = "block";
    }
    $("#ExInDetails").html("");
    for(let i=0; i<BalanceProductArr.length; i++)
    {
        if(i==0)
        {
            let firstDetails =
             `
            <tr >
                <th class="ps-3" width="70%"> 日期明細</th>
                <td width="30%" style="text-align: right;">&#8691;</td>
            </tr>
            `;
            $("#ExInDetails").append(firstDetails);
        }

        if(BalanceProductArr[i].AllCategory.length>0)
        {
            let demoDetails =  "";
            let balancePrice = BalanceProductArr[i].dateIncome - BalanceProductArr[i].dateExpense;
            let displayBalancePrice = balancePrice;
            demoDetails =
            `
            <tr style="border: 1px solid gray" onclick="tableClickToCanvas(this)">
                <td class="ps-3">${BalanceProductArr[i].date}</td>
                <td class="text-danger" style="text-align: right">$${displayBalancePrice}</td>
            </tr>
            `;
            $("#ExInDetails").append(demoDetails);
        }
    }
}



//click 明細table中的row 跳出offCanvas顯示那個row的細節
function tableClickToCanvas(tableRow)
{
    var myOffcanvas =  document.getElementById('offcanvasBottom');
    var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
    var tdArr = tableRow.querySelectorAll('td');
    let color="", category="", totalPrice="", monthChoose="", dateChoose="";
    $("#offcanvasBottomLabel").html("");
    $("#canvasBody").html("");
    if($('#analysisType_btn input:radio:checked').val() != "balance")
    {
        color = tdArr[0].getAttribute("value");
        category = tdArr[0].textContent;
        totalPrice = tdArr[2].textContent.substring(1,tdArr[2].textContent.length);
        $("#offcanvasBottomLabel").append(category);
    }
    else
    {
        if($('#SelectedTimeType input:radio:checked').val() == "month")
        {
            dateChoose = tdArr[0].textContent;
            totalPrice = tdArr[1].textContent.substring(1,tdArr[1].textContent.length);
            $("#offcanvasBottomLabel").append(`${dateChoose}`);
        }
        else    //year
        {
            monthChoose = tdArr[0].textContent.substring(0, (tdArr[0].textContent.length)-1 );
            totalPrice = tdArr[1].textContent.substring(1,tdArr[1].textContent.length);
            $("#offcanvasBottomLabel").append(`${monthChoose}月`);
        }
        console.log("tdArr[1].textContent.length="+tdArr[1].textContent.length);
        console.log("dateChoose="+dateChoose);
        document.getElementById("canvasHeaderColor").style = "background-color:#dc3545";
    }

    console.log("color="+color+" category="+category+" totalPrice="+totalPrice);
    console.log("tableRow="+tableRow.innerHTML);

    if($('#analysisType_btn input:radio:checked').val() == "expense")
    {
        for(let i=0; i<currentCategoryArr.length; i++)
        {
            if(currentCategoryArr[i].category == category)
            {
                let detail =
                `
                <div class="row">
                    <span class="col-6 font-weight-bold" style="text-align: left">支出詳情</span>
                    <span class="col-6"  style="text-align: right">&#8691;</span>
                </div>
                `;
                document.getElementById("canvasHeaderColor").style = "background-color:" + ColorInChart[color];

                $("#canvasBody").append(detail);
                console.log("totalPriceTable="+totalPrice+"totalPriceArr="+currentCategoryArr[i].totalPrice);
                console.log("currentCategoryArr[i].dateArr.length="+currentCategoryArr[i].dateArr.length);
                for(let j=0; j<currentCategoryArr[i].dateArr.length; j++)
                {
                    let percent = Math.round((currentCategoryArr[i].priceArr[j]/totalPrice)*100);
                    let percentWithFloat = Math.round((currentCategoryArr[i].priceArr[j]/totalPrice)*1000)/10;
                    let demoDate =
                    `
                    <div class="row" style="background-color:#E0E0E0">
                        <div class="col-6 " style="text-align: left">${currentCategoryArr[i].dateArr[j]}</div>
                        <div class="col-6 text-danger" style="text-align: right">$${currentCategoryArr[i].priceArr[j]}</div>
                    </div>
                    `;
                    let demoCanvasRow =
                    `
                    <div class="row">
                         <div class="col-8">
                             <div class="row">
                                 <span class="col-6" font-weight-bold>${category}</span>
                                 <span class="col-6">${percentWithFloat}%</span>
                             </div>
                             <div class="row">
                                 <div class="progress" style="height: 3px;">
                                     <div class="progress-bar bg-warning" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                                 </div>
                             </div>
                         </div>
                         <div class="col-4" style="text-align: right">
                             $-${currentCategoryArr[i].priceArr[j]}
                         </div>
                     </div>
                    `;
                    $("#canvasBody").append(demoDate);
                    $("#canvasBody").append(demoCanvasRow);
                }
                break;
            }
        }
    }
    else if($('#analysisType_btn input:radio:checked').val() == "income")
    {
        for(let i=0; i<currentCategoryArr.length; i++)
        {
            if(currentCategoryArr[i].category == category)
            {
                let detail =
                `
                <div class="row">
                    <span class="col-6 font-weight-bold" style="text-align: left">收入詳情</span>
                    <span class="col-6"  style="text-align: right">&#8691;</span>
                </div>
                `;
                document.getElementById("canvasHeaderColor").style = "background-color:" + ColorInChart[color];


                $("#canvasBody").append(detail);
                console.log("totalPriceTable="+totalPrice+"totalPriceArr="+currentCategoryArr[i].totalPrice);
                for(let j=0; j<currentCategoryArr[i].dateArr.length; j++)
                {
                    let percent = Math.round((currentCategoryArr[i].priceArr[j]/totalPrice)*100);
                    let percentWithFloat = Math.round((currentCategoryArr[i].priceArr[j]/totalPrice)*1000)/10;
                    let demoDate =
                    `
                    <div class="row" style="background-color:#E0E0E0">
                        <div class="col-6 " style="text-align: left">${currentCategoryArr[i].dateArr[j]}</div>
                        <div class="col-6 text-danger" style="text-align: right">$${currentCategoryArr[i].priceArr[j]}</div>
                    </div>
                    `;
                    let demoCanvasRow =
                    `
                    <div class="row">
                         <div class="col-8">
                             <div class="row">
                                    <span class="col-6 font-weight-bold">${category}</span>
                                    <span class="col-6">${percentWithFloat}%</span>
                             </div>
                             <div class="row">
                                 <div class="progress" style="height: 3px;">
                                     <div class="progress-bar bg-warning" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                                 </div>
                             </div>
                         </div>
                         <div class="col-4" style="text-align: right">
                             $${currentCategoryArr[i].priceArr[j]}
                         </div>
                     </div>
                    `;
                    $("#canvasBody").append(demoDate);
                    $("#canvasBody").append(demoCanvasRow);
                }
                break;
            }
        }
    }
    else
    {
        if($('#SelectedTimeType input:radio:checked').val() == "month")
        {
            let detail =
            `
            <div class="row">
                <span class="col-10" style="text-align: center">
                    <span class="font-weight-bold">結餘詳情  </span>
                    <span class="text-warning font-weight-bold">支出</span>
                    <span class="text-info font-weight-bold">收入</span>
                    <span class="text-danger font-weight-bold">結餘</span>
                </span>
            </div>
            `;
            $("#canvasBody").append(detail);

            for(let k=0; k<currentBalanceDayProductArr.length; k++)
            {
                console.log("currentBalanceDayProductArr[k].date.substring(5,10)="+currentBalanceDayProductArr[k].date.substring(5,10));
                console.log("currentBalanceDayProductArr[k].date="+currentBalanceDayProductArr[k].date);
                if(currentBalanceDayProductArr[k].date==dateChoose)
                {
                    console.log("date:"+   currentBalanceDayProductArr[k].date + "dateIncome=" + currentBalanceDayProductArr[k].dateIncome);
                    console.log("dateExpense="+ currentBalanceDayProductArr[k].dateExpense);
                    console.log("allCategory="+ currentBalanceDayProductArr[k].AllCategory);
                    let dateIncome=currentBalanceDayProductArr[k].dateIncome;
                    let dateExpense=currentBalanceDayProductArr[k].dateExpense;


                    let dateBalance=dateIncome-dateExpense;
                    let demoDate =
                    `
                    <div class="row" style="background-color:#E0E0E0">
                        <div class="col-6 " style="text-align: left">${currentBalanceDayProductArr[k].date}</div>
                        <div class="col-6 text-danger" style="text-align: right">$${dateBalance}</div>
                    </div>
                    `;
                    $("#canvasBody").append(demoDate);
                    for(let j=0; j<currentBalanceDayProductArr[k].AllCategory.length; j++)
                    {
                        var tmpCOP = currentBalanceDayProductArr[k].AllCategory[j];//CategoryOfPercent
                        if(tmpCOP.accountingType=="income")
                        {
                            let percent = Math.round((tmpCOP.price/dateIncome)*100);
                            let percentWithFloat = Math.round((tmpCOP.price/dateIncome)*1000)/10;
                            let demoCanvasRow =
                            `
                            <div class="row">
                                 <div class="col-8">
                                     <div class="row">
                                            <span class="col-6 text-dark">${tmpCOP.categoryName}</span>
                                            <span class="col-6">${percentWithFloat}%</span>
                                     </div>
                                     <div class="row">
                                         <div class="progress" style="height: 3px;">
                                             <div class="progress-bar bg-info" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                                         </div>
                                     </div>
                                 </div>
                                 <div class="col-4 text-info" style="text-align: right">
                                     $${tmpCOP.price}
                                 </div>
                             </div>
                            `;
                            $("#canvasBody").append(demoCanvasRow);
                        }
                        else
                        {
                            let percent = Math.round((tmpCOP.price/dateExpense)*100);
                            let percentWithFloat = Math.round((tmpCOP.price/dateExpense)*1000)/10;
                            let demoCanvasRow =
                            `
                            <div class="row">
                                 <div class="col-8">
                                     <div class="row">
                                         <span class="col-6 text-dark">${tmpCOP.categoryName}</span>
                                         <span class="col-6">${percentWithFloat}%</span>
                                     </div>
                                     <div class="row">
                                         <div class="progress" style="height: 3px;">
                                             <div class="progress-bar bg-warning" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                                         </div>
                                     </div>
                                 </div>
                                 <div class="col-4 text-warning" style="text-align: right">
                                     $-${tmpCOP.price}
                                 </div>
                             </div>
                            `;
                            $("#canvasBody").append(demoCanvasRow);
                        }
                    }
                    break;
                }
            }
        }
        else
        {
            for (let k=0; k<currentBalanceMonthProductArr.length; k++)
            {
                console.log("month:"+  + currentBalanceMonthProductArr[k].month + "monthIncome=" + currentBalanceMonthProductArr[k].monthIncome);
                console.log("monthExpense=" + currentBalanceMonthProductArr[k].monthExpense);
                console.log(currentBalanceMonthProductArr[k].AllBalanceDayProduct);

                if(currentBalanceMonthProductArr[k].month == monthChoose)
                {
                    let detail =
                    `
                    <div class="row">
                        <span class="col-12" style="text-align: center">
                            <span>結餘詳情  </span>
                            <span class="text-warning">支出</span>
                            <span class="text-info">收入</span>
                            <span class="text-danger">結餘</span>
                        </span>
                    </div>
                    `;
                    let monthIncome=currentBalanceMonthProductArr[k].monthIncome;
                    let monthExpense=currentBalanceMonthProductArr[k].monthExpense;
//                    let monthBalance=monthIncome+monthExpense;

                    $("#canvasBody").append(detail);

                    for(let i=0; i<currentBalanceMonthProductArr[k].AllBalanceDayProduct.length; i++)
                    {
                        let dateBalance = currentBalanceMonthProductArr[k].AllBalanceDayProduct[i].dateIncome - currentBalanceMonthProductArr[k].AllBalanceDayProduct[i].dateExpense;

                        let demoDate =
                        `
                        <div class="row" style="background-color:#E0E0E0">
                            <div class="col-6 " style="text-align: left">${currentBalanceMonthProductArr[k].AllBalanceDayProduct[i].date}</div>
                            <div class="col-6 text-danger" style="text-align: right">$${dateBalance}</div>
                        </div>
                        `;
                        $("#canvasBody").append(demoDate);
                        console.log("date:"+   currentBalanceMonthProductArr[k].AllBalanceDayProduct[i].date + "dateIncome=" + currentBalanceMonthProductArr[k].AllBalanceDayProduct[i].dateIncome);
                        console.log("dateExpense="+   currentBalanceMonthProductArr[k].AllBalanceDayProduct[i].dateExpense);

                        for(let j=0; j<currentBalanceMonthProductArr[k].AllBalanceDayProduct[i].AllCategory.length; j++)
                        {
                            console.log(j + " = " + currentBalanceMonthProductArr[k].AllBalanceDayProduct[i].AllCategory[j]);
                            var tmpCOP = currentBalanceMonthProductArr[k].AllBalanceDayProduct[i].AllCategory[j];//CategoryOfPercent

                            if(tmpCOP.accountingType=="income")
                            {
                                let percent = Math.round((tmpCOP.price/monthIncome)*100);
                                let percentWithFloat = Math.round((tmpCOP.price/monthIncome)*1000)/10;
                                let demoCanvasRow =
                                `
                                <div class="row">
                                     <div class="col-8">
                                         <div class="row">
                                                <span class="col-6">${tmpCOP.categoryName}</span>
                                                <span class="col-6">${percentWithFloat}%</span>
                                         </div>
                                         <div class="row">
                                             <div class="progress" style="height: 3px;">
                                                 <div class="progress-bar bg-info" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                                             </div>
                                         </div>
                                     </div>
                                     <div class="col-4 text-info" style="text-align: right">
                                         $${tmpCOP.price}
                                     </div>
                                 </div>
                                `;
                                $("#canvasBody").append(demoCanvasRow);
                            }
                            else
                            {
                                let percent = Math.round((tmpCOP.price/monthExpense)*100);
                                let percentWithFloat = Math.round((tmpCOP.price/monthExpense)*1000)/10;
                                let demoCanvasRow =
                                `
                                <div class="row">
                                     <div class="col-8">
                                         <div class="row">
                                             <span class="col-6">${tmpCOP.categoryName}</span>
                                             <span class="col-6">${percentWithFloat}%</span>
                                         </div>
                                         <div class="row">
                                             <div class="progress" style="height: 3px;">
                                                 <div class="progress-bar bg-warning" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                                             </div>
                                         </div>
                                     </div>
                                     <div class="col-4 text-warning" style="text-align: right">
                                         $${tmpCOP.price}
                                     </div>
                                 </div>
                                `;
                                $("#canvasBody").append(demoCanvasRow);
                            }
                        }
                    }
                    break;
                }
            }
        }
    }
    let offcanvasBody = document.getElementById("canvasBody");
    let numElements = offcanvasBody.childNodes.length;
    console.log("numElements="+numElements);
    changeOffcanvasHeight(numElements);
    bsOffcanvas.toggle();//彈出offCanvas
}


function MakeBarChart(categoryArr, chartLabelName)
{
    //沒資料不顯示
    if(categoryArr.length==0)
    {
        document.getElementById("changeChart").style.display = "none";
        document.getElementById("chart").style.display = "none";
        document.getElementById("capoGif").style.display = "block";
    }
    else
    {
        document.getElementById("changeChart").style.display = "block";
        document.getElementById("chart").style.display = "block";
        document.getElementById("capoGif").style.display = "none";
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
    var categoryAsLabels1 = [];
    var totalPriceAsLabels1 = [];
    if(categoryAsLabels.length>6)
    {
        categoryAsLabels1 = [categoryAsLabels[0],categoryAsLabels[1],categoryAsLabels[2],categoryAsLabels[3],categoryAsLabels[4],categoryAsLabels[5]];
        totalPriceAsLabels1 = [totalPriceAsLabels[0],totalPriceAsLabels[1],totalPriceAsLabels[2],totalPriceAsLabels[3],totalPriceAsLabels[4],totalPriceAsLabels[05]];
    }
    else
    {
        for(let i=0; i<categoryAsLabels.length; i++)
        {
            console.log("cateas label["+ i + "]= " +categoryAsLabels[i]);
            console.log("total price label["+ i + "]= " +totalPriceAsLabels[i]);
            categoryAsLabels1.push(categoryAsLabels[i]);
            totalPriceAsLabels1.push(totalPriceAsLabels[i]);
        }
    }
    console.log("cateas label="+categoryAsLabels1);
    console.log("total price label="+totalPriceAsLabels1);
//    let categoryColorsBorder = ColorInChart.slice(0,categoryAsLabels.length);
    var chart = new Chart(ctx, {
        // 要创建的图表类型
//        plugins: [ChartDataLabels],
        type: 'bar',
        // 数据集
        data: {
            labels: categoryAsLabels1, //最下面 x軸的label
            datasets: [{
                backgroundColor: categoryColors, //填滿每一個bar的顏色
                borderColor: "#4F4F4F",         //每一個bar的顏色的外框
                data: totalPriceAsLabels1,        //每一個bar的資料(長度)
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
        document.getElementById("capoGif").style.display = "block";
    }
    else
    {
        document.getElementById("changeChart").style.display = "block";
        document.getElementById("chart").style.display = "block";
        document.getElementById("capoGif").style.display = "none";
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
//    console.log("categoryColors="+categoryColors);
//    console.log("totalPriceAsLabels"+totalPriceAsLabels);
//    console.log("categoryAsLabels="+categoryAsLabels);
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
//data: ["1" ,"2"]
//            label: ‘交通量’,
//            // Line
//            lineTension: 0,  //預設為把線段繪製成貝茲曲線，如果只是要用直線連接設為0即可
//            backgroundColor: ‘#FF5376’,
//            borderColor: ‘#FF5376’,
//            fill: false,  // 不要將線段以下的區域填色
//            borderWidth: 2,
//            // Point
//            pointRadius: 5,
//            pointHoverRadius: 7,
//          }
//legend:{
//            display: false
//          },
function MakeLineChart(categoryArr, chartLabelName)
{
    //沒資料不顯示
    if(categoryArr.length==0)
    {
        document.getElementById("changeChart").style.display = "none";
        document.getElementById("chart").style.display = "none";
        document.getElementById("capoGif").style.display = "block";
    }
    else
    {
        document.getElementById("changeChart").style.display = "block";
        document.getElementById("chart").style.display = "block";
        document.getElementById("capoGif").style.display = "none";
    }
    var ctx = document.getElementById('chart').getContext('2d');
    var dateAsLabels = [];
    var totalIncomePriceArr = [];
    var totalOutComePriceArr = [];
    var totalBalancePriceArr = [];
    var AllIncomeTotalPrice=0;
    var AllOutComeTotalPrice=0;
    var AllBalanceTotalPrice=0;
    var minLabel, step, AllBalance, tmp, maxGap=0, highestInChart=0;
    if($('#SelectedTimeType input:radio:checked').val() == "year")
    {
        for (let k=0; k<categoryArr.length; k++)
        {
            dateAsLabels[k] = categoryArr[k].month;
            totalIncomePriceArr[k] = categoryArr[k].monthIncome;
            AllIncomeTotalPrice += categoryArr[k].monthIncome;

            totalOutComePriceArr[k] = categoryArr[k].monthExpense;
            AllOutComeTotalPrice -= categoryArr[k].monthExpense;

            totalBalancePriceArr[k] = totalIncomePriceArr[k]-totalOutComePriceArr[k];
            if(Math.abs(categoryArr[k].monthIncome-categoryArr[k].monthExpense) > maxGap)
                maxGap = Math.abs(categoryArr[k].monthIncome-categoryArr[k].monthExpense);
            if(categoryArr[k].monthExpense>highestInChart)
                highestInChart=categoryArr[k].monthExpense;
            if(categoryArr[k].monthIncome>highestInChart)
                highestInChart=categoryArr[k].monthIncome;
        }
    }
    else if($('#SelectedTimeType input:radio:checked').val() == "month")
    {
        for (let k=0; k<categoryArr.length; k++)
        {
            dateAsLabels[k] = categoryArr[k].date;
            totalIncomePriceArr[k] = categoryArr[k].dateIncome;
            AllIncomeTotalPrice += categoryArr[k].dateIncome;

            totalOutComePriceArr[k] = categoryArr[k].dateExpense;
            AllOutComeTotalPrice -= categoryArr[k].dateExpense;

            totalBalancePriceArr[k] = totalIncomePriceArr[k]-totalOutComePriceArr[k];
            if(Math.abs(categoryArr[k].dateIncome-categoryArr[k].dateExpense) > maxGap)
                maxGap = Math.abs(categoryArr[k].dateIncome-categoryArr[k].dateExpense);
            if(categoryArr[k].dateExpense>highestInChart)
                highestInChart=categoryArr[k].dateExpense;
            if(categoryArr[k].dateIncome>highestInChart)
                highestInChart=categoryArr[k].dateIncome;
        }
    }

    maxLabel = Math.round(highestInChart/(Math.pow(10, highestInChart.toString().length-1)))*(Math.pow(10, highestInChart.toString().length-1));
    minLabel = 0 - Math.round( maxGap/Math.pow(10, maxGap.toString().length-1) )* Math.pow(10, maxGap.toString().length-1);
    console.log("maxlabel="+maxLabel+"maxGap="+maxGap);
    console.log("minlabel="+minLabel+"highestInChart="+highestInChart);


    tmp = Math.round((maxLabel-minLabel)/4);
    step = Math.round(tmp/(Math.pow(10, tmp.toString().length-1)))*(Math.pow(10, tmp.toString().length-1));
    console.log("step="+step);
    minLabel -= step;
    maxLabel = minLabel + step*6;
    chartLogoToText(AllIncomeTotalPrice, AllOutComeTotalPrice, AllIncomeTotalPrice + AllOutComeTotalPrice);

    console.log("balanceArr=",totalBalancePriceArr);
    console.log("incomeArr=",totalIncomePriceArr);
    console.log("ExpenseeArr=",totalOutComePriceArr);
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels:dateAsLabels,
            datasets: [
            {
                label: 'income',
                data: totalIncomePriceArr,
                lineTension: 0,
                fill: false,
                borderColor: "#00FFFF"
            },
            {
                label: 'expense',
                data: totalOutComePriceArr,
                lineTension: 0,
                fill: false,
                borderColor: "yellow"
            },
            {
                label: 'balance',
                data: totalBalancePriceArr,
                lineTension: 0,
                fill: false,
                borderColor: "#f90032"
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
              display: false,
              text: ""
          },
          legend:{              //上面的圖例
            display: false
          },
          scales: {
              // x 軸設置
              xAxes: [{
                  // x 軸格線
                  gridLines: {
                      display: false
                  }
              }],
              // y 軸設置
              yAxes: [{
                  // y 軸格線
                  gridLines: {
                      display: true
                  },
                  // y 軸間距
                  ticks: {
                      display: true,
                      beginAtZero: false,
                      min: minLabel,
                      max: maxLabel,
                      stepSize: step,
                      callback: function(label, index, labels){
                          return label;
                      }
                  }
              }]
          }

        }

    });
}