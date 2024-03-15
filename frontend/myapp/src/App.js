<<<<<<< HEAD
=======
import logo from './logo.svg';
>>>>>>> f752a5b3e6a4457bbd309b48f240c7e2d070380e
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
function App() {

  return (
      <>
          <main>
              <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/existing-room" element={<ExistingRoom/>} />
                    <Route path="/add-room" element={<AddRoom/>} />
                </Routes>
              </BrowserRouter>
          </main>
      </>
  );
}

export default App;
