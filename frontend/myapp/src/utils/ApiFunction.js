import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

export async function addRoom(roomType, roomPrice, images)
{
    const formData = new FormData();

    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
    formData.append("fileName", images);

    const response = await api.post("/rooms/add/new-room", formData);
    return response.status === 201;
}

export async function getRoomsType( ){
    try{
        const response = await api.get("/rooms/room-types");
        return response.data;
    }catch (error){
        throw new Error("Error fetching room types")
    }
}