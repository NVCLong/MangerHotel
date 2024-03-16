import {CardBody, CardImg, Col} from "react-bootstrap";
import Card from "@mui/material/Card";

const RoomCard = ({room}) => {
    return (
        <Col key={room.id} className='mb-4' xs={12}>
            <Card>
                <CardBody className="flex-wrap items-center justify-center">
                    <div className="flex shrink-0 mr-3 mb-3 mb-md-0">
                        <CardImg
                            variant={"top"}
                            src={`http://localhost:8080/api/v1/photo/${room.photo}`}
                            className="w-48 h-48 object-cover rounded-lg"
                        >

                        </CardImg>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default RoomCard;
