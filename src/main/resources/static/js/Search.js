$(document).ready(function(){


console.log($('#btnradio1').val());
console.log($('#btnradio2').val());
//    $('#inputGroupSelect1').append(addselect);
//    });
});
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
        <input type="date" class="form-control" id="Date-name">
        </form>

        `;
        SelectedContent.append(SelectedDate);
    }
    else if(searchType=="category")
    {

    }
    else if(searchType=="price")
    {
        let SelectedPrice =
        `
        <div class="input-group">
             <select class="form-select" onchange="selectOnchange_Price(this)">
                 <option value="price100"> 金額<100 </option>
                 <option value="price200"> 金額<200 </option>
                 <option value="price500"> 金額<500 </option>
                 <option value="price1000"> 金額<1000 </option>
                 <option value="price1000+"> 金額>1000 </option>
             </select>
        </div>
        `;
        SelectedContent.append(SelectedPrice);
    }
    else if(searchType=="description")
    {

    }
    console.log(searchType);
}

function selectOnchange_Price(selectPriceFnc)
{


}