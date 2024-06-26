package com.project.mangerhotel.repositories;

import com.project.mangerhotel.model.BookedRoom;
import com.project.mangerhotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<BookedRoom,Long> {


    Optional<BookedRoom> deleteBookedRoomByRoom(Room room);

    Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> findAllByGuestEmail(String guestEmail);

    Optional<BookedRoom> findByRoom(Room room);
}
