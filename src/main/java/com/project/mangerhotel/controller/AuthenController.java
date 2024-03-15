package com.project.mangerhotel.controller;


import com.project.mangerhotel.model.AuthenticationRequest;
import com.project.mangerhotel.model.AuthenticationResponse;
import com.project.mangerhotel.model.RegisterRequest;
import com.project.mangerhotel.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController("authenController1")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenController {


    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(authenticationService.register(request));
    }


    @PostMapping("/signin")
    public ResponseEntity<AuthenticationResponse> signIn(
            @RequestBody AuthenticationRequest SignInRequest)
    {
        System.out.println(SignInRequest);
        return ResponseEntity.ok(authenticationService.signIn(SignInRequest));
    }

    @PostMapping("/refresh")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        authenticationService.refreshToken(request, response);
    }
}
