import React, {useEffect, useState} from 'react';
import {bookRoom, getRoomByID} from "../../utils/ApiFunction";
import {useNavigate, useParams} from "react-router-dom";
import {Navigator} from "react-router-dom";

import moment from "moment";

export default function BookingForm(){
    const navigate= useNavigate();
    const [validate,setValidate]=useState(false);
    const[isSubmitted,setSubmitted]= useState(false);
    const[errorMessage,setErrorMessage]= useState("");
    const [roomPrice, setRoomPrice]= useState(0);
    const [booking, setBooking]=useState({
        guestName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren: "",
    })
    const [roomInfo, setRoomInfo]= useState({
        photo:"",
        roomType:"",
        roomPrice: "",
    })
    const {roomId}= useParams()

    const handleInputChange=(e)=>{
        const {name, value}= e.target
        setBooking({...booking,[name]:value})
        setErrorMessage("")
    }


    const getRoomPriceById= async (roomId)=>{
        try{
            const response= await getRoomByID(roomId)
            setRoomPrice(response.roomPrice)
        }catch (e) {
            setErrorMessage(e)
            throw new Error(e)
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId]);


    const calculatePayment=() => {
        const checkInDate= moment(booking.checkInDate)
        const checkOutDate= moment(booking.checkOutDate)
        const days= checkOutDate-checkInDate;
        const pricePerDay= roomPrice ? roomPrice:0;
        return days*pricePerDay;

    }

    const isCheckOutDateValid=()=>{
        if(moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage(" Check-out ate must come before check-in date");
            return false;
        }else {
            setErrorMessage("")
            return  true;
        }
    }
    const isGuestValid=()=>{
        const adultCount= parseInt(booking.numberOfAdults);
        const childrenCount= parseInt(booking.numberOfChildren);
        const totalCount=adultCount+childrenCount;
        return totalCount>= 1&&  adultCount>=1
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        const form = e.currentTarget
        if(form.checkValidity()===false || !isCheckOutDateValid()){
            e.stopPropagation()
        }else{
            setSubmitted(true);
        }
        setValidate(true);
    }

    const handleBooking=async ()=>{
        try{
            const confirmationCode= await bookRoom(roomId, booking )
            setSubmitted(true)
        }catch(e){
            setErrorMessage(e.message)
            navigate("/",{state:{error:errorMessage}})
            throw new Error(e)
        }
    }
    return(
        <div>

        </div>
    )
}