import axios from "axios";

export const getHeaders = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }

}

export const api = axios.create({
    baseURL: "http://localhost:8080/api/v1"
})

export async function addRoom(roomType, roomPrice, images)
{
    const formData = new FormData();

    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
    formData.append("image", images);

    const response = await api.post("/rooms/add/new-room", formData,{
        headers: getHeaders()
    });
    return response.status === 201;
}

export async function getRoomsType( ){
    try{
        const response = await api.get("/rooms/room-types",{
            headers: getHeaders()
        });
        return response.data;
    }catch (error){
        throw new Error("Error fetching room types")
    }
}

export async function getAllRooms(){
    try {
        const response = await api.get("/all-rooms",{
            headers: getHeaders()
        });
        return response.data;
    }catch (error){
        throw new Error("Error fetching rooms")
    }
}

export async function deleteRoom(roomID){
    try {
        const response = await api.delete(`/rooms/delete/room/${roomID}`, {
            headers: getHeaders()
        });

        return response;
    }catch (error){
        throw new Error("Error deleting room")
    }
}

export async function updateRooms(roomID, roomData){
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("image", roomData.images);

    const response = await api.put(`/rooms/edit/room/${roomID}`, formData,{
        headers: getHeaders()
    });

    return response
}

export async function getRoomByID(roomID){
    try {
        const response = await api.get(`/rooms/room/${roomID}`,{
            headers: getHeaders()
        });
        return response.data;
    }catch (error){
        throw new Error("Error fetching room")
    }
}

export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}

export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", {
            headers: getHeaders()
        })
        return result.data
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message}`)
    }
}

export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error find booking : ${error.message}`)
        }
    }
}

export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking :${error.message}`)
    }
}
