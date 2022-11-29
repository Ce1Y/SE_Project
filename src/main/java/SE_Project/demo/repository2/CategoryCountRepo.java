package SE_Project.demo.repository2;

import SE_Project.demo.model2.CategoryCount;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CategoryCountRepo extends MongoRepository<CategoryCount,String>{
    List<CategoryCount> findByCategoryName(String categoryName);



    //    update product with query
    //    @Modifying
    //    @Query("update User u set u.firstname = ?1, u.lastname = ?2 where u.id = ?3")
    //    void setUserInfoById(String firstname, String lastname, Integer userId);
}