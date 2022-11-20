package SE_Project.demo.service;

import SE_Project.demo.model.CategoryCount;
import SE_Project.demo.model.Product;
import SE_Project.demo.repository.CategoryCountRepo;
import SE_Project.demo.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryCountService {
    @Autowired
    private CategoryCountRepo repository1;

    @Autowired
    private ProductService productService;




    public CategoryCountService(){}


    public void checkCategoryCount(String tmpcname)
    {
        List<CategoryCount> tmpCate = repository1.findByCategoryName(tmpcname);
        if(tmpCate.size()==0)
        {
            int id = (int)productService.getTotalProductsNum();
            CategoryCount tmpCreate = new CategoryCount(tmpcname, id, 0);
            repository1.insert(tmpCreate);
        }
        else
        {
            for(CategoryCount c:tmpCate)
            {
                c.setCount((c.getCount()+1));
                repository1.save(c);

            }
            System.out.println(tmpcname);
        }
    }

    public void InitialCheck(){
        List<Product> tmpPro =  productService.getAllProducts();

        if( tmpPro!=null && (repository1.count()==0) )
        {
            for(Product i:tmpPro)
            {
                checkCategoryCount(i.getCategory());
            }
        }
    }





}
