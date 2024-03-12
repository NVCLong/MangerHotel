package com.project.mangerhotel.controller;

import com.project.mangerhotel.model.Room;
import com.project.mangerhotel.model.RoomResponse;
import com.project.mangerhotel.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;

@RestController
@RequestMapping("/api/v1")
public class RoomController {

    @Autowired
    RoomService roomService;

    @PostMapping(value = "/add/new_room", consumes = "application/json")
    public ResponseEntity<Room> addRoom(@RequestBody Room room) throws SQLException, IOException {

        return ResponseEntity.status(200).body(roomService.addNewRoom(room));

    }
}
