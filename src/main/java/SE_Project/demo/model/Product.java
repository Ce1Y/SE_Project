package SE_Project.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Product {

    private String date;
    private String category;
    private int price;
    private  String id;
    private String description;
    private String type;
    public Product(String date, String category, int price, String description, String type) {
        this.date = date;
        this.category = category;
        this.price = price;
        this.description = description;
        this.type = type;
    }
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


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
