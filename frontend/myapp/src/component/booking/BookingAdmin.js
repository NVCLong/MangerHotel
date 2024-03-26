import React, { useState, useEffect } from "react"
import {cancelBooking, getAllBookingAdmin, getAllBookings} from "../../utils/ApiFunction"
import Header from "../common/Header"
import BookingsTable from "./BookingTable"
import { jwtDecode } from "jwt-decode";

const BookingAdmin = () => {
    const [bookingInfo, setBookingInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")


    useEffect( () => {
        setTimeout(async  () => {
            try{
                const data= await getAllBookingAdmin()
                setBookingInfo(data)
                setIsLoading(false)
            }catch (error) {
                setError(error.message)
                setIsLoading(false)
            }
        },1000)

    }, [])

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId)
            const data = await getAllBookingAdmin()
            setBookingInfo(data)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section style={{ backgroundColor: "whitesmoke" }}>
            <Header title={"Existing Bookings"} />
            {error && <div className="text-danger">{error}</div>}
            {isLoading ? (
                <div>Loading existing bookings</div>
            ) : (
                <BookingsTable
                    bookingInfo={bookingInfo}
                    handleBookingCancellation={handleBookingCancellation}
                />
            )}
        </section>
    )
}

export default BookingAdmin