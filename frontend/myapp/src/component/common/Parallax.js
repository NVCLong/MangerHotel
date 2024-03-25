import {Container} from "@mui/material";

const Parallax = () => {
    return (
        <div className="parallax mb-5">
            <Container className="flex justify-center items-center px-5 py-5">
                <div className="animate-bounce">
                    <h1>
                        Experience the Best hospitality at <span className="hotel-color">Modern Hotel</span>
                    </h1>
                    <h3>We offer the best services for all your needs.</h3>
                </div>

            </Container>

        </div>
    );
};

export default Parallax;
