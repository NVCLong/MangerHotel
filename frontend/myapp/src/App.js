
import './App.css';

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
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
function App() {

  return (
      <>
          <main>
              <BrowserRouter>
                  <Navbar/>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/existing-room" element={<ExistingRoom/>} />
                    <Route path="/add-room" element={<AddRoom/>} />
                    <Route path="/edit-room" element={<EditRoom/>} />
                </Routes>
              </BrowserRouter>
              <Footer/>
          </main>
      </>
  );
}

export default App;
