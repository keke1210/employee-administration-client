import React, { Fragment } from "react";
import Form from "./Form";
import Tasks from "./Task";

export default function Dashboard() {
    return (
        <Fragment>
            <Form />
            <Tasks />
        </Fragment>
    );
}