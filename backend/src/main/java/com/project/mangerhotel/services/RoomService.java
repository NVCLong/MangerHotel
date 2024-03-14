package com.project.mangerhotel.services;

import com.project.mangerhotel.model.BookedRoom;
import com.project.mangerhotel.model.Room;
import com.project.mangerhotel.model.RoomResponse;
import com.project.mangerhotel.repositories.RoomRepository;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
public class RoomService {
    @Autowired
    RoomRepository roomRepository;

    @Autowired
    AzureService azureService;

    public Room addNewRoom(String roomType, BigDecimal roomPrice, String fileName) throws SQLException, IOException {
        Room newRoom = new Room();
        newRoom.setRoomType(roomType);
        newRoom.setRoomPrice(roomPrice);
        newRoom.setPhoto(fileName);
        return  roomRepository.save(newRoom);
    }

    public Optional<Room> getAllRoomType(){
        return roomRepository.findRoomByRoomType("roomType");
    }

    public Room updateRoom(Long id, String roomType, BigDecimal roomPrice, MultipartFile file)throws IOException {
        Room room=roomRepository.findById( id).orElseThrow(null);
        String newFileName = azureService.updateImage(room.getPhoto(),file);
        if( room!=null){
            room.setRoomType(roomType);
            room.setRoomPrice(roomPrice);
            room.setPhoto(newFileName);
            return  roomRepository.save(room);
        }else {
            return null;
        }
    }
}
