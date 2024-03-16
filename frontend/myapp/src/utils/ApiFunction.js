import axios from "axios";

export const getHeaders = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }

}

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

export async function addRoom(roomType, roomPrice, images)
{
    const formData = new FormData();

    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
    formData.append("image", images);

    const response = await api.post("/api/v1/add/new_room", formData,{
        headers: getHeaders()
    });
    return response.status === 201;
}

export async function getRoomsType( ){
    try{
        const response = await api.get("/api/v1/room-types");
        return response.data;
    }catch (error){
        throw new Error("Error fetching room types")
    }
}

export async function getAllRooms(){
    try {
        const response = await api.get("/api/v1/all-rooms", {
            headers: getHeaders()
        });

        console.log("This is the response data" + response.data);
        return response.data;
    }catch (error){
        throw new Error("Error fetching rooms")
    }
}

export async function deleteRoom(roomID){
    try {
        const response = await api.delete(`/api/v1/delete/${roomID}`, {
            headers: getHeaders()
        });

        return response.data;
    }catch (error){
        throw new Error("Error deleting room")
    }
}

export async function updateRooms(roomID, roomData){
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("image", roomData.images);

    const response = await api.put(`/api/v1/edit/room/${roomID}`, formData,{
        headers: getHeaders()
    });

    return response
}

export async function getRoomByID(roomID){
    try {
        const response = await api.get(`/api/v1/room/${roomID}`,{
            headers: getHeaders()

        });
        return response.data;
    }catch (error){
        throw new Error("Error fetching room")
    }
}