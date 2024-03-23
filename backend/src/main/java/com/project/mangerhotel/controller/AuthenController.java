package com.project.mangerhotel.controller;


import com.project.mangerhotel.model.AuthenticationRequest;
import com.project.mangerhotel.model.AuthenticationResponse;
import com.project.mangerhotel.model.RegisterRequest;
import com.project.mangerhotel.services.AuthenticationService;
import com.project.mangerhotel.services.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationProvider;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.Map;

@RestController("authenController1")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenController {


    private final AuthenticationService authenticationService;

    private final JWTService jwtService;


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

    @GetMapping("/oauth2/register")
    public ResponseEntity<AuthenticationResponse> registerWithOauth2(@RequestParam("email") String email,@RequestParam("name") String name ){
        RegisterRequest registerRequest= RegisterRequest.builder()
                .email(email)
                .userName(name)
                .password(name)
                .build();
        return ResponseEntity.ok(authenticationService.signUpWithOauth2(registerRequest));
    }
    @GetMapping("/oauth2/signin")
    public ResponseEntity<AuthenticationResponse> loginWithOauth2(@RequestParam("email") String email,@RequestParam("name") String name ){
        AuthenticationRequest registerRequest= AuthenticationRequest.builder()
                .email(email)
                .password(name)
                .build();
        return ResponseEntity.ok(authenticationService.signInWithOAuth2(registerRequest));
    }
}
