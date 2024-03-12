package com.project.mangerhotel.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    private Long id;
    private LocalDate check_in;
    private LocalDate check_out;
    private int numOfAdults;
    private int numberChildren;
    private String guestFullName;
    private String guestEmail;
    private String ownerFullName;
    private String confirmCode;

    private RoomResponse roomResponse;

    public BookingResponse(Long id, LocalDate check_in, LocalDate check_out, String confirmCode) {
        this.id = id;
        this.check_in = check_in;
        this.check_out = check_out;
        this.confirmCode = confirmCode;
    }

}
