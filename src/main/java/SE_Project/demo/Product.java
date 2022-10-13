package SE_Project.demo;

public class Product {

    private String id;
    private String date;
    private String category;
    private int price;

    public Product() {}

    public Product(String id, String category, String date, int price) {
        this.id = id;
        this.date = date;
        this.category = category;
        this.price = price;
    }

    public void setId(String id) {this.id = id;}

    public void setDate(String date) {this.date = date;}

    public void setCategory(String category) {this.category = category;}

    public void setPrice(int price) {this.price = price;}

    public String getId() {return this.id;}

    public String getDate() {return this.date;}

    public String getCategory() {return this.category;}

    public int getPrice() {return this.price;}

    @Override
    public String toString() {
        return  "Id: " + id + "\n" +
                "Date: " + date + "\n" +
                "Category: " + category + "\n" +
                "price: " + price + "\n";
    }
}
