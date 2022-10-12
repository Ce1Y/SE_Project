package SE_Project.demo;


import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QueryController {

    @GetMapping("/")
    public String test(){
        return "test";
    }
}
