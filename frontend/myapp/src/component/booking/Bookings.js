import React, { useState, useEffect } from "react"
import { cancelBooking, getAllBookings } from "../../utils/ApiFunction"
import Header from "../common/Header"
import BookingsTable from "./BookingTable"
import { jwtDecode } from "jwt-decode";

const Bookings = () => {
    const [bookingInfo, setBookingInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [email, setEmail]= useState("")


    useEffect( () => {
        const access_token= localStorage.getItem("access_token")
        const email= jwtDecode(access_token).sub;
        setEmail(email);
        setTimeout(async  () => {
            console.log(email)
            const data= await getAllBookings(email)
            setBookingInfo(data)
            setIsLoading(false)
        },1000)

    }, [])

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId)
            const data = await getAllBookings(email)
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

export default Bookings