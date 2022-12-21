package SE_Project.demo.controllers;


import SE_Project.demo.model.Product;
import SE_Project.demo.model.Type;
import SE_Project.demo.model2.CategoryCount;
import SE_Project.demo.model2.CategoryPercentage;
import SE_Project.demo.service.CategoryCountService;
import SE_Project.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class QueryController {
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryCountService categoryCountService;
    private String userEmail="";

    private String userMethod="";
    @GetMapping("/setUserDetails")
    public ResponseEntity<String> setUserDetails(@RequestParam String email,@RequestParam String flag){
        userEmail = email;
        userMethod = flag;
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
        String month = date.substring(5,7);
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
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @GetMapping("/monthIncome")//月收入
    public ResponseEntity<List<Product>> monthIncome(@RequestParam String date){
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

    @PutMapping("/products/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") String id, @RequestBody Product productRequest)
    {
        Product origin = productService.getProductById(id).orElse(null);
        if(origin==null)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Product product = productService.updateProduct(id, productRequest);
        return  ResponseEntity.status(HttpStatus.OK).body(product);
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product productRequest){
        Product product = productService.createProduct(productRequest);
        categoryCountService.checkCategoryCount(product.getCategory());
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }
    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> deleteProductById(@PathVariable String productId){
        Product result=productService.getProductById(productId).orElse(null);
        if(result==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        productService.deleteProductById(productId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
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

}