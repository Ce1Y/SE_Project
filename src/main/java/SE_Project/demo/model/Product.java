package SE_Project.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Product {

    private String date;
    private String category;
    private int price;
    private  String id;
    private String description;
    private String accDate;

    public String getAccDate() {
        return accDate;
    }

    public void setAccDate(String accDate) {
        this.accDate = accDate;
    }

    private Type accountingType;

    private String loginMethod;
    private String email;
    public String getDescription() {
        return description;
    }

    public String getLoginMethod() {
        return loginMethod;
    }

    public void setLoginMethod(String loginMethod) {
        this.loginMethod = loginMethod;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
    public Product(String date, String category, int price, String description, Type accountingType)
    {
        this.date = date;
        this.category = category;
        this.price = price;
        this.description=description;
        this.accountingType=accountingType;
    }


    public void setDate(String date) {this.date = date;}

    public void setCategory(String category) {this.category = category;}

    public void setPrice(int price) {this.price = price;}



    public String getDate() {return this.date;}

    public String getCategory() {return this.category;}

    public Type getAccountingType() {
        return accountingType;
    }

    public void setAccountingType(Type accountingType) {
        this.accountingType = accountingType;
    }

    public int getPrice() {return this.price;}

    @Override
    public String toString() {
        return   "Date: " + date + "\n" +
                "Category: " + category + "\n" +
                "price: " + price + "\n" +
                "Type:" + accountingType+ "\n";
    }
}