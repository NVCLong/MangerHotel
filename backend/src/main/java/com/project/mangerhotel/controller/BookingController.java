package com.project.mangerhotel.controller;

import com.project.mangerhotel.exception.InvalidBookingRequestException;
import com.project.mangerhotel.model.BookedRoom;
import com.project.mangerhotel.services.BookingRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/booking")
public class BookingController {

    private BookingRoomService bookingService;

    @GetMapping("/all-booking")
    public ResponseEntity<List<BookedRoom>> getAllBooking(){
        return ResponseEntity.ok(bookingService.getAllBooking());
    }

    @PostMapping("/save-booking")
    public ResponseEntity<String> saveBooking(@PathVariable Long id, @RequestBody BookedRoom bookingRequest){
        try {
            return ResponseEntity.ok(bookingService.saveBooking(id, bookingRequest));
        }catch (InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
