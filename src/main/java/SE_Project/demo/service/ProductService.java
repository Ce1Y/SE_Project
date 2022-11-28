package SE_Project.demo.service;

import SE_Project.demo.model.Product;
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

    public Optional<Product> getProductById(String id) {
        return repository.findById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return repository.findByCategory(category);
    }

    public List<Product> getProductsByDate(String Date) {
        System.out.println(Date);
        System.out.println(repository.findByDate(Date));
        return repository.findByDate(Date);
    }

    public List<Product> getProductsByCategoryAndDate(String category, String Date) {
        return repository.findByCategoryAndDate(category, Date);
    }

    public Product createProduct(Product request) {
        return repository.insert(request);
    }

    public Product updateProduct(int productId, Product request) {
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

    public List<Product> getProductByDate(String Date){
        return repository.findByDate(Date);
    }
    public List<Product> getProductByDateLike(String Date){
        return repository.findByDateLike(Date);
    }
    @Bean
    CommandLineRunner create(ProductRepo productDao){
        if(productDao.count() != 0){
            System.out.println("already exist");
            productDao.deleteAll();
        }
        Product temp = new Product("2022-11-16","dinner",100,"無","支出");
        Product temp1 = new Product("2022-11-16","lunch",200,"麥當勞","支出");
        Product temp2 = new Product("2022-11-16","飲料",300,"麥相","支出");
        Product temp7 = new Product("2022-11-16","打工",1700,"無","收入");
        Product temp3 = new Product("2022-11-15","玩具",1000,"公仔","支出");
        Product temp4 = new Product("2022-11-15","書",500,"作業系統","支出");
        Product temp5 = new Product("2022-11-06","滑鼠",1000,"無","支出");
        Product temp6 = new Product("2022-11-16","零用錢",1000,"無","收入");
        Product temp8 = new Product("2022-11-15","打工",1700,"無","收入");
        Product temp9 = new Product("2022-05-11","dinner",500,"貴族世家","支出");

        List<Product> tmp=new ArrayList<>();
        tmp.add(temp);
        tmp.add(temp1);
        tmp.add(temp2);
        tmp.add(temp3);
        tmp.add(temp4);
        tmp.add(temp5);
        tmp.add(temp6);
        tmp.add(temp8);
        tmp.add(temp9);
        return args -> {
            productDao.saveAll(tmp);
            System.out.println("successful save");
        };
    }
}
