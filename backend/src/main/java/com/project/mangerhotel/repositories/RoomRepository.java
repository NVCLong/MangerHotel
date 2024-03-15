package com.project.mangerhotel.repositories;

import com.project.mangerhotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT distinct r.roomType FROM Room r")
    List<String> findDistinctRoomType();

    Optional<Room> findById(Long Long);

    List<Room> findByBooked(boolean isFalse);

    @Query("""
SELECT  r From Room r 
where r.roomType like %:roomType%
and r.id  in(
select br.room.id from BookedRoom  br
where (br.checkInDate >= :checkInDate) and (br.checkOutDate <= :checkOutDate)
)
""")
    List<Room> findAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate,String roomType);



    Optional<Room> findByRoomPrice(BigDecimal roomPrice);
}
