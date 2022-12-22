package SE_Project.demo.service;

import SE_Project.demo.model.Product;
import SE_Project.demo.model3.Budget;
import SE_Project.demo.repository4.BudgetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BudgetService {

    @Autowired
    private BudgetRepo repository;

    public List<Budget> getBudgetByMonth(String month) {
        return repository.findByMonth(month);
    }

    public Budget createBudget(Budget request){
        return repository.insert(request);
    }

    public void deleteBudget(Budget budget){
        repository.delete(budget);
    }
}
