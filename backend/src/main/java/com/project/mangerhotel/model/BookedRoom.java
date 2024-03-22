package com.project.mangerhotel.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table("bookings")
public class BookedRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long bookingId;
    @Column(name="check_in")
    private LocalDate checkInDate;
    @Column(name="check_out")
    private LocalDate checkOutDate;
    @Column(name="guest_name")
    private String guestFullName;
    @Column(name="guest_email")
    private String guestEmail;
    @Column(name="owner_name")
    private String ownerFullName;
    @Column(name="adults")
    private int numOfAdults;
    @Column(name="childrens")
    private int numOfChildren;
    @Column(name="guests")
    private int totalNumOfGuest;
    @Setter
    @Column(name="confirmed_code")
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room;


    public void calculateTotalNumOfGuest(){
        this.totalNumOfGuest=numOfAdults+numOfChildren;
    }

    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        calculateTotalNumOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        calculateTotalNumOfGuest();
    }

}
