import React, {useEffect, useState} from 'react';
import {bookRoom, getRoomByID} from "../../utils/ApiFunction";
import {useNavigate, useParams} from "react-router-dom";
import {Navigator} from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap"
import { jwtDecode } from "jwt-decode";

import moment from "moment";
import BookingSummary from "./BookingSumary";

export default function BookingForm(){
    const navigate= useNavigate();
    const [isValidated,setValidate]=useState(false);
    const[isSubmitted,setSubmitted]= useState(false);
    const[errorMessage,setErrorMessage]= useState("");
    const [roomPrice, setRoomPrice]= useState(0);
    const [email, setEmail]= useState("")
    const [fullName, setFullName]= useState("")
    const [booking, setBooking]=useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
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
    const getUser=()=>{
        const access_token= localStorage.getItem('access_token')
        const deocoded= jwtDecode(access_token);
        setEmail(deocoded.sub)
    }

    useEffect(() => {
        getRoomPriceById(roomId)
        getUser();
    }, [roomId]);


    const calculatePayment=() => {
        const checkInDate= moment(booking.checkInDate)
        const checkOutDate= moment(booking.checkOutDate)
        const days= checkOutDate.diff(checkInDate);
        const pricePerDay= roomPrice ? roomPrice:0;
        return days*pricePerDay;

    }

    const isCheckOutDateValid=()=>{
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage(" Check-in ate must come before check-out date");
            return false;
        }else {
            setErrorMessage("")
            return  true;
        }
    }
    const isGuestValid=()=>{
        const adultCount= parseInt(booking.numOfAdults);
        const childrenCount= parseInt(booking.numOfChildren);
        const totalCount=adultCount+childrenCount;
        return totalCount>= 1&&  adultCount>=1
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        const form = e.currentTarget
        console.log(form.checkValidity())
        console.log(isCheckOutDateValid())
        if(form.checkValidity()===false || !isCheckOutDateValid()|| !isGuestValid()){
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
            navigate("/booking-success", { state: { message: confirmationCode } })
        }catch(e){
            setErrorMessage(e.message)
            navigate("/",{state:{error:errorMessage}})
            throw new Error(e)
        }
    }
    return(
        <>
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card card-body mt-5">
                        <h4 className="card card-title">Reserve Room</h4>
                        <Form  validated={isValidated} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="guestFullName" className="hotel-color">
                                    FullName
                                </Form.Label>
                                <FormControl
                                    required
                                    type="text"
                                    id="guestFullName"
                                    name="guestFullName"
                                    value={booking.guestFullName}
                                    placeholder="Enter your fullname"
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your FullName.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="guestEmail" className="hotel-color">
                                    Email
                                </Form.Label>
                                <FormControl
                                    required
                                    type="email"
                                    id="guestEmail"
                                    name="guestEmail"
                                    value={`${email}`}
                                    placeholder={`${email}`}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email address.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <fieldset style={{ border: "2px" }}>
                                <legend>Lodging Period</legend>
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Label htmlFor="checkInDate" className="hotel-color">
                                            Check-in date
                                        </Form.Label>
                                        <FormControl
                                            required
                                            type="date"
                                            id="checkInDate"
                                            name="checkInDate"
                                            value={booking.checkInDate}
                                            placeholder="check-in-date"
                                            min={moment().format("MMM Do, YYYY")}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please select a check in date.
                                        </Form.Control.Feedback>
                                    </div>

                                    <div className="col-6">
                                        <Form.Label htmlFor="checkOutDate" className="hotel-color">
                                            Check-out date
                                        </Form.Label>
                                        <FormControl
                                            required
                                            type="date"
                                            id="checkOutDate"
                                            name="checkOutDate"
                                            value={booking.checkOutDate}
                                            placeholder="check-out-date"
                                            min={moment().format("MMM Do, YYYY")}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please select a check out date.
                                        </Form.Control.Feedback>
                                    </div>
                                    {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                </div>
                            </fieldset>

                            <fieldset style={{ border: "2px" }}>
                                <legend>Number of Guest</legend>
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Label htmlFor="numOfAdults" className="hotel-color">
                                            Adults
                                        </Form.Label>
                                        <FormControl
                                            required
                                            type="number"
                                            id="numOfAdults"
                                            name="numOfAdults"
                                            value={booking.numOfAdults}
                                            min={1}
                                            placeholder="0"
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please select at least 1 adult.
                                        </Form.Control.Feedback>
                                    </div>
                                    <div className="col-6">
                                        <Form.Label htmlFor="numOfChildren" className="hotel-color">
                                            Children
                                        </Form.Label>
                                        <FormControl
                                            required
                                            type="number"
                                            id="numOfChildren"
                                            name="numOfChildren"
                                            value={booking.numOfChildren}
                                            placeholder="0"
                                            min={0}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Select 0 if no children
                                        </Form.Control.Feedback>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="fom-group mt-2 mb-2">
                                <button type="submit" className="btn btn-hotel">
                                    Continue
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="col-md-6">
                    {isSubmitted===true && (
                        <BookingSummary booking={booking} isFormValid={isValidated} onConfirm={handleBooking()} payment={calculatePayment()}/>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}