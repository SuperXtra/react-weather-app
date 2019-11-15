import React from "react";
import {Button, Col, Container, Jumbotron, Row} from "react-bootstrap";

const Favourite = (props) => {
    return (
        <div>
            <Jumbotron>
                <Container>
                    <Row>
                        <Col md={8}>
                            <h3>{props.city}, {props.country}</h3>
                        </Col>
                        <Col md={6}>
                            <Button className="mr-1"
                                    variant="outline-success"
                                    size="sm"
                                    onClick={props.wantToShowWeather}>
                                Show weather
                            </Button>
                            <Button className="ml-1"
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={props.removeFromFavourites}>
                                Dislike
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </div>
    );
};

export default Favourite;