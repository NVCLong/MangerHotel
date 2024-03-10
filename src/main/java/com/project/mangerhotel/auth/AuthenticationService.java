package com.project.mangerhotel.auth;

import com.project.mangerhotel.domain.dto.ResReq;
import com.project.mangerhotel.domain.entity.Role;
import com.project.mangerhotel.domain.entity.UserEntity;
import com.project.mangerhotel.repositories.UserRepository;
import com.project.mangerhotel.services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.ResourceBundle;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    private final AuthenticationManager authenticationManager;

    public ResReq register(ResReq registrationRequest) {
        ResReq response = new ResReq();
        try {
            UserEntity user = new UserEntity();
            user.setEmail(registrationRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            user.setRole(Role.valueOf(registrationRequest.getRole()));
            UserEntity savedUser = userRepository.save(user);
            if (savedUser != null && savedUser.getId() != null) {
                    response.setUserEntity(savedUser);
                    var jwt = jwtService.generateToken(savedUser);
                    var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),user);
                    response.setToken(jwt);
                    response.setRefreshToken(refreshToken);
                    response.setExpirationTime("24hr");
                    response.setMessage("User signed in successfully");
                    response.setStatusCode(200);
                    response.setMessage("User registered successfully");
                    response.setStatusCode(200);
                }
            }catch(Exception e){
                response.setMessage("User registration failed");
                response.setStatusCode(500);
            }

            return response;
    }

    public ResReq signIn(ResReq signInRequest) {
        ResReq response = new ResReq();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signInRequest.getEmail(),
                            signInRequest.getPassword()
                    )
            );

            var user = userRepository.findByEmail(signInRequest.getEmail())
                    .orElseThrow();
            System.out.println("User is: " + user);

            var jwt = jwtService.generateToken(user);
            var refeshToken = jwtService.generateRefreshToken(new HashMap<>(),user);
            response.setToken(jwt);
            response.setRefreshToken(refeshToken);
            response.setExpirationTime("24hr");
            response.setMessage("User signed in successfully");
            response.setStatusCode(200);

        }catch(Exception e){
            response.setMessage("User sign in failed");
            response.setStatusCode(500);
        }
            UserEntity user =  userRepository.findByEmail(signInRequest.getEmail())
                    .orElseThrow();
            String jwtToken = jwtService.generateToken(user);
            response.setToken(jwtToken);
            response.setMessage("User signed in successfully");
            response.setStatusCode(200);

        return response;
    }

    public ResReq refreshToken(ResReq refreshTokenRequest) {
        ResReq response = new ResReq();
        String userEmail = jwtService.extractEmail(refreshTokenRequest.getRefreshToken());
        UserEntity user = userRepository.findByEmail(userEmail).orElseThrow();
        if(jwtService.isTokenValidate(refreshTokenRequest.getToken(), user)) {
            var jwt = jwtService.generateToken(user);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenRequest.getToken());
            response.setExpirationTime("24hr");
            response.setMessage("Token refreshed successfully");
            response.setStatusCode(200);
        }
        return response;
    }
}
