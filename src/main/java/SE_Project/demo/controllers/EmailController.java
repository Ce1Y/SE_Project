package SE_Project.demo.controllers;

import SE_Project.demo.model.EmailDetails;
import SE_Project.demo.model.Product;
import SE_Project.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired private EmailService emailService;

    // Sending a simple Email
    @PostMapping("/sendMail")
    public ResponseEntity<EmailDetails>
    sendMail(@RequestBody EmailDetails details)
    {
        String status
                = emailService.sendSimpleMail(details);
        if(status.equals("Error while sending mail!!!")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(details);
        }
    }

    // Sending email with attachment
    @PostMapping("/sendMailWithAttachment")
    public ResponseEntity<EmailDetails> sendMailWithAttachment(
            @RequestBody EmailDetails details)
    {
        String status
                = emailService.sendMailWithAttachment(details);

        if(status.equals("Error while sending mail!!!")){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(details);
        }
    }
}
