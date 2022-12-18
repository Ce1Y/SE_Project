package SE_Project.demo.model;

import java.util.ArrayList;
import java.util.List;

public class BalanceDayProduct {

    String date;
    int dateIncome=0;
    int dateExpense=0;
    List<CategoryOfPercent> AllCategory;

    public BalanceDayProduct() {
        AllCategory = new ArrayList<>();
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getDateIncome() {
        return dateIncome;
    }

    public void setDateIncome(int dateIncome) {
        this.dateIncome = dateIncome;
    }

    public int getDateExpense() {
        return dateExpense;
    }

    public void setDateExpense(int dateExpense) {
        this.dateExpense = dateExpense;
    }

    public List<CategoryOfPercent> getAllCategory() {
        return AllCategory;
    }

    public void setAllCategory(CategoryOfPercent newCategory) {
        if(AllCategory.size()==0)
        {
            AllCategory.add(newCategory);
        }
        else
        {
            for(int i=0; i<AllCategory.size(); i++)
            {
                if(AllCategory.get(i).getCategoryName().equals(newCategory.getCategoryName())
                    &&AllCategory.get(i).getAccountingType()==newCategory.getAccountingType())
                {
                    AllCategory.get(i).setPrice(newCategory.getPrice()+AllCategory.get(i).getPrice());
                }
                else if(i==AllCategory.size()-1)
                {
                    AllCategory.add(newCategory);
                }
            }
        }
    }

    public void replaceAllCategory(List<CategoryOfPercent> AllCategory)
    {
        this.AllCategory = AllCategory;
    }
    @Override
    public String toString() {
        return   "date: " + date + "\n" +
                "dateIncome: " + dateIncome + "\n" +
                "dateExpense: " + dateExpense + "\n" +
                "AllCategory:" + AllCategory+ "\n";
    }
}
