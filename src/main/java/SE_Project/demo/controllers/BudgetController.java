package SE_Project.demo.controllers;

import SE_Project.demo.model3.Budget;
import SE_Project.demo.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    private String userEmail="";

    private String userMethod="";
    @GetMapping("/setUserForBudget")
    public ResponseEntity<String> setUserDetails(@RequestParam String email, @RequestParam String flag){
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();

        if(currentUser.getClass()== OAuth2AuthenticationToken.class){
            System.out.println("第三方");
            System.out.println(currentUser.getName());
            userEmail = currentUser.getName();
            userMethod = "第三方";
        }
        else{
            System.out.println("local");
            System.out.println(currentUser.getName());
            userEmail = currentUser.getName();
            userMethod = "local";
        }

        return ResponseEntity.status(HttpStatus.OK).body("success set user");
    }

    @GetMapping("/monthBudget")//月預算
    public ResponseEntity<List<Budget>> monthBudget(@RequestParam String month){

        Date year = new Date();
        List<Budget> temp = budgetService.getBudgetByMonth(month.substring(5));

        List<Budget> result = new ArrayList<>();
        for(Budget tmp1:temp){
            if(tmp1.getLoginMethod().equals(userMethod)&&tmp1.getEmail().equals(userEmail)&&tmp1.getYear().equals(year.toString().substring(24))){
                result.add(tmp1);
            }
        }
        if (result.size()==0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        }
        System.out.println(result);
        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

    @PostMapping("/addBudget")
    public ResponseEntity<Budget> createBudget(@RequestBody Budget request){
        Date year = new Date();
        request.setYear(year.toString().substring(24));
        request.setMonth(request.getMonth().substring(5));
        Budget budget = budgetService.createBudget(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(budget);
    }

    @PutMapping("/updateBudget")
    public ResponseEntity<Budget> updateBudget(@RequestBody Budget request){
        Date year = new Date();
        request.setYear(year.toString().substring(24));
        request.setMonth(request.getMonth().substring(5));
        List<Budget> temp = budgetService.getBudgetByMonth(request.getMonth());
        List<Budget> result = new ArrayList<>();
        for(Budget tmp1:temp){
            if(tmp1.getLoginMethod().equals(userMethod)&&tmp1.getEmail().equals(userEmail)&&tmp1.getYear().equals(year.toString().substring(24))){
                result.add(tmp1);
            }
        }
        for(Budget tmp:result){
            budgetService.deleteBudget(tmp);
        }
        Budget budget = budgetService.createBudget(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(budget);
    }

}
