package SE_Project.demo;

import SE_Project.demo.model.Product;
import SE_Project.demo.model.Type;
import SE_Project.demo.repository.ProductRepo;
import SE_Project.demo.service.CategoryCountService;
import SE_Project.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class Initialize implements CommandLineRunner {
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryCountService categoryCountService;
    @Autowired
    private ProductRepo repository;
    @Override
    public void run(String... args) throws Exception
    {
        if(productService.getAllProductsNum()<1)
        {
            for(int i=0; i<11; i++)
            {
                Product tmp = new Product("2022-12-23", "測試", 500, "測試用描述", Type.income);
                tmp.setLoginMethod("local");
                tmp.setEmail("123456@gmail.com");
                tmp.setAccDate("2022-12-23T11:22:51");
                repository.save(tmp);
            }
            Product tmp = new Product("2022-12-22", "測試", 500, "測試用描述", Type.income);
            tmp.setLoginMethod("local");
            tmp.setEmail("123456@gmail.com");
            tmp.setAccDate("2022-12-22T10:22:51");
            repository.save(tmp);
        }
        categoryCountService.InitialCheck();
    }
}