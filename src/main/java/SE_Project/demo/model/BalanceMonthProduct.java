package SE_Project.demo.model;

import java.util.ArrayList;
import java.util.List;

public class BalanceMonthProduct {
    String month;
    int monthIncome=0;
    int monthExpense=0;
    List<BalanceDayProduct> AllBalanceDayProduct;

    public BalanceMonthProduct() {
        AllBalanceDayProduct = new ArrayList<>();
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getMonthIncome() {
        return monthIncome;
    }

    public void setMonthIncome(int monthIncome) {
        this.monthIncome = monthIncome;
    }

    public int getMonthExpense() {
        return monthExpense;
    }

    public void setMonthExpense(int monthExpense) {
        this.monthExpense = monthExpense;
    }

    public List<BalanceDayProduct> getAllBalanceDayProduct() {
        return AllBalanceDayProduct;
    }

    public void setAllBalanceDayProduct(List<BalanceDayProduct> allBalanceDayProduct) {
        AllBalanceDayProduct = allBalanceDayProduct;
    }

    @Override
    public String toString() {
        return   "month: " + month + "\n" +
                "monthIncome: " + monthIncome + "\n" +
                "monthExpense: " + monthExpense + "\n" +
                "All DayCategory:" + AllBalanceDayProduct+ "\n";
    }
}
