package com.project.mangerhotel.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@RestController

public class TestController {

    @GetMapping("/")
    public ResponseEntity<String> test(@AuthenticationPrincipal OidcUser principal){
        try {
            if (principal != null) {
                return ResponseEntity.ok(principal.getAttributes().toString());
            }
            return ResponseEntity.ok("image storage");
        }catch (Exception e){
            System.out.println(e);
        }
        return null;
    }
}
