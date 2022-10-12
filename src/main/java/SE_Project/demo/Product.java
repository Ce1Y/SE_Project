package SE_Project.demo;

public class Product {

    private String date;
    private String category;
    private int price;
    private int id;

    public Product() {}

    public Product(String category, String date, int price, int id) {
        this.id = id;
        this.date = date;
        this.category = category;
        this.price = price;
    }

    public void setId(int id) {this.id = id;}

    public void setDate(String date) {this.date = date;}

    public void setCategory(String category) {this.category = category;}

    public void setPrice(int price) {this.price = price;}

    public int getId() {return this.id;}

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
