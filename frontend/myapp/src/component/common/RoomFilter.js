import {useState} from "react";
import {InputLabel, MenuItem, TextField} from "@mui/material";
import Button from "@mui/material/Button";

const RoomFilter = ({data, setFilterData}) => {
    const [filter, setFilter] = useState("");

    const handleFilterChange = (e) => {
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType);

        const filteredData = data.filter((room) => {
            room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())});

        setFilterData(filteredData);


    }

    const clearFilter = () => {
        setFilter("");
        setFilterData(data);
    }

    const roomTypes = ["",...new Set(data.map((room) => room.roomType))];

    return (
        <div>
            <InputLabel id="room-type-filter">Select a room type to filter...</InputLabel>
            <TextField
                select
                fullWidth
                labelId="room-type-filter"
                value={filter}
                onChange={handleFilterChange}
                variant="Outlined"
            >
                <MenuItem value="">
                    Select a room type to filter...
                </MenuItem>
                {roomTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>
                        {String(type)}
                    </MenuItem>
                ))}
            </TextField>
            <Button variant="outlined" onClick={clearFilter}>Clear Filter</Button>
        </div>
    );
};

export default RoomFilter;
