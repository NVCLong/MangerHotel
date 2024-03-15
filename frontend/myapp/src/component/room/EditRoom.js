import {useEffect, useState} from "react";
import {addRoom, getRoomByID, updateRooms} from "../../utils/ApiFunction";
import {Link, useParams} from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";
import {Alert, Box, InputAdornment, TextField} from "@mui/material";
import Button from "@mui/material/Button";

const EditRoom = () => {
    const[room, setRoom] = useState({
        roomType: "",
        roomPrice: "",
        images: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [imagesPreview, setImagesPreview] = useState("");

    const {roomID} = useParams();

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await getRoomByID(roomID);
                setRoom(response);
                setImagesPreview(response.images);
            }catch (error){
                console.log(error.message);
            }
        }
        fetchRoom();
    }, [roomID]);



    const handleRoomInputChange = (e) => {
        const {name, value} = e.target;
        setRoom({ ...room, [name]: value })
    }

    const handleImageChange = (e) => {
        const selectedImages = e.target.files[0];
        setRoom({...room, images: selectedImages});
        setImagesPreview(URL.createObjectURL(selectedImages));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await updateRooms(roomID, room);
            if (success !== undefined) {
                setSuccess("Room updated successfully")

                const updatedRoomData = await getRoomByID(roomID);
                setRoom(updatedRoomData);
                setImagesPreview("");
                setError("");
            } else {
                setError("Failed to update room");
                setSuccess("");
            }
        }catch (error){
            setError(error.message);
        }
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-6">Edit Room</h1>
            {success && <Alert severity="success" sx={{ mt: 5 }}>{success}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 5 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="room-type">
                        Room Type
                    </label>
                    <div>
                        <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={room}/>
                    </div>

                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="room-price">
                        Room Price
                    </label>
                    <TextField
                        id="outlined-adornment-amount"
                        value={room.roomPrice}
                        onChange={handleRoomInputChange}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">$</InputAdornment>)
                        }}
                        type="number"
                        name="roomPrice"
                        fullWidth
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1" htmlFor="room-photo">
                        Room Photo
                    </label>
                    <input
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        id="room-photo"
                        type="file"
                        onChange={handleImageChange}
                    />
                    {imagesPreview && (
                        <img src={imagesPreview}
                             alt="Preview room photo"
                             style={{maxWidth: "400px", maxHeight: "400px"}}
                             className="mb-3"></img>)}
                </div>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button component={Link} to="/existing-rooms" variant="outlined" color="info">
                        back
                    </Button>
                    <Button type="submit" variant="outlined" color="warning">
                        Edit Room
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default EditRoom;
