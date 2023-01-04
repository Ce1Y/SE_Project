package SE_Project.demo.controllers;


import SE_Project.demo.model.*;
import SE_Project.demo.model2.CategoryCount;
import SE_Project.demo.model2.CategoryPercentage;
import SE_Project.demo.service.CategoryCountService;
import SE_Project.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class QueryController {
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryCountService categoryCountService;

    private final List<Product> virtualDB = new ArrayList<>();
    public  String userEmail="";

    public  String userMethod="";

    @PutMapping("/updateProduct")
    public ResponseEntity<Product> updateProduct(@RequestBody Product productRequest)
    {
        productRequest.setLoginMethod(userMethod);
        productRequest.setEmail(userEmail);
        Product tmp = productService.updateProduct(productRequest);
        if (tmp==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(tmp);
        }
    }
    @DeleteMapping("/deleteProduct")
    public ResponseEntity<?> deleteProductById(@RequestParam String id){
        productService.deleteProductById(id);
        return ResponseEntity.status(HttpStatus.OK).body("success delete");
    }
    @GetMapping("/setUserDetails")
    public ResponseEntity<String> setUserDetails(@RequestParam String email,@RequestParam String flag){
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();

        if(currentUser.getClass()== OAuth2AuthenticationToken.class){
            System.out.println("第三方");
            System.out.println(currentUser.getName());
            userEmail = currentUser.getName();
            userMethod = "第三方";
        }
        else{
            System.out.println("local");
            System.out.println(currentUser.getName());
            userEmail = currentUser.getName();
            userMethod = "local";
        }

        return ResponseEntity.status(HttpStatus.OK).body("success set user");
    }

    @GetMapping("/CategoryCount")
    public ResponseEntity<List<CategoryCount>> getCategoryCount(){
        List<CategoryCount> tmp = categoryCountService.returnallcategorys();
        if (tmp==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(tmp);
        }
    }


    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProductsByQueryParm(@RequestParam(required = false) String category,@RequestParam(required = false) String date) {

        List<Product> tmp;
        if(category==null&&date==null){
            tmp=productService.getAllProducts();
        }else if(category!=null&&date==null){
            tmp=productService.getProductsByCategory(category);
        }else if(category==null&&date!=null){
            tmp=productService.getProductsByDate(date);
        }else{
            tmp=productService.getProductsByCategoryAndDate(category,date);
        }

        List<Product> tmp1 = new ArrayList<>();

        for(Product tmp2:tmp){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                tmp1.add(tmp2);
            }
        }

        if (tmp1.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(tmp1);
        }

    }
    @GetMapping("/date")//當日所有花費
    public ResponseEntity<List<Product>> DateTotal(@RequestParam String date){
        List<Product> result=productService.getProductsByDate(date);

        List<Product> tmp1 = new ArrayList<>();

        for(Product tmp2:result){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                tmp1.add(tmp2);
            }
        }

        if (tmp1==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(tmp1);

    }
    @GetMapping("/monthOutcome")//月花費
    public ResponseEntity<List<Product>> monthOutcome(@RequestParam String date){
        System.out.println(date);
        String month = date.substring(5,7);
        System.out.println(month);
        List<Product> temp = productService.getProductByDateLike(month);

        List<Product> monthTemp = new ArrayList<>();
        for(Product tmp:temp){
            if(tmp.getDate().substring(0,7).equals(date.substring(0,7))&&tmp.getAccountingType()== Type.expense){
                monthTemp.add(tmp);
            }
        }

        List<Product> result = new ArrayList<>();
        for(Product tmp1:monthTemp){
            if(tmp1.getLoginMethod().equals(userMethod)&&tmp1.getEmail().equals(userEmail)){
                result.add(tmp1);
            }
        }
        System.out.println(result);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @GetMapping("/monthIncome")//月收入
    public ResponseEntity<List<Product>> monthIncome(@RequestParam String date){
        System.out.println(date);
        String month = date.substring(5,7);
        List<Product> temp = productService.getProductByDateLike(month);
        List<Product> monthTemp = new ArrayList<>();
        for(Product tmp:temp){
            if(tmp.getDate().substring(0,7).equals(date.substring(0,7))&&tmp.getAccountingType()==Type.income){
                monthTemp.add(tmp);
            }
        }
        List<Product> result = new ArrayList<>();
        for(Product tmp1:monthTemp){
            if(tmp1.getLoginMethod().equals(userMethod)&&tmp1.getEmail().equals(userEmail)){
                result.add(tmp1);
            }
        }
        System.out.println(result);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @GetMapping("/products/category")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam(required = false) String category) {

        List<Product> result = productService.getProductsByCategory(category);

        List<Product> tmp1 = new ArrayList<>();

        for(Product tmp2:result){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                tmp1.add(tmp2);
            }
        }

        if (tmp1.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(tmp1);
        }

    }
    @GetMapping("/products/description")
    public ResponseEntity<List<Product>> getProductsByDescriptionLike(@RequestParam(required = false) String description) {
        List<Product> result = productService.getProductsByDescriptionLike(description);
        List<Product> tmp1 = new ArrayList<>();
        for(Product tmp2:result){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                tmp1.add(tmp2);
            }
        }
        if (tmp1.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(tmp1);
        }
    }
    @GetMapping("/allProducts")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> result = productService.getAllProducts();
        List<Product> tmp1 = new ArrayList<>();
        for(Product tmp2:result){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                tmp1.add(tmp2);
            }
        }
        if (tmp1.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(tmp1);
        }
    }



    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product productRequest){
        productRequest.setLoginMethod(userMethod);
        productRequest.setEmail(userEmail);
        Product product = productService.createProduct(productRequest);
        categoryCountService.checkCategoryCount(product.getCategory());
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }

    @GetMapping("/pricebetween")
    public ResponseEntity<List<Product>> getProductByPriceBetween(@RequestParam String pricefrom, @RequestParam String priceto){
        List<Product> result=productService.getProductsByPriceBetween(Integer.parseInt(pricefrom), Integer.parseInt(priceto));
        List<Product> tmp1 = new ArrayList<>();
        for(Product tmp2:result){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                tmp1.add(tmp2);
            }
        }
        if (tmp1.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(tmp1);
        }
    }

    @GetMapping("/pricegreaterthan")
    public ResponseEntity<List<Product>> getProductByPriceGreater(@RequestParam String price){
        List<Product> result=productService.getProductsByPriceGreaterThan(Integer.parseInt(price));
        List<Product> tmp1 = new ArrayList<>();
        for(Product tmp2:result){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                tmp1.add(tmp2);
            }
        }
        if (tmp1.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(tmp1);
        }
    }

    @GetMapping("/monthPercentage")//每個種類月趴數
    public ResponseEntity<List<CategoryPercentage>> monthPercentage(@RequestParam String date){
        String month = date.substring(5,7);
        List<Product> temp = productService.getProductByDateLike(month);
        List<Product> monthTemp = new ArrayList<>();
        for(Product tmp:temp){
            if(tmp.getDate().substring(0,4).equals(date.substring(0,4))){
                monthTemp.add(tmp);
            }
        }
        int sum = 0;
        List<CategoryPercentage> result = new ArrayList<>();
        for(Product tmp1:monthTemp){
            if(tmp1.getLoginMethod().equals(userMethod)&&tmp1.getEmail().equals(userEmail)){
                sum+= tmp1.getPrice();
                if(result == null){
                    CategoryPercentage num = new CategoryPercentage();
                    num.setCategory(tmp1.getCategory());
                    num.setTotal(tmp1.getPrice());
                    num.setAccountingType(tmp1.getAccountingType());
                    result.add(num);
                }
                else{
                    int decision = 0;
                    for(CategoryPercentage n:result){
                        if(n.getCategory().equals(tmp1.getCategory())&&n.getAccountingType().equals(tmp1.getAccountingType())){
                            decision = 1;
                            n.setTotal(n.getTotal()+tmp1.getPrice());
                            break;
                        }
                    }
                    if(decision==0){
                        CategoryPercentage num = new CategoryPercentage();
                        num.setCategory(tmp1.getCategory());
                        num.setTotal(tmp1.getPrice());
                        num.setAccountingType(tmp1.getAccountingType());
                        result.add(num);
                    }
                }
            }
        }

        for(CategoryPercentage n:result){
            n.setPercentage((double)n.getTotal()/sum*1.0);
            n.setPercentage(Math.round(n.getPercentage()*100.0));//小數點第二位
        }

        List<CategoryPercentage> result1 = new ArrayList<>();
        for(CategoryPercentage n :result){
            if(n.getAccountingType()==Type.expense){
                result1.add(n);
            }
        }
        for(CategoryPercentage n :result){
            if(n.getAccountingType()==Type.income){
                result1.add(n);
            }
        }
       
        return ResponseEntity.status(HttpStatus.OK).body(result1);
    }

    @GetMapping("/monthOutcomeAsCate")
    public ResponseEntity<List<BalanceDayProduct>> monthOutcomeAsCate(String date){
        int dateMonth =  Integer.parseInt(date.substring(5,7));
        int dateYear =  Integer.parseInt(date.substring(0,4));
        List<Product> result = new ArrayList<>();
        List<Product> temp = productService.getProductByDateLike(date);
        for(Product tmp:temp){
            if(tmp.getAccountingType().equals(Type.expense)){
                result.add(tmp);
            }
        }
        List<BalanceDayProduct> BalanceResult = productToBDPFnc(result) ;

//        System.out.println(BalanceResult);
        return ResponseEntity.status(HttpStatus.OK).body(BalanceResult);
    }

    @GetMapping("/monthIncomeAsCate")
    public ResponseEntity<List<BalanceDayProduct>> monthIncomeAsCate(String date){
        int dateMonth =  Integer.parseInt(date.substring(5,7));
        int dateYear =  Integer.parseInt(date.substring(0,4));
        List<Product> result = new ArrayList<>();
        List<Product> temp = productService.getProductByDateLike(date);
        for(Product tmp:temp){
            if(tmp.getAccountingType().equals(Type.income)){
                result.add(tmp);
            }
        }
        List<BalanceDayProduct> BalanceResult = productToBDPFnc(result) ;

//        System.out.println(BalanceResult);
        return ResponseEntity.status(HttpStatus.OK).body(BalanceResult);
    }
    @GetMapping("/sixMonthOutcome")
    public ResponseEntity<List<Product>> sixMonthOutcome(@RequestParam String dateFrom, @RequestParam String dateTo){
        int dateFromMonth =  Integer.parseInt(dateFrom.substring(5,7));
        int dateToMonth =  Integer.parseInt(dateTo.substring(5,7));
        int dateFromYear =  Integer.parseInt(dateFrom.substring(0,4));
        int dateToYear =  Integer.parseInt(dateTo.substring(0,4));
        System.out.println(dateFromMonth);
        System.out.println(dateToMonth);
        System.out.println(dateFromYear);
        System.out.println(dateToYear);
        String totalMonth[] =  {"00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"};
        List<Product> result = new ArrayList<>();
        if(dateToYear==dateFromYear)
        {
            for(int i=dateFromMonth; i<=dateToMonth; i++)
            {
                List<Product> temp = productService.getProductByDateLike(totalMonth[i]);
                for(Product tmp:temp){
                    if(tmp.getDate().substring(5,7).equals(totalMonth[i])&&tmp.getAccountingType().equals(Type.expense)
                            &&tmp.getDate().substring(0,4).equals(String.valueOf(dateFromYear) ) ){
                        result.add(tmp);
                    }
                }
            }
        }
        else
        {
            for(int i=dateFromMonth; i<=12; i++)
            {
                List<Product> temp = productService.getProductByDateLike(totalMonth[i]);
                for(Product tmp:temp){
                    if(tmp.getDate().substring(5,7).equals(totalMonth[i])&&tmp.getAccountingType().equals(Type.expense)
                            &&tmp.getDate().substring(0,4).equals(String.valueOf(dateFromYear) ) ){
                        result.add(tmp);
                    }
                }
            }
            for(int i=1; i<=dateToMonth; i++)
            {
                List<Product> temp = productService.getProductByDateLike(totalMonth[i]);
                for(Product tmp:temp){
                    if(tmp.getDate().substring(5,7).equals(totalMonth[i])&&tmp.getAccountingType().equals(Type.expense)
                            &&tmp.getDate().substring(0,4).equals(String.valueOf(dateToYear) ) ){
                        result.add(tmp);
                    }
                }
            }
        }
        List<Product> tmp1 = new ArrayList<>();
        for(Product tmp2:result){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                tmp1.add(tmp2);
            }
        }
        System.out.println("六個月支出");
        System.out.println(result);
        System.out.println(userEmail);
        System.out.println(userMethod);
        System.out.println(tmp1);
        return ResponseEntity.status(HttpStatus.OK).body(tmp1);
    }



    @GetMapping("/sixMonthIncome")
    public ResponseEntity<List<Product>> sixMonthIncome(@RequestParam String dateFrom, @RequestParam String dateTo){
        int dateFromMonth =  Integer.parseInt(dateFrom.substring(5,7));
        int dateToMonth =  Integer.parseInt(dateTo.substring(5,7));
        int dateFromYear =  Integer.parseInt(dateFrom.substring(0,4));
        int dateToYear =  Integer.parseInt(dateTo.substring(0,4));
        String totalMonth[] =  {"00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"};
        List<Product> result = new ArrayList<>();

        if(dateToYear==dateFromYear)
        {
            for(int i=dateFromMonth; i<=dateToMonth; i++)
            {
                List<Product> temp = productService.getProductByDateLike(totalMonth[i]);
                for(Product tmp:temp){
                    if(tmp.getDate().substring(5,7).equals(totalMonth[i])&&tmp.getAccountingType().equals(Type.income)
                            &&tmp.getDate().substring(0,4).equals(String.valueOf(dateFromYear) ) ){
                        result.add(tmp);
                    }
                }
            }
        }
        else
        {
            for(int i=dateFromMonth; i<=12; i++)
            {
                List<Product> temp = productService.getProductByDateLike(totalMonth[i]);
                for(Product tmp:temp){
                    if(tmp.getDate().substring(5,7).equals(totalMonth[i])&&tmp.getAccountingType().equals(Type.income)
                            &&tmp.getDate().substring(0,4).equals(String.valueOf(dateFromYear) ) ){
                        result.add(tmp);
                    }
                }
            }
            for(int i=1; i<=dateToMonth; i++)
            {
                List<Product> temp = productService.getProductByDateLike(totalMonth[i]);
                for(Product tmp:temp){
                    if(tmp.getDate().substring(5,7).equals(totalMonth[i])&&tmp.getAccountingType().equals(Type.income)
                            &&tmp.getDate().substring(0,4).equals(String.valueOf(dateToYear) ) ){
                        result.add(tmp);
                    }
                }
            }
        }
        List<Product> tmp1 = new ArrayList<>();
        for(Product tmp2:result){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                tmp1.add(tmp2);
            }
        }
        System.out.println("六個月支出");
        System.out.println(result);
        System.out.println(userEmail);
        System.out.println(userMethod);
        System.out.println(tmp1);
        return ResponseEntity.status(HttpStatus.OK).body(tmp1);
    }
    @GetMapping("/YearOutcome")
    public ResponseEntity<List<Product>> YearOutcome(@RequestParam String year){
        List<Product> temp = productService.getProductByDateLike(year);
        List<Product> yearTemp = new ArrayList<>();
        for(Product tmp:temp){
            if(tmp.getDate().substring(0,4).equals(year)&&tmp.getAccountingType().equals(Type.expense)){
                yearTemp.add(tmp);
            }
        }
        List<Product> tmp1 = new ArrayList<>();
        for(Product tmp2:yearTemp){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                tmp1.add(tmp2);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(tmp1);
    }

    @GetMapping("/YearIncome")
    public ResponseEntity<List<Product>> YearIncome(@RequestParam String year){
        List<Product> temp = productService.getProductByDateLike(year);
        List<Product> yearTemp = new ArrayList<>();
        for(Product tmp:temp){
            if(tmp.getDate().substring(0,4).equals(year)&&tmp.getAccountingType().equals(Type.income)){
                yearTemp.add(tmp);
            }
        }
        List<Product> tmp1 = new ArrayList<>();
        for(Product tmp2:yearTemp){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                tmp1.add(tmp2);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(tmp1);
    }

    @GetMapping("/monthBalance")
    public ResponseEntity<List<BalanceDayProduct>> monthBalance(@RequestParam String month){
        List<BalanceDayProduct> balanceResult = getBalanceDayProductFnc(month);
//        System.out.printf("\n\n\n\n\n\n returned balanceResult\n"+ balanceResult);
        return ResponseEntity.status(HttpStatus.OK).body(balanceResult);
    }

    @GetMapping("/yearBalance")
    public ResponseEntity<List<BalanceMonthProduct>> yearBalance(@RequestParam String year){
        List<BalanceMonthProduct> balanceResult = new ArrayList<>();
        List<BalanceDayProduct> tmpBDP;
        List<Product> tmpProductList1;
        String totalMonth[] =  {"-00", "-01", "-02", "-03", "-04", "-05", "-06", "-07", "-08", "-09", "-10", "-11", "-12"};
        String tmpMonth;
        int tmpIncomePrice=0;
        int tmpExpensePrice=0;
        for(int i=1; i<=12; i++)
        {
            BalanceMonthProduct tmpBMP = new BalanceMonthProduct();
            tmpMonth = year + totalMonth[i];
            tmpProductList1 = productService.getProductByDateLike(tmpMonth);
            List<Product> tmpProductList = new ArrayList<>();
            for(Product tmp2:tmpProductList1){
                if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                    tmpProductList.add(tmp2);
                }
            }
            tmpIncomePrice = 0;
            tmpExpensePrice = 0;
            for(Product tmp:tmpProductList){

                if(tmp.getAccountingType().equals(Type.expense))
                {
                    tmpExpensePrice += tmp.getPrice();
                }
                else if(tmp.getAccountingType().equals(Type.income))
                {
                    tmpIncomePrice +=tmp.getPrice();
                }
            }

            tmpBDP = getBalanceDayProductFnc(tmpMonth);
            tmpBMP.setMonth(tmpMonth);
            tmpBMP.setMonthExpense(tmpExpensePrice);
            tmpBMP.setMonthIncome(tmpIncomePrice);
            tmpBMP.setAllBalanceDayProduct(tmpBDP);
            balanceResult.add(tmpBMP);
        }
//        System.out.println("\n\n\nbalanceMonthResult=\n"+balanceResult);
        return ResponseEntity.status(HttpStatus.OK).body(balanceResult);
    }

    public List<BalanceDayProduct> getBalanceDayProductFnc(String month)
    {
        List<Product> monthResult1=productService.getProductByDateLike(month);
        List<Product> monthResult = new ArrayList<>();
        for(Product tmp2:monthResult1){
            if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                monthResult.add(tmp2);
            }
        }

//        for(Product i:monthResult)
//        {
//            System.out.println(i);
//        }
        List<BalanceDayProduct> balanceResult = new ArrayList<>();
        int t=0;
        for(Product tmp:monthResult)
        {

//            System.out.println(t+": "+tmp);
            //月份相等
            if(tmp.getDate().substring(0,7).equals(month))
            {
//                System.out.println("equals");
                BalanceDayProduct balancetmp = new BalanceDayProduct();
                CategoryOfPercent categorytmp = new CategoryOfPercent();
                //這月沒有東西
                if(balanceResult.size()==0)
                {
//                    System.out.println("nothing in this month");
                    //將categoryOfPercent和balanceTmp填滿 丟進balanceResult
                    balancetmp.setDate(tmp.getDate().substring(0,10));
                    categorytmp.setPrice(tmp.getPrice());
                    categorytmp.setCategoryName(tmp.getCategory());
                    if(tmp.getAccountingType().equals(Type.expense))
                    {
                        categorytmp.setAccountingType(Type.expense);
                        balancetmp.setDateExpense(balancetmp.getDateExpense()+tmp.getPrice());
                        balancetmp.setAllCategory(categorytmp);
                    }
                    else
                    {
                        categorytmp.setAccountingType(Type.income);
                        balancetmp.setDateIncome(balancetmp.getDateIncome()+tmp.getPrice());
                        balancetmp.setAllCategory(categorytmp);
                    }
//                    System.out.println(categorytmp);
//                    System.out.println(balancetmp);
                    balanceResult.add(balancetmp);
                }
                //這月有東西
                else
                {
//                    System.out.println("something in this month");
                    for(int j=0; j<balanceResult.size(); j++)
                    {
                        //這個Product的日期是不是在balanceResult裡出現過了
                        //有出現過
                        //將existedBalance填滿
                        if(balanceResult.get(j).getDate().equals(tmp.getDate()))
                        {
//                            System.out.println("already existed");
                            balancetmp = balanceResult.get(j);
                            categorytmp.setPrice(tmp.getPrice());
                            categorytmp.setCategoryName(tmp.getCategory());
//                            System.out.println("this categorytmp's price="+categorytmp.getPrice());
                            if(tmp.getAccountingType()==Type.expense)
                            {
                                categorytmp.setAccountingType(Type.expense);
                                balancetmp.setDateExpense(balancetmp.getDateExpense()+tmp.getPrice());
                                balancetmp.setAllCategory(categorytmp);
                            }
                            else
                            {
                                categorytmp.setAccountingType(Type.income);
                                balancetmp.setDateIncome(balancetmp.getDateIncome()+tmp.getPrice());
                                balancetmp.setAllCategory(categorytmp);
                            }
//                            System.out.println(categorytmp);
//                            System.out.println(balancetmp);
                            balanceResult.set(j, balancetmp);
                            break;
                        }
                        //沒出現過
                        else if(j==balanceResult.size()-1)
                        {
//                            System.out.println("no same date in this month");
                            //將categoryOfPercent和balanceTmp填滿 丟進balanceResult
                            balancetmp.setDate(tmp.getDate().substring(0,10));
                            categorytmp.setPrice(tmp.getPrice());
                            categorytmp.setCategoryName(tmp.getCategory());
                            if(tmp.getAccountingType().equals(Type.expense))
                            {
                                categorytmp.setAccountingType(Type.expense);
                                balancetmp.setDateExpense(balancetmp.getDateExpense()+tmp.getPrice());
                                balancetmp.setAllCategory(categorytmp);
                            }
                            else
                            {
                                categorytmp.setAccountingType(Type.income);
                                balancetmp.setDateIncome(balancetmp.getDateIncome()+tmp.getPrice());
                                balancetmp.setAllCategory(categorytmp);
                            }
//                            System.out.println(categorytmp);
//                            System.out.println(balancetmp);
                            balanceResult.add(balancetmp);
                            break;
                        }
                    }
                }
//                System.out.println("balanceResult="+balanceResult);
            }
        }
        //算出每天中每個category的占比
        for(int i=0; i<balanceResult.size(); i++)
        {
            BalanceDayProduct balancetmp = balanceResult.get(i);
            List<CategoryOfPercent> lctmp = new ArrayList<>();
            int dayTotalIncomePrice = balanceResult.get(i).getDateIncome();
            int dayTotalExpensePrice =  balanceResult.get(i).getDateExpense();
            //每天中的所有category
            for(int j=0; j<balanceResult.get(i).getAllCategory().size(); j++)
            {
                CategoryOfPercent categorytmp = balanceResult.get(i).getAllCategory().get(j);
                if(categorytmp.getAccountingType()==Type.expense)
                {
                    categorytmp.setPercent(
                            Math.round( ( (double)categorytmp.getPrice()/ (double)dayTotalExpensePrice ) * 1000.0) /1000.0 );
                }
                else
                {
                    categorytmp.setPercent(
                            Math.round( ( (double)categorytmp.getPrice()/ (double)dayTotalIncomePrice ) * 1000.0) /1000.0 );
                }
                lctmp.add(categorytmp);
            }
            balancetmp.replaceAllCategory(lctmp);
            balanceResult.set(i, balancetmp);

        }

//        System.out.printf("front already end\n\n\n\n\n\n");
//        System.out.println("balanceResult="+balanceResult);
        return balanceResult;
    }

    public List<BalanceDayProduct> productToBDPFnc(List<Product> inputProduct)
    {
        List<BalanceDayProduct> result = new ArrayList<>();
        for(Product tmp:inputProduct)
        {
            BalanceDayProduct balancetmp = new BalanceDayProduct();
            CategoryOfPercent categorytmp = new CategoryOfPercent();
            //這月沒有東西
            if(result.size()==0)
            {
//                    System.out.println("nothing in this month");
                //將categoryOfPercent和balanceTmp填滿 丟進balanceResult
                balancetmp.setDate(tmp.getDate().substring(0,10));
                categorytmp.setPrice(tmp.getPrice());
                categorytmp.setCategoryName(tmp.getCategory());
                if(tmp.getAccountingType().equals(Type.expense))
                {
                    categorytmp.setAccountingType(Type.expense);
                    balancetmp.setDateExpense(balancetmp.getDateExpense()+tmp.getPrice());
                    balancetmp.setAllCategory(categorytmp);
                }
                else
                {
                    categorytmp.setAccountingType(Type.income);
                    balancetmp.setDateIncome(balancetmp.getDateIncome()+tmp.getPrice());
                    balancetmp.setAllCategory(categorytmp);
                }
//                    System.out.println(categorytmp);
//                    System.out.println(balancetmp);
                result.add(balancetmp);
            }
            //這月有東西
            else
            {
//                    System.out.println("something in this month");
                for(int j=0; j<result.size(); j++)
                {
                    //這個Product的日期是不是在balanceResult裡出現過了
                    //有出現過
                    //將existedBalance填滿
                    if(result.get(j).getDate().equals(tmp.getDate()))
                    {
//                            System.out.println("already existed");
                        balancetmp = result.get(j);
                        categorytmp.setPrice(tmp.getPrice());
                        categorytmp.setCategoryName(tmp.getCategory());
//                            System.out.println("this categorytmp's price="+categorytmp.getPrice());
                        if(tmp.getAccountingType()==Type.expense)
                        {
                            categorytmp.setAccountingType(Type.expense);
                            balancetmp.setDateExpense(balancetmp.getDateExpense()+tmp.getPrice());
                            balancetmp.setAllCategory(categorytmp);
                        }
                        else
                        {
                            categorytmp.setAccountingType(Type.income);
                            balancetmp.setDateIncome(balancetmp.getDateIncome()+tmp.getPrice());
                            balancetmp.setAllCategory(categorytmp);
                        }
//                            System.out.println(categorytmp);
//                            System.out.println(balancetmp);
                        result.set(j, balancetmp);
                        break;
                    }
                    //沒出現過
                    else if(j==result.size()-1)
                    {
//                            System.out.println("no same date in this month");
                        //將categoryOfPercent和balanceTmp填滿 丟進balanceResult
                        balancetmp.setDate(tmp.getDate().substring(0,10));
                        categorytmp.setPrice(tmp.getPrice());
                        categorytmp.setCategoryName(tmp.getCategory());
                        if(tmp.getAccountingType().equals(Type.expense))
                        {
                            categorytmp.setAccountingType(Type.expense);
                            balancetmp.setDateExpense(balancetmp.getDateExpense()+tmp.getPrice());
                            balancetmp.setAllCategory(categorytmp);
                        }
                        else
                        {
                            categorytmp.setAccountingType(Type.income);
                            balancetmp.setDateIncome(balancetmp.getDateIncome()+tmp.getPrice());
                            balancetmp.setAllCategory(categorytmp);
                        }
//                            System.out.println(categorytmp);
//                            System.out.println(balancetmp);
                        result.add(balancetmp);
                        break;
                    }
                }
            }
        }
        return result;
    }

    public List<Product> UserProducts(List<Product> tmp){
        List<Product> result = new ArrayList<>();
        for(Product temp:tmp){
            for(Product tmp2:tmp){
                if(tmp2.getLoginMethod().equals(userMethod)&&tmp2.getEmail().equals(userEmail)){
                    result.add(tmp2);
                }
            }
        }
        return result;
    }


}
