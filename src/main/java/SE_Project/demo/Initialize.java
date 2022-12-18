package SE_Project.demo;

import SE_Project.demo.model.Product;
import SE_Project.demo.model.Type;
import SE_Project.demo.repository.ProductRepo;
import SE_Project.demo.service.CategoryCountService;
import SE_Project.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
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
        if(productService.getAllProductsNum()<15)
        {
            for(int i=0; i<5; i++)
            {
                Product tmp = new Product("2022-11-26", "測試", 500, "測試用描述", Type.income);
                Product tmp1 = new Product("2022-11-30", "晚餐", 100, "讚", Type.expense);
                repository.save(tmp);
                repository.save(tmp1);
            }
        }
        categoryCountService.InitialCheck();



    }
}
