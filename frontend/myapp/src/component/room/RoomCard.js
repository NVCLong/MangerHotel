import {CardBody, CardImg, CardText, CardTitle, Col} from "react-bootstrap";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import {CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const RoomCard = ({room}) => {
    return (
        <Grid item mt={3} pd={3}>
            <Card >
                <Grid container alignItems="center">
                    <Grid item sm={6} md={4}>
                        <div className="h-100 d-flex">
                            <CardMedia
                                component="img"
                                image={`http://localhost:8080/api/v1/photo/${room.photo}`}
                                alt='Room Photo'
                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                            />
                        </div>
                    </Grid>

                    <Grid item sm={6} md={4} container className="flex">
                        <CardContent>
                            <Typography variant="h5" component="div">{room.roomType}</Typography>
                            <Typography variant="h6" component="div">{room.roomPrice} / night</Typography>
                            <Typography variant="body2" color="text.secondary">Some room information goes here for the guest to read through</Typography>
                        </CardContent>
                    </Grid>

                    <Grid item>
                        <Link to={`/book-room?id=${room.id}`}>
                            <Button variant="contained" color="primary">Book Now</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default RoomCard;
