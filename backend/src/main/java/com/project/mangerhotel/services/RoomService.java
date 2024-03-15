package com.project.mangerhotel.services;

import com.azure.storage.blob.BlobClient;
import com.project.mangerhotel.model.BookedRoom;
import com.project.mangerhotel.model.Room;
import com.project.mangerhotel.repositories.BookingRepository;
import com.project.mangerhotel.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;


@Service
public class RoomService {
    @Autowired
    RoomRepository roomRepository;

    @Autowired
    AzureService azureService;

    @Autowired
    BookingRepository bookingRepository;


    public Room addNewRoom(String roomType, BigDecimal roomPrice, String fileName) throws SQLException, IOException {
        Room newRoom = new Room();
        newRoom.setRoomType(roomType);
        newRoom.setRoomPrice(roomPrice);
        newRoom.setPhoto(fileName);
        return  roomRepository.save(newRoom);
    }

    public List<String> getAllRoomType(){
        return roomRepository.findDistinctRoomType();
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

    public List<Room> getAllRooms(){
        return  roomRepository.findAll();
    }

    //delete rooms


    public String deleteRoom(Long id){
        Room room=roomRepository.findById(id).orElseThrow(null);
        azureService.deleteImage(room.getPhoto());
        BookedRoom bookedRoom= bookingRepository.findByRoom(room).orElse(null);
        if(room==null){
            return "Failed to delete room";
        }else{
            roomRepository.delete(room);
            if(bookedRoom!= null){
                bookingRepository.deleteBookedRoomByRoom(room);
            }
            return "Room deleted";
        }
    }



    // get all booking rooms

    public List<Room> getAllAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate,String roomType){

        List<Room> rooms= roomRepository.findAvailableRoomsByDateAndType(checkInDate,checkOutDate,roomType);
        return  rooms;
    }


    //getRoom by id

    public Optional<Room> getRoomById(Long id){
        return roomRepository.findById(id);
    }


}
