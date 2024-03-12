package com.project.mangerhotel.repositories;

import com.project.mangerhotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findRoomByRoomType(String roomType);

    @Override
    Optional<Room> findById(Long Long);

    Optional<Room> findByRoomPrice(BigDecimal roomPrice);
}
