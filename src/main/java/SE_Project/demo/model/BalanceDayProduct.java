package SE_Project.demo.model;

import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.Comparator;
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
               // System.out.println("beforeType="+AllCategory.get(i).getAccountingType()+"plus type"+newCategory.getAccountingType());
                if(AllCategory.get(i).getCategoryName().equals(newCategory.getCategoryName())
                        &&AllCategory.get(i).getAccountingType()==newCategory.getAccountingType())
                {
                    int beforePrice = AllCategory.get(i).getPrice();
                 //   System.out.println("beforePrice="+beforePrice+"plus price"+newCategory.getPrice());

                    AllCategory.get(i).setPrice(newCategory.getPrice()+beforePrice);
                }
                else if(i==AllCategory.size()-1)
                {
                    AllCategory.add(newCategory);
                    break;
                }
            }
        }
        AllCategory.sort(comparatorPrice);
    }

    public void replaceAllCategory(List<CategoryOfPercent> AllCategory)
    {
        this.AllCategory = AllCategory;
    }
    Comparator<CategoryOfPercent> comparatorPrice =new Comparator <CategoryOfPercent>(){
        public int compare(CategoryOfPercent c1,CategoryOfPercent c2){
            if (c1.getPrice()>c2.getPrice())
                return 1;
            else if (c1.getPrice()<c2.getPrice())
                return -1;
            else
                return 0;
        }
    };
    @Override
    public String toString() {
        return   "date: " + date + "\n" +
                "dateIncome: " + dateIncome + "\n" +
                "dateExpense: " + dateExpense + "\n" +
                "AllCategory:" + AllCategory+ "\n";
    }
}