
package SE_Project.demo.controllers;

import SE_Project.demo.domain.User;
import SE_Project.demo.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Controller
public class AuthController {
    @Autowired
    HttpServletResponse response1;
    @Autowired
    private CustomUserDetailsService userService;
    


    public void loginTest() throws IOException {
        response1.sendRedirect("http://localhost:8080/login.html");
    }


    @GetMapping(value = "/getSignup")
    public User signupTest() {
        User user = new User();

        return user;
    }


    @PostMapping(value = "/signup")
    public ResponseEntity<User> createNewUser(@RequestBody User user) {
        System.out.println(user);
        User userExists = userService.findUserByEmail(user.getEmail());
        if (userExists != null) {
            System.out.println("already exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        else {
            userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        }
    }


}
