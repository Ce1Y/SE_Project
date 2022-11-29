var PriceFrom="0";
var PriceTo="100";
var SelectedCategory;
var searchType;

$(document).ready(function(){
    $('#click_search1').click(function(){
       $('#search_display').html("");
       if(searchType=="Date")
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
       else if(searchType=="Category")
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
       else if(searchType=="Price")
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
                  url: "http://localhost:8080/pricegreaterthan?price=" + PriceFrom,
                  success: function(allProducts){
                      $.each(allProducts, function(index, product){
                           make_card(index, product);
                      })
                  }
               })
           }
       }
       else if(searchType=="Description")
       {
                $.ajax({
                  type: "GET",
                  url: "http://localhost:8080/products/description?description=" + $("#choose4").val(),
                  success: function(allProducts){
                      $.each(allProducts, function(index, product){
                           make_card(index, product);
                      })
                  }
               })
       }
    });
});

//製造右側選擇器
function selectOnchange(selected_obj)
{
    searchType = selected_obj.options[selected_obj.selectedIndex].value;
    var SelectedContent = $('#SelectContent');
    SelectedContent.html("");
    if(searchType=="Date")
    {
         let SelectedDate=
         `
         <form>
         <input type="date" class="form-control" id="choose1"  value="2022-11-16">
         </form>
         `;
         SelectedContent.append(SelectedDate);
         $("#choose1").change(function(){
               $("#choose1").attr("value", $(this).val());
         })
    }
    else if(searchType=="Category")
    {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/CategoryCount" ,
            success: function(allProducts){
                let selectCatergoryFrame =
                `
                <div class="input-group">
                       <select class="form-select" id="choose2">
                       </select>
                </div>
                `;
                SelectedContent.append(selectCatergoryFrame);
                var obj=document.getElementById("choose2");
                $.each(allProducts, function(index, categoryCount){
                   obj.options.add(new Option(categoryCount.categoryName, index));
                })
                SelectedCategory=obj.options[0].text;
                $("#choose2").change(function(){
                    SelectedCategory=obj.options[obj.selectedIndex].text;
                })
            }
        })
    }
    else if(searchType=="Price")
    {
        let SelectedPrice =
        `
        <div class="input-group">
             <select class="form-select" id="choose3" onchange="selectOnchange_Price(this)">
                 <option value="100"> 0<金額<100 </option>
                 <option value="200"> 100<金額<200 </option>
                 <option value="500"> 200<金額<500 </option>
                 <option value="1000"> 500<金額<1000 </option>
                 <option value="1000+"> 金額>1000 </option>
             </select>
        </div>
        `;
        SelectedContent.append(SelectedPrice);
    }
    else if(searchType=="Description")
    {
        let SelectedDiscr=
        `
        <textarea class="form-control" id="choose4" ></textarea>
        `;
        SelectedContent.append(SelectedDiscr);
    }
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

//做回傳值display的模板
function make_card(index, product)
{
    if( product.accountingType == $('#accountingType_btn input:radio:checked').val() )
    {
        let card1 =
        `
            <div class="card">
                <div class="card-header">
                    ${product.category}
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
}


