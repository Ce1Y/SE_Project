package SE_Project.demo.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController

public class OAuth2Controller{
    @GetMapping("/user")
    public Map<String,Object> user(@AuthenticationPrincipal OAuth2User principal){
        System.out.println(principal.getAttribute("email").toString());
        return Collections.singletonMap("name",principal.getAttribute("name"));
    }

}