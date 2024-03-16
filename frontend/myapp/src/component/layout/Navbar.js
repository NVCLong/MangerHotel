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
                        <Link to="/browse-all-room" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                            Browse all rooms
                        </Link>
                        <Link to={"/admin"} className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                            Manage Rooms
                        </Link>
                    </div>
                    <div className="hidden sm:flex items-center">
                        <Tooltip title="">
                            <Button component={Link} to={"/find-booking"} className="text-gray-500 bg-gradient-to-br from-pink-200 to-pink-400 focus:outline-none focus:text-white focus:bg-gray-50 transition duration-150 ease-in-out" variant="contained" size="small">
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
                                <MenuItem component={Link} to="/account" value="">
                                    <em>Account</em>
                                </MenuItem>
                                <MenuItem component={Link} to="/login" value="">Login</MenuItem>
                                <MenuItem component={Link} to="/profile" value="">Profile</MenuItem>
                                <Divider />
                                <MenuItem component={Link} to="/logout" value="">Logout</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </nav>
    );
}