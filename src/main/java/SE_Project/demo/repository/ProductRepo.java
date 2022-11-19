package SE_Project.demo.repository;
import SE_Project.demo.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ProductRepo extends MongoRepository<Product,String>{

    List<Product> findByCategory(String category);

    List<Product> findByDate(String date);

    List<Product> findByCategoryAndDate(String category ,String date);

    List<Product> findByDateLike(String date);

}
