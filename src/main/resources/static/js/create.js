function deleteOption(list){
    var index = list.selectedIndex;
    if(index > 3){
        list.options[index] = null;
    }
    else{
        alert("只能刪除自己新增的種類");
    }
}

function addOption(list, value){
    for(i = 0; i < list.options.length; i++) {
        if(value == list.options[i].value){
            return
        }
    }
    var index = list.options.length;
    list.options[index] = new Option(value, value);
    list.options[index].selected = true;
    list.selectedIndex = index;
}

// if CreateData modal is open then fill the value of inputDate
$('#CreateData').on('shown.bs.modal', function () {
    // show me this is work
    console.log("CreateData modal is open");
    var myDate = document.querySelector('#inputDate');
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate());
    myDate.value = tomorrow.toISOString().substr(0, 10);
});