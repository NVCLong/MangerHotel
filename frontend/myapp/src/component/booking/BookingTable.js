import React, { useState } from "react"

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)
    const handleCancel=(bookingId)=>{
        handleBookingCancellation(bookingId);
        window.location.reload();
    }

    // useEffect(() => {
    //     setFilteredBookings(bookingInfo)
    // }, [bookingInfo])

    return (
        <section className="p-4">
            <table className="table table-bordered table-hover shadow">
                <thead>
                <tr>
                    <th>S/N</th>
                    <th>Booking ID</th>
                    <th>Room ID</th>
                    <th>Room Type</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Guest Name</th>
                    <th>Guest Email</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Confirmation Code</th>
                    <th colSpan={2}>Actions</th>
                </tr>
                </thead>
                <tbody className="text-center">
                {bookingInfo.map((booking, index) => (
                    <tr key={booking.id}>
                        <td>{index + 1}</td>
                        <td>{booking.id}</td>
                        <td>{booking.roomResponse.id}</td>
                        <td>{booking.roomResponse.roomType}</td>
                        <td>{booking.check_in}</td>
                        <td>{booking.check_out}</td>
                        <td>{booking.guestFullName}</td>
                        <td>{booking.guestEmail}</td>
                        <td>{booking.numOfAdults}</td>
                        <td>{booking.numberChildren}</td>
                        <td>{booking.confirmCode}</td>
                        <td>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={()=>{
                                    handleCancel(booking.id)
                                }}>
                                Cancel
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {bookingInfo.length === 0 && <p> No booking found for the selected dates</p>}
        </section>
    )
}

export default BookingsTable