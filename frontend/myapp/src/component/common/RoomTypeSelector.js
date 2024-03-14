import {useEffect, useState} from "react";
import {getRoomsType} from "../../utils/ApiFunction";
import {Box, FormControl, Input, InputLabel, MenuItem, OutlinedInput} from "@mui/material";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState("");

    useEffect(() => {
        getRoomsType().then((data) => {
            setRoomTypes(data);
        })
    }, []);

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
            setRoomTypes([...roomTypes,newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }

    return (
        <>
            {roomTypes.length >0 && (
                    <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="roomType-label" >Select Room Type ...</InputLabel>
                        <Select
                                labelId="roomType-label"
                                name="roomType"
                                id="roomType"
                                value={newRoom.roomType}
                                onChange={(e) => {
                                    if(e.target.value ==="Add new") {
                                        setShowNewRoomTypeInput(true)
                                    }else {
                                        handleRoomInputChange(e);
                                    }
                                }}
                        >

                            {roomTypes.map((type,index) => (
                                <MenuItem key={index} value={type}>{type}</MenuItem>
                            ))}
                            <MenuItem value="Add new">Add new</MenuItem>
                        </Select>
                    </FormControl>
                    {showNewRoomTypeInput && (
                        <div className="mt-2">
                            <FormControl>
                                <OutlinedInput
                                    type="text"
                                       placeholder="Enter new room type"
                                       value={newRoomType}
                                       onChange={handleNewRoomTypeInputChange}
                                />
                                <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>Add</button>
                            </FormControl>
                        </div>
                    )}
                    </Box>
            )}
        </>
    );
};

export default RoomTypeSelector;
