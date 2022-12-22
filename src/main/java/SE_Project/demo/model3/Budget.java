package SE_Project.demo.model3;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Budget {
    private String year;

    private String month;
    private int price;
    private  String id;

    private String loginMethod;

    public void setYear(String year) {
        this.year = year;
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

    public String getYear() {
        return year;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String email;



    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Budget{" +
                "year='" + year + '\'' +
                ", month='" + month + '\'' +
                ", price=" + price +
                ", id='" + id + '\'' +
                ", loginMethod='" + loginMethod + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}