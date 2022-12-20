package SE_Project.demo.model2;

import SE_Project.demo.model.Type;

public class CategoryPercentage {
    private String category;
    private int total;

    private Type accountingType;
    private double percentage;

    public Type getAccountingType() {
        return accountingType;
    }

    public void setAccountingType(Type accountingType) {
        this.accountingType = accountingType;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    @Override
    public String toString() {
        return "CategoryPercentage{" +
                "category='" + category + '\'' +
                ", total=" + total +
                ", percentage=" + percentage +
                '}';
    }
}
