import React, { Fragment } from "react";
// import Form from "./Form";
// import Tasks from "./Task";
import { Jumbotron, Col, Row } from 'reactstrap';
// import { UserList } from '../users';

export default function Dashboard() {
    return (
        <Fragment>
            <Jumbotron>
                <h1>Welcome to EA-System</h1>
                <br></br>
                <Row xs={2}>
                    <Col>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </Col>
                    <Col>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </Col>
                </Row>

            </Jumbotron>
            {/* <Form /> */}
            {/* <UserList /> */}
            {/* <Tasks /> */}
        </Fragment>
    );
}