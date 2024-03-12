package com.project.mangerhotel.services;

import com.project.mangerhotel.model.BookedRoom;
import com.project.mangerhotel.model.Room;
import com.project.mangerhotel.model.RoomResponse;
import com.project.mangerhotel.repositories.RoomRepository;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;


@Service
public class RoomService {
    @Autowired
    RoomRepository roomRepository;

    public Room addNewRoom(Room room) throws SQLException, IOException {
        Room newRoom = new Room();
        newRoom.setRoomType(room.getRoomType());
        newRoom.setRoomPrice(room.getRoomPrice());

        // upload in cloud set up latter
//        if(!file.isEmpty()) {
//            byte[] photoBytes = file.getBytes();
//            Blob photoBlob = new SerialBlob(photoBytes);
//            newRoom.setPhoto(photoBlob);
//
//        }
        return  roomRepository.save(newRoom);
    }
}
