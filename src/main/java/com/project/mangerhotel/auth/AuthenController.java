package com.project.mangerhotel.auth;

import com.project.mangerhotel.domain.dto.ResReq;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenController {


    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<ResReq> register(
            @RequestBody ResReq registerRequest)
    {
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }


    @PostMapping("/signin")
    public ResponseEntity<ResReq> signIn(
            @RequestBody ResReq SignInRequest)
    {
        return ResponseEntity.ok(authenticationService.signIn(SignInRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ResReq> refresh(
            @RequestBody ResReq refreshTokenRequest)
    {
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }
}
