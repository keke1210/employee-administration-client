import React, { Component, Fragment } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, Jumbotron, Container } from 'reactstrap';

export class ChangeProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            userData: {
                userName: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                address: '',
                dateOfBirth: ''
            }

        }
    }


    componentDidMount() {
        const { profileData } = this.props;
        console.log(profileData)

        if (profileData) {
            this.setState({
                userData: {
                    userName: profileData.userName,
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    phoneNumber: profileData.phoneNumber,
                    email: profileData.email,
                    address: profileData.address,
                    dateOfBirth: profileData.dateOfBirth
                }
            });
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { userName, firstName, lastName } = this.state;
        console.log("Submitted: " + userName + " " + firstName + " " + lastName);
        // Action method Update Profile
    }


    render() {
        const { profileData } = this.props;

        return (
            <Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="userName">Username</Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="userName"
                            name="userName"
                            onChange={this.handleChange}
                            placeholder="Username"
                        // value={this.state.userData.userName}
                        />
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    // disabled={!editProfile}
                                    placeholder="First Name"
                                    onChange={this.handleChange}
                                // value={userData.firstName}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    // disabled={!editProfile}
                                    placeholder="Last Name"
                                    onChange={this.handleChange}
                                // value={userData.lastName}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="phoneNumber">Phone Number</Label>
                                <Input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    maxLength={10}
                                    // disabled={!editProfile}
                                    placeholder="068 xxx xx xx"
                                    onChange={this.handleChange}
                                // value={userData.phoneNumber}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    // disabled={!editProfile}
                                    placeholder="email@domain.com"
                                    onChange={this.handleChange}
                                // value={userData.email}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="dateOfBirth">Date of birth</Label>
                        <Input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            // disabled={!editProfile}
                            placeholder="1997-12-10"
                            onChange={this.handleChange}
                        // value={userData.dateOfBirth}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleAddress2">Address 2</Label>
                        <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" />
                    </FormGroup>

                    <Button
                        color="dark"
                        style={{ marginBottom: '2rem' }}
                        block
                    >
                        Update Data</Button>
                </Form>
            </Fragment>
        )
    }
}

export default ChangeProfile
