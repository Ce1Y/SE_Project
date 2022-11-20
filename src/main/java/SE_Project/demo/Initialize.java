package SE_Project.demo;

import SE_Project.demo.model.Product;
import SE_Project.demo.repository.ProductRepo;
import SE_Project.demo.service.CategoryCountService;
import SE_Project.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Initialize implements CommandLineRunner {

    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryCountService categoryCountService;

    @Override
    public void run(String... args) throws Exception
    {
        categoryCountService.InitialCheck();


    }
}
