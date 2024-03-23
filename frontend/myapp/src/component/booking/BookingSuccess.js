import React from 'react';
import {useLocation} from "react-router-dom";
import Navbar from "../layout/Navbar";


export  default function BookingSuccess(){
    const location = useLocation()
    const message= location.state?.message
    const error= location.state.error
    return (
        <div className="container">
            <Navbar  title="Booking Success"/>
            <div className="mt-5">
                {message ? (
                    <div>
                        <h3 className="text-success">Booking Success !</h3>
                        <p className="text-success">{message}</p>
                    </div>
                ): (
                    <div>
                        <h3 className="text-danger">Booking Error !</h3>
                        <p className="text-danger">{error}</p>
                    </div>
                )}
            </div>
        </div>
    )
}