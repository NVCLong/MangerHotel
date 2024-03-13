package com.project.mangerhotel.controller;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.project.mangerhotel.model.Room;
import com.project.mangerhotel.model.RoomResponse;
import com.project.mangerhotel.services.AzureService;
import com.project.mangerhotel.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import static org.springframework.util.MimeTypeUtils.IMAGE_JPEG_VALUE;
import static org.springframework.util.MimeTypeUtils.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("/api/v1")
public class RoomController {

    @Autowired
    RoomService roomService;

    @Autowired
    BlobServiceClient blobServiceClient;

    @Autowired
    AzureService azureService;

    public RoomController(RoomService roomService, BlobServiceClient blobServiceClient) {
        this.roomService = roomService;
        this.blobServiceClient = blobServiceClient;
    }

    @PostMapping(value = "/add/new_room", consumes = "multipart/form-data", produces = "application/json")
    public ResponseEntity<Room> addRoom(@RequestParam("roomType") String roomType, @RequestParam("roomPrice") BigDecimal roomPrice, @RequestParam("image") MultipartFile file) throws SQLException, IOException {
        String fileName= azureService.upload(file);
        return ResponseEntity.status(200).body(roomService.addNewRoom(roomType, roomPrice, fileName ));
    }

    @GetMapping(value = "/photo/{filename}", produces ={IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE} )
    public ResponseEntity<byte[]> getPhoto(@PathVariable("filename") String filename) throws IOException{
        System.out.println(filename);
        return ResponseEntity.ok(azureService.getFile(filename));
    }

    @PutMapping(value="/edit/room/{id}", consumes = "multipart/form-data", produces = "application/json")
    public ResponseEntity<Room> editRoom(@PathVariable("id") Long id,@RequestParam("roomType") String roomType, @RequestParam("roomPrice") BigDecimal roomPrice, @RequestParam("image") MultipartFile file) throws IOException {
        return ResponseEntity.ok(roomService.updateRoom(id,roomType,roomPrice,file));
    }

    @GetMapping("/rooms/available")
    public ResponseEntity<List<Room>> getAllAvailableRooms(){
        return  ResponseEntity.ok(roomService.geAllAvailableRoom());
    }

    @GetMapping("/rooms/booked")
    public ResponseEntity<List<Room>> getAllBookedRooms(){
        return ResponseEntity.ok(roomService.getAllBookingRoom());
    }



}
