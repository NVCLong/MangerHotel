import {Link} from "react-router-dom";

const Admin = () => {
    return (
        <section className="container mt-5">
            <h1>Welcome to Admin page</h1>
            <hr/>
            <Link to={"/existing-booking"}>Manage Booking</Link> <br/>
            <Link to={"/existing-room"}>Mange Room</Link>
        </section>
    );
};

export default Admin;
