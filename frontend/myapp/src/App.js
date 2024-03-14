import logo from './logo.svg';
import './App.css';

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Navbar from "./component/Navbar";
import Home from "./page/Home";
import AddRoom from "./component/room/AddRoom";
function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/rooms/add/new-room" element={<AddRoom/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
