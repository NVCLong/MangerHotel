package com.project.mangerhotel.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomResponse {

    private Long id;


    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;

    private String photo;
    private List<BookedRoom> bookings;

    private Room room;

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice, boolean isBooked, byte[] photoBytes, List<BookedRoom> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photo != null ? Base64.encodeBase64String(photoBytes): null;
        this.bookings = bookings;
    }
    public RoomResponse(Room room, String photoUrl){
        this.room=room;
        this.photo=photoUrl;
    }


}
