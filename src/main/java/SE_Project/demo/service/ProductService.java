package SE_Project.demo.service;

import SE_Project.demo.model.Product;
import SE_Project.demo.model.Type;
import SE_Project.demo.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class ProductService {
    @Autowired
    private ProductRepo repository;

    public ProductService() {
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }
    public int getAllProductsNum(){
        return (int)repository.count();
    }
    public Optional<Product> getProductById(String id) {
        return repository.findById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return repository.findByCategory(category);
    }

    public List<Product> getProductsByDate(String Date) {
        return repository.findByDate(Date);
    }
    public Product updateProduct(int productId, Product request) {
        Product product = new Product();
        product.setCategory(request.getCategory());
        product.setDate(request.getDate());
        product.setPrice(request.getPrice());
        return repository.save(product);
    }
    public List<Product> getProductsByDescriptionLike(String description){return  repository.findByDescriptionLike(description);}

    public List<Product> getProductsByPriceBetween(int from, int to){
        return repository.findByPriceBetween(from, to);
    }

    public List<Product> getProductsByPriceGreaterThan(int price){
        return repository.findByPriceGreaterThan(price);
    }
    public List<Product> getProductsByCategoryAndDate(String category,String Date){
        return repository.findByCategoryAndDate(category,Date);
    }

    public long getTotalProductsNum()
    {
        return repository.count();
    }
    public List<Product> getProductByDateLike(String Date){
        return repository.findByDateLike(Date);
    }
    public Product createProduct(Product request){
        System.out.println("service"+request.toString());
        return repository.insert(request);
    }
    public Product updateProduct(String productId, Product request){
        Product product = new Product();
        product.setCategory(request.getCategory());
        product.setDate(request.getDate());
        product.setPrice(request.getPrice());
        return repository.save(product);
    }
    public void deleteProductById(String productId) {
        //先用get 找到哪個商品
        //再利用其id 去刪掉
        repository.deleteById(productId);

    }
}
