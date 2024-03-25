import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import Header from "./Header";
import {
    AccessTime as FaClock,
    FreeBreakfast as FaCocktail,
    LocalParking as FaParking,
    AcUnit as FaSnowflake,
    LocalLaundryService as FaTshirt,
    Restaurant as FaUtensils,
    Wifi as FaWifi
} from "@mui/icons-material";

const HotelService = () => {
    return (
        <>
            <div className="mb-2">
                <Header title={"Our Services"} />

                <Grid container className="mt-4">
                    <Typography variant="h4" align="center">
                        Services at <span className="hotel-color"> Modern - </span>Hotel
                        <span className="gap-2">
              <FaClock className="ml-5" /> 24-Hour Front Desk
            </span>
                    </Typography>
                </Grid>
                <hr />

                <Grid container spacing={2} className="mt-2">
                    <Grid item xs={12} md={6} lg={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" className="hotel-color">
                                    <FaWifi /> WiFi
                                </Typography>
                                <Typography>Stay connected with high-speed internet access.</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Repeat for other services */}
                </Grid>
            </div>
            <hr />
        </>
    );
};

export default HotelService;