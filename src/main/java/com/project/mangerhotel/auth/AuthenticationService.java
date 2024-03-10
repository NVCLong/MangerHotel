package com.project.mangerhotel.auth;

import com.project.mangerhotel.domain.entity.Role;
import com.project.mangerhotel.domain.entity.UserEntity;
import com.project.mangerhotel.repositories.UserRepository;
import com.project.mangerhotel.services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registrationRequest) {

        var user = UserEntity.builder()
                .userName(registrationRequest.getUserName())
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public AuthenticationResponse signIn(AuthenticationRequest signInRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        signInRequest.getEmail(),
                        signInRequest.getPassword()
                )
        );

        var user =  userRepository.findByEmail(signInRequest.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }


//    public ResReq refreshToken(ResReq refreshTokenRequest) {
//        ResReq response = new ResReq();
//        String userEmail = jwtService.extractEmail(refreshTokenRequest.getRefreshToken());
//        UserEntity user = userRepository.findByEmail(userEmail).orElseThrow();
//        if(jwtService.isTokenValidate(refreshTokenRequest.getToken(), user)) {
//            var jwt = jwtService.generateToken(user);
//            response.setToken(jwt);
//            response.setRefreshToken(refreshTokenRequest.getToken());
//            response.setExpirationTime("24hr");
//            response.setMessage("Token refreshed successfully");
//            response.setStatusCode(200);
//        }
//        return response;
//    }
}
