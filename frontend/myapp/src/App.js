
import './App.css';
import './index.css'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import AddRoom from "./component/room/AddRoom";
import ExistingRoom from "./component/room/ExistingRoom";
import EditRoom from "./component/room/EditRoom";
import BookingSuccess from "./component/booking/BookingSuccess";
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
import RoomListing from "./component/room/RoomListing";
import Checkout from "./component/booking/CheckOut";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import Bookings from "./component/booking/Bookings";
import BookingAdmin from "./component/booking/BookingAdmin";
import Admin from "./component/admin/Admin";
function App() {

  return (
      <>
          <main>
              <BrowserRouter>
                  <Navbar/>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/home" element={<Home/>} />

                    <Route path="/add-room" element={<AddRoom/>} />
                    <Route path="/edit-room" element={<EditRoom/>} />
                    <Route path="/browse-all-room" element={<RoomListing/>} />

                    <Route path="/book-room/:roomId" element={<Checkout/>}/>
                    <Route path="/booking-success" element={<BookingSuccess />} />
                    <Route path="/bookings" element={<Bookings />} />

                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/existing-booking" element={<BookingAdmin />} />
                    <Route path="/existing-room" element={<ExistingRoom/>} />

                </Routes>
              </BrowserRouter>
              <Footer/>
          </main>
      </>
  );
}

export default App;
