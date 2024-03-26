import Navbar from "../component/layout/Navbar";
import {useLocation} from "react-router-dom";
import {Alert} from "@mui/material";
import MainHeader from "../component/layout/MainHeader";
import RoomCarousel from "../component/common/RoomCarousel";
import Parallax from "../component/common/Parallax";
import HotelService from "../component/common/HotelService";

const Home = () => {
    const location = useLocation();

    const message = location.state && location.state.message;
    const currentUser = localStorage.getItem("user.email");
    return (
        <section>
            {message && <Alert severity="warning" px={5}>{message}</Alert>}
            {currentUser &&(
                <Alert severity="success" className="flex items-center">You are logged-In as {currentUser}</Alert>
            )}
            <MainHeader/>
            <div className="container">
               <RoomCarousel/>
               <Parallax/>
                <RoomCarousel/>
                <HotelService/>
                <Parallax/>
                <RoomCarousel/>
            </div>
        </section>
    );
};

export default Home;
