import React from "react";
import Card from "react-bootstrap/Card";
import {Button, ButtonGroup} from "react-bootstrap";

const Favourite = (props) => {
    return (
        <Card className="text-center" border="light" style={{width: '20rem'}} bg="light" body key={props.id}>
            <Card.Header>{props.city}, {props.country}</Card.Header>
            <Card.Text>
                <p></p>
                <p>For more information click "show weather"</p>
            </Card.Text>
            <div className="text-center">
                <ButtonGroup>
                    <Button className="mr-1" variant="outline-success" size="sm" onClick={props.wantToShowWeather}>Show
                        weather</Button>
                    <Button className="ml-1" variant="outline-danger" size="sm" onClick={props.removeFromFavourites}>Dislike</Button>
                </ButtonGroup>
            </div>
        </Card>
    );
};

export default Favourite;