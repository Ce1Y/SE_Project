package SE_Project.demo.controller;


import SE_Project.demo.model.Product;
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

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody @Valid Product productRequest){
        Product product = productService.createProduct(productRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }
    @DeleteMapping("/products/{productId}")//刪除
    public ResponseEntity<?> deleteProductById(@PathVariable String productId){
        Product result=productService.getProductById(productId).orElse(null);
        if(result==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        productService.deleteProductById(productId);
        System.out.println("Delete Successful");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProductsByQueryParm() {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts());
    }
    @GetMapping("/date")//當日所有花費
    public ResponseEntity<List<Product>> DateTotal(@RequestParam String date){
        List<Product> result=productService.getProductByDate(date);
        if(result==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @GetMapping("/monthOutcome")
    public ResponseEntity<List<Product>> monthOutcome(@RequestParam String date){
        String month = date.substring(5,7);
        List<Product> temp = productService.getProductByDateLike(month);
        List<Product> monthTemp = new ArrayList<>();
        for(Product tmp:temp){
            if(tmp.getDate().substring(5,7).equals(month)&&tmp.getType().equals("支出")){
                monthTemp.add(tmp);
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(monthTemp);
    }
    @GetMapping("/monthIncome")
    public ResponseEntity<List<Product>> monthIncome(@RequestParam String date){
        String month = date.substring(5,7);
        List<Product> temp = productService.getProductByDateLike(month);
        List<Product> monthTemp = new ArrayList<>();
        for(Product tmp:temp){
            if(tmp.getDate().substring(5,7).equals(month)&&tmp.getType().equals("收入")){
                monthTemp.add(tmp);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(monthTemp);
    }

}
