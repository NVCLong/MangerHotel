import {useEffect, useState} from "react";
import {deleteRoom, getAllRooms} from "../../utils/ApiFunction";

import { Box, Alert, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { Add, Visibility, Edit, Delete } from "@mui/icons-material";

import {Link} from "react-router-dom";
import RoomPagination from "../common/RoomPagination";
import RoomFilter from "../common/RoomFilter";

const ExistingRoom = () => {
    const [rooms, setRooms] = useState([ {id: "", roomType: "", roomPrice: ""} ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);

    const [filterRooms, setFilterRooms] = useState([{id: "", roomType: "", roomPrice: ""}]);
    const [selectedRoomType, setSelectedRoomType] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRooms();
    },[]);


    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const response = await getAllRooms();
            setRooms(response);

            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilterRooms(rooms)
        } else {
            const filteredRooms = rooms.filter((room) => room.roomType === selectedRoomType)
            setFilterRooms(filteredRooms)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);

    }

    const handleDeleteRoom =async (roomID) => {
        try{
            const response = await deleteRoom(roomID);
            if (response.status === 200){
                setSuccess("Room deleted successfully");
                setError("");
                fetchRooms();
            }else {
                setError(`Failed to delete room with id: ${response.message}`);
                setSuccess("");
            }
        }catch (error){
            setError(error.message);
        }

        setTimeout(() => {
            setSuccess("");
            setError("");
        },3000)
    }

    const calculateTotalPages = (filterRooms, roomsPerPage, rooms) => {
        const totalRooms = filterRooms.length > 0 ? filterRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filterRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    return (
        <>
            <Box sx={{ mt: 5, mb: 5 }}>
                {success && <Alert severity="success" sx={{ mt: 5 }}>{success}</Alert>}
                {error && <Alert severity="error" sx={{ mt: 5 }}>{error}</Alert>}
            </Box>

            {isLoading ? (
                <Typography>Loading existing rooms</Typography>
            ) : (
                <Box sx={{ mt: 5, mb: 5 }}>
                    <Grid container justifyContent="space-between" sx={{ mb: 3, mt: 5 }}>
                        <Typography variant="h2">Existing Rooms</Typography>
                    </Grid>

                    <Grid container>
                        <Grid item md={6} sx={{ mb: 2 }}>
                            <RoomFilter data={rooms} setFilterData={setFilterRooms} />
                        </Grid>

                        <Grid item md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Link to={"/add-room"}>
                                <Add /> Add Room
                            </Link>
                        </Grid>
                    </Grid>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Room Type</TableCell>
                                    <TableCell>Room Price</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {currentRooms.map((room) => (
                                    <TableRow key={room.id}>
                                        <TableCell>{room.id}</TableCell>
                                        <TableCell>{room.roomType}</TableCell>
                                        <TableCell>{room.roomPrice}</TableCell>
                                        <TableCell>
                                            <Link to={`/edit-room/${room.id}`}>
                                                <Button color="info" size="small">
                                                    <Visibility />
                                                </Button>
                                                <Button color="warning" size="small">
                                                    <Edit />
                                                </Button>
                                            </Link>
                                            <Button color="error" size="small" onClick={() => handleDeleteRoom(room.id)}>
                                                <Delete />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <RoomPagination
                        currentPage={currentPage}
                        totalPages={calculateTotalPages(filterRooms, roomsPerPage, rooms)}
                        onPageChange={handlePaginationClick}
                    />
                </Box>
            )}
        </>
    );
};

export default ExistingRoom;
