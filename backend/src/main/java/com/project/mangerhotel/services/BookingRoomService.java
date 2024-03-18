package com.project.mangerhotel.services;

import com.project.mangerhotel.exception.InvalidBookingRequestException;
import com.project.mangerhotel.model.BookedRoom;
import com.project.mangerhotel.model.Room;
import com.project.mangerhotel.repositories.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingRoomService {

    private BookingRepository bookingRepository;
    private RoomService roomService;


    public List<BookedRoom> getAllBooking(){
        return bookingRepository.findAll();
    }
    public List<BookedRoom> getAllBookingRoomId(Long id){
        return null;
    }

    public List<BookedRoom> getAllBookingByEmail(String email){
        return null;
    }

    public void cancelBooking(Long id){
        return;
    }

    public String saveBooking(Long roomID, BookedRoom bookingRequest){
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Must choose a check out date after check in date");
        }

        Room room = roomService.getRoomById(roomID).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean isRoomAvailable = isRoomAvailable(bookingRequest, existingBookings);
        if(isRoomAvailable){
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }else {
            throw new InvalidBookingRequestException("Room is not available for the selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    public List<BookedRoom> findingBookingConfirmationCode(String confirmationCode){
        return null;
    }

    // check if the room is available for checkout checkin date
    // book.co < exist.co
    // book.ci > exist.ci && book.ci < exist.co
    // book.ci < exist.ci && book.co = exist.co
    // book.ci < exist.ci && book.co > exist.co
    // book.ci = exist.co && book.co = exist.ci
    public boolean isRoomAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings){
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())

                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())

                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                );
    }

}
