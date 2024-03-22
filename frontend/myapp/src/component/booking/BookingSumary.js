import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

export default function BookingSummary({booking, payment, isFormValid, onConfirm}){
    const navigator= useNavigate();
    const checkInDate= moment(booking.checkInDate)
    const checkOutDate= moment(booking.checkOutDate)
    const numOfDays= checkOutDate.diff(checkInDate, "days")
    const [isBookingConfirmed,setIsBookingConfirmed]= useState(false);
    const [isProcessingPayment,setIsProcessingPayment]= useState(false);

    const handleConfirmBooking=()=>{
        setIsProcessingPayment(true);
        setTimeout(()=>{
            setIsProcessingPayment(false);
            setIsBookingConfirmed(true)
            onConfirm()
        },3000)
    }
    useEffect(() => {
        if(isBookingConfirmed){
            navigator("/booking-success")
        }
    }, [isBookingConfirmed,navigator]);


    return(
        <div className="card card-body mt-5">
            <h4>Reservation</h4>
            <p>FullName: <strong>{booking.guestName}</strong></p>
            <p>Email: <strong>{booking.guestEmail}</strong></p>
            <p>Check-In Date: <strong>{moment(booking.checkInDate).format("MM DD YYYY")}</strong></p>
            <p>Check-Out Date: <strong>{moment(booking.checkOutDate).format("MM DD YYYY")}</strong></p>
            <p>Number of Days: <strong>{numOfDays}</strong></p>

            <div>
                <h5>Number of Guest</h5>
                <strong>
                    Adult{booking.numberOfAdults > 1 ? "s" : ""}: {booking.numberOfAdults}
                </strong>
                <strong>
                    Children{booking.numberOfChildren > 1 ? "s" : ""}: {booking.numberOfChildren}
                </strong>
            </div>
            {payment>0 ? (
                <>
                   <p>
                       Total Payment: <strong> ${payment}</strong>
                   </p>
                    {isFormValid && !isBookingConfirmed ? (
                        <Button
                        variant='success' onclick={handleConfirmBooking}>
                            {
                                isProcessingPayment ?(
                                    <>
                                        <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">

                                        </span> Booking Confirmedd, redirecting to payment....
                                    </>
                                ):(
                                    "Confirm Booking and proceed to payment"
                                )}
                        </Button>
                    ): isBookingConfirmed ?(
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading</span>
                            </div>
                        </div>
                    ): null}

                </>
            ):(
                <p className="text-danger">
                    Check-out date must be after check-in date
                </p>
            )}
        </div>
    )
}