import  {useState} from 'react';
import  Button  from '@mui/material/Button'; // Assuming Button component is located in the same directory
import Select from '@mui/material/Select';
import {Divider, FormControl, FormHelperText, MenuItem, OutlinedInput, Tooltip} from "@mui/material";
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing

export default function Navbar() {
    const [account, setAccount] = useState('');

    const handleChange = (event) => {
        setAccount(event.target.value);
    };
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold">THANH DAT HOTEL</h1>
                    </div>
                    <div className="hidden sm:flex sm:space-x-8">
                        <Link to="/browse" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                            Browse all rooms
                        </Link>
                        <Link to="/manage" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                            Manage Rooms
                        </Link>
                    </div>
                    <div className="hidden sm:flex items-center">
                        <Tooltip title="">
                            <Button className="text-gray-500 bg-gradient-to-tr from-red-300 to-pink-500 focus:outline-none focus:text-gray-700 focus:bg-gray-50 transition duration-150 ease-in-out" variant="contained">
                                Find my booking
                            </Button>
                        </Tooltip>
                        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                            <Select
                                value={account}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>Account</em>
                                </MenuItem>
                                <MenuItem value={10}>Login</MenuItem>
                                <MenuItem value={20}>Profile</MenuItem>
                                <Divider />
                                <MenuItem value={30}>Logout</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </nav>
    );
}
