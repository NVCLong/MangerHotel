import {useState} from "react";
import {addRoom, api} from "../../utils/ApiFunction";
import Button from "@mui/material/Button";
import {FormControl, Input, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import RoomTypeSelector from "../common/RoomTypeSelector";

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
    {
        value:'VND',
        label: '₫'
    }
];

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        roomType: "",
        roomPrice: "",
        images: null
    });

    const [imagesPreview, setImagesPreview] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value)
            } else {
                value = ""
            }
        }
        setNewRoom({ ...newRoom, [name]: value })
    }


    const handleImageChange = (e) => {
        const selectedImages = e.target.files[0];
        setNewRoom({...newRoom, images: selectedImages});
        setImagesPreview(URL.createObjectURL(selectedImages));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await addRoom(newRoom.roomType, newRoom.roomPrice, newRoom.images);
            if (success !== undefined) {
                setSuccess("Room added successfully")
                setNewRoom({roomType: "", roomPrice: "", images: null});
                setImagesPreview("");
                setError("");
            } else {
                setError("Failed to add room");
                setSuccess("");
            }
        }catch (error){
            setError(error.message);
        }
    }

    return (
            <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-6">Add a New Room</h1>
                {success && (
                    <div className="alert alert-success fade show"> {success}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="room-type">
                            Room Type
                        </label>
                        <div>
                            <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
                        </div>

                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="room-price">
                            Room Price
                        </label>
                        <TextField
                            id="outlined-adornment-amount"
                            value={newRoom.roomPrice}
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
                    <Button type="submit" className="w-full">Save Room</Button>
                </form>
            </div>
        )
};

export default AddRoom;
