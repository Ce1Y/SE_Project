package SE_Project.demo.model;

public class CategoryOfPercent {
    String categoryName;
    int price;
    Type accountingType;
    double percent;

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Type getAccountingType() {
        return accountingType;
    }

    public void setAccountingType(Type accountingType) {
        this.accountingType = accountingType;
    }

    public double getPercent() {
        return percent;
    }

    public void setPercent(double percent) {
        this.percent = percent;
    }

    @Override
    public String toString() {
        return   "categoryName: " + categoryName + "\n" +
                "price: " + price + "\n" +
                "percent: " + percent + "\n" +
                "Type:" + accountingType+ "\n";
    }
}
