$(document).ready(function() {
    var results = $('#result') ;
    $(function(){
        //console.log($(this).text());
        $.ajax({
            type: "GET",
            url: "/products",
            success: function(allProducts){
                results.html("");
                $.each(allProducts,function (i,product) {

                        results.append(
                            "<div class='card' id = o_card>" +
                            "<div class='card-header'>" + product.id + "</div>" +
                            "<div class='card-body bg-dark text-white'>" +
                            "<p>" + "金額:" + product.price + "<br>" + "分類:" + product.category +"描述"+product.date+
                            "</p>" +
                            `<div class="card">
                                    <div class="card-header">
                                        <a class="btn" data-bs-toggle="collapse" href="#collapse${i}">
                                            詳細資訊
                                        </a>
                                    </div>
                                    <div id="collapse${i}" class="collapse" data-bs-parent="#accordion">
                                        <div class="card-body">                                        
                                             <p style="color: black;">${product.description}</p>
                                        </div>
                                    </div>
                                </div>` +

                            "</div>" +
                            "</div>"
                        )

                });
            }
        });
    });
});