$(document).ready(function() {
    var results = $('#result') ;
//    $(function(){
//        //console.log($(this).text());
//        $.ajax({
//            type: "GET",
//            url: "http://localhost:8080/products",
//            success: function(allProducts){
//                results.html("");
//                $.each(allProducts,function (i,product) {
//
//                        results.append(
//                            "<div class='card' id = o_card>" +
//                            "<div class='card-header'>" + product.id + "</div>" +
//                            "<div class='card-body bg-dark text-white'>" +
//                            "<p>" + "金額:" + product.price + "<br>" + "分類:" + product.category +"描述"+product.date+
//                            "</p>" +
//                            `<div class="card">
//                                    <div class="card-header">
//                                        <a class="btn" data-bs-toggle="collapse" href="#collapse${i}">
//                                            詳細資訊
//                                        </a>
//                                    </div>
//                                    <div id="collapse${i}" class="collapse" data-bs-parent="#accordion">
//                                        <div class="card-body">
//                                             <p style="color: black;">${product.description}</p>
//                                        </div>
//                                    </div>
//                                </div>` +
//
//                            "</div>" +
//                            "</div>"
//                        )
//
//                });
//            }
//        });
//    });
    $("#btn1").click(function() {
        var data = {
            "date": "10/17",
            "category": "entertainment",
            "price": 1000,
            "id": 34567,
            "description": "testing data"
        }
        $.ajax({
            type:"post",
            url:"http://localhost:8080/products",
            data:JSON.stringify(data),
            contentType:"application/json",
            dataType:'JSON',
            success: function(returnData) {
                console.log(returnData);
                alert("Post Success!!!");
            }
            error: function(data) {
                console.log("mission failed");
            }
        });
    });
});