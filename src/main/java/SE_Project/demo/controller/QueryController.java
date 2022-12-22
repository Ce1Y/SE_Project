package SE_Project.demo.controller;


import SE_Project.demo.model.*;
import SE_Project.demo.model2.CategoryCount;
import SE_Project.demo.service.CategoryCountService;
import SE_Project.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
public class QueryController {

    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryCountService categoryCountService;
    private final List<Product> virtualDB = new ArrayList<>();


    @PostConstruct
    private void initDB() {

    }
    @GetMapping("/CategoryCount")
    public ResponseEntity<List<CategoryCount>> getCategoryCount(){

        List<CategoryCount> tmp = categoryCountService.returnallcategorys();
        if (tmp==null) {
            System.out.println("Having no categorys");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(tmp);
        }
    }


    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") String id) {
        Product tmp= productService.getProductById(id).orElse(null);;
        if (tmp==null) {
            System.out.println("Having nothing");
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
        if (tmp.isEmpty()) {
            System.out.println("Having nothing");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(tmp);
        }

    }

    @GetMapping("/products/category")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam(required = false) String category) {
        List<Product> result = productService.getProductsByCategory(category);
        if(result==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @GetMapping("/products/description")
    public ResponseEntity<List<Product>> getProductsByDescriptionLike(@RequestParam(required = false) String description) {

        List<Product> result = productService.getProductsByDescriptionLike(description);
        if(result==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @PutMapping("/products/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") String id, @RequestBody Product productRequest)
    {
        Product origin = productService.getProductById(id).orElse(null);
        if(origin==null)
        {
            System.out.println("wrong id update");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Product product = productService.updateProduct(id, productRequest);
        System.out.println("update success");
        return  ResponseEntity.status(HttpStatus.OK).body(product);

    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody @Valid Product productRequest){
        Product product = productService.createProduct(productRequest);
        categoryCountService.checkCategoryCount(product.getCategory());
        System.out.println("createProduct QueryController");
        System.out.println(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }


    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> deleteProductById(@PathVariable String productId){
        Product result=productService.getProductById(productId).orElse(null);
        if(result==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        productService.deleteProductById(productId);
        System.out.println("Delete Successful");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/date")//當日所有花費
    public ResponseEntity<List<Product>> DateTotal(@RequestParam String date){
        List<Product> result=productService.getProductsByDate(date);
        if(result==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/pricebetween")
    public ResponseEntity<List<Product>> getProductByPriceBetween(@RequestParam String pricefrom, @RequestParam String priceto){
        List<Product> result=productService.getProductsByPriceBetween(Integer.parseInt(pricefrom), Integer.parseInt(priceto));
        if(result==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/pricegreaterthan")
    public ResponseEntity<List<Product>> getProductByPriceGreater(@RequestParam String price){
        List<Product> result=productService.getProductsByPriceGreaterThan(Integer.parseInt(price));
        if(result==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/monthOutcome")
    public ResponseEntity<List<Product>> monthOutcome(@RequestParam String date){
        String month = date.substring(0,7);
        List<Product> temp = productService.getProductByDateLike(month);
        List<Product> monthTemp = new ArrayList<>();
        for(Product tmp:temp){
            if(tmp.getDate().substring(0,7).equals(month)&&tmp.getAccountingType().equals(Type.expense)){
                monthTemp.add(tmp);
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(monthTemp);
    }
    @GetMapping("/monthIncome")
    public ResponseEntity<List<Product>> monthIncome(@RequestParam String date){
        String month = date.substring(0,7);
        List<Product> temp = productService.getProductByDateLike(month);
        List<Product> monthTemp = new ArrayList<>();
        for(Product tmp:temp){
            //equals要改type.income 不能直接寫"income"
            if(tmp.getDate().substring(0,7).equals(month)&&tmp.getAccountingType().equals(Type.income)){
                monthTemp.add(tmp);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(monthTemp);
    }

    //和BalanceDayProduct一樣 但是不加percent 加快執行速度
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

        System.out.println(BalanceResult);
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

        System.out.println(BalanceResult);
        return ResponseEntity.status(HttpStatus.OK).body(BalanceResult);
    }
    @GetMapping("/sixMonthOutcome")
    public ResponseEntity<List<Product>> sixMonthOutcome(@RequestParam String dateFrom, @RequestParam String dateTo){
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
                            &&tmp.getDate().substring(0,4).equals(String.valueOf(dateFromYear) ) ){
                        result.add(tmp);
                    }
                }
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);
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
                            &&tmp.getDate().substring(0,4).equals(String.valueOf(dateFromYear) ) ){
                        result.add(tmp);
                    }
                }
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);
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
        return ResponseEntity.status(HttpStatus.OK).body(yearTemp);
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
        return ResponseEntity.status(HttpStatus.OK).body(yearTemp);
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
        List<Product> tmpProductList;
        String totalMonth[] =  {"-00", "-01", "-02", "-03", "-04", "-05", "-06", "-07", "-08", "-09", "-10", "-11", "-12"};
        String tmpMonth;
        int tmpIncomePrice=0;
        int tmpExpensePrice=0;
        for(int i=1; i<=12; i++)
        {
            BalanceMonthProduct tmpBMP = new BalanceMonthProduct();
            tmpMonth = year + totalMonth[i];
            tmpProductList = productService.getProductByDateLike(tmpMonth);

            for(Product tmp:tmpProductList){
                tmpIncomePrice = 0;
                tmpExpensePrice = 0;
                if(tmp.getDate().substring(0,7).equals(tmpMonth)&&tmp.getAccountingType().equals(Type.expense))
                {
                    tmpExpensePrice += tmp.getPrice();
                }
                else if(tmp.getDate().substring(0,7).equals(tmpMonth)&&tmp.getAccountingType().equals(Type.income))
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
        List<Product> monthResult=productService.getProductByDateLike(month);
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
        return sortBDP(balanceResult);
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
        return sortBDP(result);
    }

    public List<BalanceDayProduct> sortBDP(List<BalanceDayProduct> tmpBDP)
    {
        int len = tmpBDP.toArray().length;
        while (len > 1)
        {
            len--;
            for (int i = 0; i < len; i++)
            {
                // 如果前面的元素比後面的元素要大，則交換元素位置
                if( Integer.parseInt( tmpBDP.get(i).getDate().substring(8,10) ) > Integer.parseInt( tmpBDP.get(i+1).getDate().substring(8,10) ))
                {
//                    System.out.println(i+Integer.parseInt( tmpBDP.get(i).getDate().substring(8,10) ));
//                    System.out.println(i+1+Integer.parseInt( tmpBDP.get(i+1).getDate().substring(8,10) ));
                    BalanceDayProduct tmp = tmpBDP.get(i);
                    tmpBDP.set(i, tmpBDP.get(i+1));
                    tmpBDP.set(i+1, tmp);
                }
            }
        }
        return  tmpBDP;
    }
}

