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
    private ProductRepo repository2;
    public ProductService(){}
    public List<Product> getAllProducts(){
        return repository2.findAll();
    }
    public Optional<Product> getProductById(String id){
        return  repository2.findById(id);
    }
    public List<Product> getProductsByCategory(String category){
        return repository2.findByCategory(category);
    }

    public List<Product> getProductByDateLike(String Date){
        return repository2.findByDateLike(Date);
    }
    public List<Product> getProductsByDate(String Date){
        return repository2.findByDate(Date);
    }

    public List<Product> getProductsByPriceBetween(int from, int to){
        return repository2.findByPriceBetween(from, to);
    }

    public List<Product> getProductsByPriceLessThan(int price){
        return repository2.findByPriceLessThan(price);
    }
    public List<Product> getProductsByCategoryAndDate(String category,String Date){
        return repository2.findByCategoryAndDate(category,Date);
    }

    public long getTotalProductsNum()
    {
        return repository2.count();
    }
    public Product createProduct(Product request){
        System.out.println("service"+request.toString());
        return repository2.insert(request);
    }
    public Product updateProduct(String productId, Product request){
        Product product = new Product();
        product.setCategory(request.getCategory());
        product.setDate(request.getDate());
        product.setPrice(request.getPrice());
        return repository2.save(product);
    }
    public void deleteProductById(String productId) {
        //先用get 找到哪個商品
        //再利用其id 去刪掉
        repository2.deleteById(productId);

    }


}
