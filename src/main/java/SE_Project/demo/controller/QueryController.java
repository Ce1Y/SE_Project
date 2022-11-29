package SE_Project.demo.controller;


import SE_Project.demo.model.Product;
import SE_Project.demo.model.Type;
import SE_Project.demo.model2.CategoryCount;
import SE_Project.demo.service.CategoryCountService;
import SE_Project.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
public class QueryController {
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryCountService categoryCountService;


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
    @GetMapping("/date")//當日所有花費
    public ResponseEntity<List<Product>> DateTotal(@RequestParam String date){
        List<Product> result=productService.getProductsByDate(date);
        if(result==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        System.out.println("Date");
        System.out.println(result);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @GetMapping("/monthOutcome")//月花費
    public ResponseEntity<List<Product>> monthOutcome(@RequestParam String date){
        String month = date.substring(5,7);
        List<Product> temp = productService.getProductByDateLike(month);
        System.out.println("month");
        System.out.println(temp);
        List<Product> monthTemp = new ArrayList<>();
        for(Product tmp:temp){
            if(tmp.getDate().substring(5,7).equals(month)&&tmp.getAccountingType()== Type.expense){
                monthTemp.add(tmp);
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(monthTemp);
    }
    @GetMapping("/monthIncome")//月收入
    public ResponseEntity<List<Product>> monthIncome(@RequestParam String date){
        String month = date.substring(5,7);
        List<Product> temp = productService.getProductByDateLike(month);
        List<Product> monthTemp = new ArrayList<>();
        for(Product tmp:temp){
            if(tmp.getDate().substring(5,7).equals(month)&&tmp.getAccountingType()==Type.income){
                monthTemp.add(tmp);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(monthTemp);
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
    public ResponseEntity<Product> createProduct(@RequestBody Product productRequest){
        System.out.println("aaaaaaaaaaaaaa");
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

}
