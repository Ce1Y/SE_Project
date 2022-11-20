package SE_Project.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class CategoryCount {
    @Id
    private int id;

    private String CategoryName;
    private int count;

    public CategoryCount(){}
    public CategoryCount(String categoryName, int id, int count)
    {
        this.CategoryName=categoryName;
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
        return CategoryName;
    }

    public void setCategoryName(String categoryName) {
        this.CategoryName = categoryName;
    }
    @Override
    public String toString() {
        return   "CategoryName: " + CategoryName + "\n" +
                "count: " + count + "\n";
    }
}
