package com.project.mangerhotel.controller;

import com.project.mangerhotel.exception.InvalidBookingRequestException;
import com.project.mangerhotel.model.BookedRoom;
import com.project.mangerhotel.model.BookingResponse;
import com.project.mangerhotel.model.Room;
import com.project.mangerhotel.model.RoomResponse;
import com.project.mangerhotel.services.BookingRoomService;
import com.project.mangerhotel.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingRoomService bookingService;

    @Autowired
    private RoomService roomService;

    @GetMapping("/history")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBooking(){
        List<BookedRoom> bookings = bookingService.getAllBooking();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for(BookedRoom booking : bookings){
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }

        return ResponseEntity.ok(bookingResponses);
    }

    @PostMapping("/room/{roomID}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomID, @RequestBody BookedRoom bookingRequest){
        try {
            return ResponseEntity.ok(bookingService.saveBooking(roomID, bookingRequest));
        }catch (InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getRoomByConfirmationCode(@PathVariable String confirmationCode){
        try{
            BookedRoom booking = bookingService.findingBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        }catch (InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{booking_id}/delete")
    public void cancelBooking(@PathVariable Long booking_id){
            bookingService.cancelBooking(booking_id);
    }

    @GetMapping("user/{email}/booking")
    public ResponseEntity<?> getBookingByEmail(@PathVariable String email){
        System.out.println("start finding bookings with email " + email);
        List<BookedRoom> bookings = bookingService.getAllBookingByEmail(email);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for(BookedRoom booking : bookings){
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }

        return ResponseEntity.ok(bookingResponses);
    }


    public BookingResponse getBookingResponse(BookedRoom booking){
        Room room = roomService.getRoomById(booking.getRoom().getId());
        RoomResponse theRoom = new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getRoomPrice()
        );

        theRoom.setBooked(room.isBooked());

        return new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getNumOfAdults(),
                booking.getNumOfChildren(),
                booking.getGuestFullName(),
                booking.getGuestEmail(),
                booking.getOwnerFullName(),
                booking.getBookingConfirmationCode(),
                theRoom
        );
    }


}
