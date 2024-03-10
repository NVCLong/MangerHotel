package com.project.mangerhotel.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.mangerhotel.domain.entity.UserEntity;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResReq {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String RefreshToken;
    private String expirationTime;




    //Users
    private String email;
    private String password;
    private UserEntity userEntity;
    private String role;

    //
}
