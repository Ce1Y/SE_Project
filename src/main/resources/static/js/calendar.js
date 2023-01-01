
$(document).ready(function () {

    var results = $('#display');
     var monthTime  = document.getElementById('fc-dom-1').textContent;
    $(function () {//頁面初始
      $.ajax({
          type: "GET",
          url: "/setUserDetails?email=" + localStorage.getItem("email") + "&flag=" + localStorage.getItem("flag"),
           success: function (allProducts) {
              console.log("setUser success");
           }
      });
      monthTime  = document.getElementById('fc-dom-1').textContent;
      $.ajax({
          type: "GET",
          url: "/monthPercentage?date=" + monthTime,
          success: function (allProducts) {
              var str = '';
              var flag1=1;
              if (allProducts.length==0) {
                  flag1=0;
                  console.log("nothing");
              }
              else{
              $.each(allProducts, function (i, product) {
                  if(product.accountingType=='income'){
                      str+=`
                       <tr >
                            <td>💵${product.category}</td>
                            <td>${product.total}</td>
                            <td>${product.percentage}</td>
                       </tr>`
                  }
                 else{str+=`
                       <tr style="background: #F0FFF0">
                            <td>💸${product.category}</td>
                            <td>${product.total}</td>
                            <td>${product.percentage}</td>
                       </tr>`
                 }
              });
            }
            results.html("");
            results.append(`
             <table>
                 <thead>
                 <tr class="header" style="color: black;">
                     <th>種類</th>
                     <th>金額</th>
                     <th>百分比%</th>
                 </tr>
                 </thead>
                <tbody>

                </tbody>

             </table>
            `)
            var obToday = document.querySelector('#display tbody');
            if(flag1==1) obToday.innerHTML = str;


          }
        });
    });


    $('.fc-next-button').click(function(){
        $.ajax({
            type: "GET",
            url: "/setUserDetails?email=" + localStorage.getItem("email") + "&flag=" + localStorage.getItem("flag"),
             success: function (allProducts) {
                console.log("setUser success");
             }
        });
        monthTime  = document.getElementById('fc-dom-1').textContent;
        $.ajax({
           type: "GET",
           url: "/monthPercentage?date=" + monthTime,
           success: function (allProducts) {
               var str = '';
               var flag1=1;
               if (allProducts.length==0) {
                   flag1=0;
                   console.log("nothing");
               }
               else{
               $.each(allProducts, function (i, product) {
                   if(product.accountingType=='income'){
                       str+=`
                        <tr >
                             <td>💵${product.category}</td>
                             <td>${product.total}</td>
                             <td>${product.percentage}</td>
                        </tr>`
                   }
                  else{str+=`
                        <tr style="background: #F0FFF0">
                             <td>💸${product.category}</td>
                             <td>${product.total}</td>
                             <td>${product.percentage}</td>

                        </tr>`
                  }
               });
             }
             results.html("");
             results.append(`
              <table>
                  <thead>
                  <tr class="header" style="color: black;">
                      <th>種類</th>
                      <th>金額</th>
                      <th>百分比%</th>
                  </tr>
                  </thead>
                 <tbody>

                 </tbody>

              </table>
             `)
             var obToday = document.querySelector('#display tbody');
             if(flag1==1) obToday.innerHTML = str;


           }
         });
    });
    $('.fc-prev-button').click(function(){
    $.ajax({
        type: "GET",
        url: "/setUserDetails?email=" + localStorage.getItem("email") + "&flag=" + localStorage.getItem("flag"),
         success: function (allProducts) {
            console.log("setUser success");
         }
    });
    monthTime  = document.getElementById('fc-dom-1').textContent;
    $.ajax({
       type: "GET",
       url: "/monthPercentage?date=" + monthTime,
       success: function (allProducts) {
           var str = '';
           var flag1=1;
           if (allProducts.length==0) {
               flag1=0;
               console.log("nothing");
           }
           else{
           $.each(allProducts, function (i, product) {
               if(product.accountingType=='income'){
                   str+=`
                    <tr >
                         <td>💵${product.category}</td>
                         <td>${product.total}</td>
                         <td>${product.percentage}</td>
                    </tr>`
               }
              else{str+=`
                    <tr style="background: #F0FFF0">
                         <td>💸${product.category}</td>
                         <td>${product.total}</td>
                         <td>${product.percentage}</td>

                    </tr>`
              }
           });
         }
         results.html("");
         results.append(`
          <table>
              <thead>
              <tr class="header" style="color: black;">
                  <th>種類</th>
                  <th>金額</th>
                  <th>百分比%</th>
              </tr>
              </thead>
             <tbody>

             </tbody>

          </table>
         `)
         var obToday = document.querySelector('#display tbody');
         if(flag1==1) obToday.innerHTML = str;


       }
     });
    });

});
