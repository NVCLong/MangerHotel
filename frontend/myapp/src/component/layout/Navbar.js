import  {useState} from 'react';
import  Button  from '@mui/material/Button'; // Assuming Button component is located in the same directory
import Select from '@mui/material/Select';
import {Divider, FormControl, FormHelperText, MenuItem, OutlinedInput, Tooltip} from "@mui/material";
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing

export default function Navbar() {
    const [showAccount, setShowAccount] = useState(false);

    const handleAccountClick = () => {
        setShowAccount(!showAccount)
    }

    const isLoggedIn = localStorage.getItem("token")

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold">CAO LONG HOTEL</h1>
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
                            <Button component={Link} to={"/find-booking"}
                                    className="text-gray-500 bg-gradient-to-br from-pink-200 to-pink-400 focus:outline-none focus:text-white focus:bg-gray-50 transition duration-150 ease-in-out"
                                    variant="contained" size="small">
                                Find my booking
                            </Button>
                        </Tooltip>
                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}>
                                {" "}
                                Account
                            </a>

                            <ul
                                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown">
                                {isLoggedIn ? (
                                    <h1>Logout</h1>
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to={"/login"}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    );
}
