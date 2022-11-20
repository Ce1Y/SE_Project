var PriceFrom;
var PriceTo;
var SelectedCategory;
var choose;
$(document).ready(function(){
    console.log($('#btnradio1').val());
    console.log($('#btnradio2').val());
    $("#choose1").change(function(){
      $("#choose1").attr("value", $(this).val());
    })

    $('#click_serach').click(function(){
        $('#search_display').html("");
        if(choose==1)
        {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/date?date=" + $('#choose1').val(),
                success: function(allProducts){
                    $.each(allProducts, function(index, product){
                        make_card(index, product);
                    })
                }
            })
        }
        else if(choose==2)
        {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/products/category?category=" + SelectedCategory,
                success: function(allProducts){
                    $.each(allProducts, function(index, product){
                        make_card(index, product);
                    })
                }
            })
        }
        else if(choose==3)
        {
            if(PriceTo!="1000+")
            {
                $.ajax({
                   type: "GET",
                   url: "http://localhost:8080/pricebetween?pricefrom=" + PriceFrom + "&priceto=" + PriceTo,
                   success: function(allProducts){
                       $.each(allProducts, function(index, product){
                            make_card(index, product);
                       })
                   }
                })
            }
            else
            {
                $.ajax({
                   type: "GET",
                   url: "http://localhost:8080/pricelessthan?price=" + PriceFrom,
                   success: function(allProducts){
                       $.each(allProducts, function(index, product){
                            make_card(index, product);
                       })
                   }
                })
            }
        }
        else if(choose==4)
        {

        }
    });


});

//製造右側選擇器
function selectOnchange(selected_obj)
{
    var searchType = selected_obj.options[selected_obj.selectedIndex].value;
    var SelectedContent = $('#SelectContent');
    SelectedContent.html("");
    if(searchType=="Date")
    {
        let SelectedDate=
        `
        <form>
        <input type="date" class="form-control" id="choose1">
        </form>

        `;
        choose=1;
        SelectedContent.append(SelectedDate);
    }
    else if(searchType=="category")
    {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/CategoryCount" ,
            success: function(allProducts){
                let selectCatergoryFrame =
                `
                <select class="form-select" id="choose2" onchange="selectOnchange_Category(this)">
                </select>
                `;
                $.each(allProducts, function(index, categoryCount){
                    let tmp =
                    `
                    <option value=${index}>${categoryCount.categoryName}</option>
                    `;
                    console.log(tmp);
                    selectCatergoryFrame.append(tmp);

                })
                SelectedContent.append(selectCatergoryFrame);
            }
        })
    }
    else if(searchType=="price")
    {
        let SelectedPrice =
        `
        <div class="input-group">
             <select class="form-select" id="choose3" onchange="selectOnchange_Price(this)">
                 <option value="100"> 金額<100 </option>
                 <option value="200"> 金額<200 </option>
                 <option value="500"> 金額<500 </option>
                 <option value="1000"> 金額<1000 </option>
                 <option value="1000+"> 金額>1000 </option>
             </select>
        </div>
        `;
        choose=3;
        SelectedContent.append(SelectedPrice);
    }
    else if(searchType=="description")
    {
        let SelectedDiscr=
        `
        <textarea class="form-control" id="choose4" ></textarea>
        `;
        choose=4;
        SelectedContent.append(SelectedDiscr);
    }
    console.log(searchType);
}

//取得price值
function selectOnchange_Price(selectPriceFnc)
{
    if(selectPriceFnc.selectedIndex==0)
    {
        PriceFrom="0";
        PriceTo="100";
    }
    else if(selectPriceFnc.selectedIndex==4)
    {
        PriceFrom="1000";
        PriceTo="1000+";
    }
    else
    {
        PriceFrom=selectPriceFnc.options[(selectPriceFnc.selectedIndex-1)].value;
        PriceTo=selectPriceFnc.options[selectPriceFnc.selectedIndex].value;
    }
}

//取得cagegory值
function selectOnchange_Category(selectCategoryFnc)
{
    SelectedCategory = selectCategoryFnc.options[selectCategoryFnc.selectedIndex];
}

//做回傳值display的模板
function make_card(index, product)
{
    let card1 =
    `
        <div class="card">
            <div class="card-header">
                ${product.category};
            </div>
            <div class="card-body bg-dark text-white">
            <p>
            金額:${product.price} </br>
            時間:${product.date}
            </p>
        </div>
        <div class"card">
            <div class="card-header">
                <a class="btn" data-bs-toggle="collapse" href="#collapse${index}">
                    詳細資訊
                </a>
            </div>
            <div id="collapse${index}" class="collapse" data-bs-parent="#accordion">
                <div class="card-body">
                     <p style="color: black;">${product.description}</p>
                </div>
            </div>
        </div>
    `;
    $('#search_display').append(card1);
}