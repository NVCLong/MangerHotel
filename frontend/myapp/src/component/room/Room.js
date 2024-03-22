import React, {useEffect, useState} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import {getAllRooms} from "../../utils/ApiFunction";
import {Alert, Container, Pagination} from "@mui/material";
import RoomCard from "./RoomCard";
import {Col, Row} from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPagination from "../common/RoomPagination";

const Room= ()=> {
    const [data, setData] = useState([]); // Replace with actual data
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);
    const [filterData, setFilterData] = useState([{id:""}]);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await getAllRooms();
                setData(response);
                setFilterData(response);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchRooms();
    }, []);

    if(loading){
        return <div>Loading rooms.....</div>
    }
    if (error) {
        return <Alert severity="error" sx={{ mt: 5 }}>{error}</Alert>
    }
    if(success){
        return <Alert severity="success" sx={{ mt: 5 }}>{success}</Alert>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const totalPages = Math.ceil(filterData.length / roomsPerPage);

    const renderRoom = () => {
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        return filterData.slice(startIndex,endIndex).map((room) => <RoomCard key={room.id} room={room}/>);
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <RoomFilter data={data} setFilterData={setFilterData}/>
                </Col>
                <Col md={6} className="flex items-center justify-end pb-12">
                    <Pagination variant="outlined" shape="rounded" count={totalPages} page={currentPage} onChange={handlePageChange} />
                </Col>

            </Row>

            <Row className="flex-row flex-wrap ">
                {renderRoom()}
            </Row>

            <Row className="mt-12">
                <Col md={12} className="flex items-center justify-center">
                    <Pagination variant="outlined" shape="rounded" count={totalPages} page={currentPage} onChange={handlePageChange} />
                </Col>
            </Row>

        </Container>
    );
}

export default  Room;