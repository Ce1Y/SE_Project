package SE_Project.demo.model2;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class CategoryCount {
    @Id
    private int id;



    private String categoryName;
    private int count;

    public CategoryCount(){}
    public CategoryCount(String CategoryName, int id, int count)
    {
        this.categoryName=CategoryName;
        this.id = id;
        this.count=1;
    }

    public void addCount()
    {
        count++;
    }
    public int getCount() {
        return count;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String CategoryName) {
        this.categoryName = CategoryName;
    }
    @Override
    public String toString() {
        return   "CategoryName: " + categoryName + "\n" +
                "count: " + count + "\n";
    }
}