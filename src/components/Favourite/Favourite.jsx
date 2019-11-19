import React from "react";
import {Button, Col, Container} from "react-bootstrap";

const Favourite = (props) => {

    return (
        <div>
            <div className="jumbotron d-flex align-items-center">
                <Container>
                    <div className="row align-items-center">
                        <Col md={4}>
                            <h3>{props.city}, {props.country}</h3>
                        </Col>
                        <Col md={4}>
                            <Button className="mr-1"
                                    variant="outline-success"
                                    size="sm"
                                    onClick={props.wantToShowWeather}>
                                Show weather
                            </Button>
                            <Button className="mr-1"
                                    variant="outline-success"
                                    size="sm"
                                    onClick={props.wantToShowClock}>
                                Show Clock
                            </Button>
                            <Button className="ml-1"
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={props.removeFromFavourites}>
                                Dislike
                            </Button>
                        </Col>
                    </div>
                </Container>
            </div>
        </div>
    );

};


export default Favourite;