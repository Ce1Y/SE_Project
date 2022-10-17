package SE_Project.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Product {

    private String date;
    private String category;
    private int price;
    private  String id;
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Product() {}

    public Product(String category, String date, int price) {
        this.date = date;
        this.category = category;
        this.price = price;
    }



    public void setDate(String date) {this.date = date;}

    public void setCategory(String category) {this.category = category;}

    public void setPrice(int price) {this.price = price;}



    public String getDate() {return this.date;}

    public String getCategory() {return this.category;}

    public int getPrice() {return this.price;}

    @Override
    public String toString() {
        return   "Date: " + date + "\n" +
                "Category: " + category + "\n" +
                "price: " + price + "\n";
    }
}
