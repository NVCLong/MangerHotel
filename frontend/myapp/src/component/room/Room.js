import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

export default function Room() {
    return (
        <div className="max-w-6xl mx-auto my-8 p-4">
            <div className="flex justify-between items-center mb-4">
                <Select
                    variant="standard"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select a room type to filter...' }}
                >
                    <MenuItem disabled value="">
                        Select a room type to filter...
                    </MenuItem>
                    <MenuItem value="suite">Suite</MenuItem>
                    <MenuItem value="deluxe">Deluxe</MenuItem>
                    <MenuItem value="standard">Standard</MenuItem>
                </Select>
                <Button variant="outlined">Clear Filter</Button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <Card className="flex items-center p-4">
                    <img
                        alt="Family Suite 6"
                        className="w-48 h-32 mr-4"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: '200/150',
                            objectFit: 'cover',
                        }}
                    />
                    <div>
                        <h3 className="text-lg font-semibold">Family Suite 6</h3>
                        <p className="text-gray-500">$1000/night</p>
                        <p>Some room descriptions and services information can go here for customers to read.</p>
                        <Button className="book-button" variant="contained">View/Book Now</Button>
                    </div>
                </Card>
                {/* Repeat similar Card components for other rooms */}
            </div>
            <div className="flex justify-center mt-8">
                <nav aria-label="Page navigation">
                    <ul className="flex list-none">
                        <li className="px-3 py-2 border rounded-l-md border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            1
                        </li>
                        {/* Add similar list items for pagination */}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
