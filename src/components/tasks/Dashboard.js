import React, { Fragment } from "react";
// import Form from "./Form";
// import Tasks from "./Task";
import { Jumbotron } from 'reactstrap';
import { UserList } from '../users';

export default function Dashboard() {
    return (
        <Fragment>
            <Jumbotron>
                <h1>Welcome to EA-System</h1>
                <h2>Hello There</h2>
            </Jumbotron>
            {/* <Form /> */}
            {/* <UserList /> */}
            {/* <Tasks /> */}
        </Fragment>
    );
}