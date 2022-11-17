package SE_Project.demo.service;

import SE_Project.demo.model.Product;
import SE_Project.demo.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
@Component
public class ProductService {
    @Autowired
    private ProductRepo repository;
    public ProductService(){}
    public List<Product> getAllProducts(){
        return repository.findAll();
    }
    public Optional<Product> getProductById(String id){
        return  repository.findById(id);
    }
    public List<Product> getProductsByCategory(String category){
        return repository.findByCategory(category);
    }

    public List<Product> getProductsByDate(String Date){
        return repository.findByDate(Date);
    }

    public List<Product> getProductsByCategoryAndDate(String category,String Date){
        return repository.findByCategoryAndDate(category,Date);
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
