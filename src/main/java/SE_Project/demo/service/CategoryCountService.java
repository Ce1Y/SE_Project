package SE_Project.demo.service;

import SE_Project.demo.model2.CategoryCount;
import SE_Project.demo.model.Product;
import SE_Project.demo.repository2.CategoryCountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryCountService {
    @Autowired
    private CategoryCountRepo repository2;

    @Autowired
    private ProductService productService;




    public CategoryCountService(){}


    public void checkCategoryCount(String tmpcname)
    {
        List<CategoryCount> tmpCate = repository2.findByCategoryName(tmpcname);
        if(tmpCate.size()==0)
        {
            int id = (int)productService.getTotalProductsNum();
            CategoryCount tmpCreate = new CategoryCount(tmpcname, (id+1), 1);
            repository2.insert(tmpCreate);
        }
        else
        {
            for(CategoryCount c:tmpCate)
            {
                c.setCount((c.getCount()+1));
                repository2.save(c);
            }
            System.out.println(tmpcname);
        }
    }
    public List<CategoryCount> returnallcategorys()
    {
        Sort sort = Sort.by(Sort.Direction.DESC, "count");
        return repository2.findAll(sort);
    }
    public void InitialCheck(){
        List<Product> tmpPro =  productService.getAllProducts();

        if( tmpPro!=null && (repository2.count()==0) )
        {
            for(Product i:tmpPro)
            {
                checkCategoryCount(i.getCategory());
            }
        }
    }





}
