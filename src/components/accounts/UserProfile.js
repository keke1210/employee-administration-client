import React, { Component } from 'react';
import { connect } from 'react-redux';

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { userActions } from '../../actions/user.actions';
import { profileActions } from '../../actions/profile.actions';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export class UserProfile extends Component {
    state = {
        selectedFile: null,
        binary: null,
        isSelected: false,
        imagePreviewUrl: null,
        editProfile: false,
        submitted: false,
        id: '',
        userName: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        dateOfBirth: ''
    }

    componentDidMount() {
        this.props.getProfile();
    }


    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            isSelected: true
        });

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(event.target.files[0])
    }

    fileUploadHandler = () => {
        this.setState({
            isSelected: false
        })

        const fd = new FormData();
        fd.append('ProfilePhoto', this.state.selectedFile, this.state.selectedFile.name);

        this.props.changeProfilePhoto(fd);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleEditProfileClick = () => {
        const { profile } = this.props;
        const { profileData } = profile;

        this.setState({
            editProfile: true,
            binary: profileData.profilePhoto,

            // id: user && user.user && user.user.id,
            userName: profileData.userName,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            phoneNumber: profileData.phoneNumber,
            email: profileData.email,
            address: profileData.address,
            dateOfBirth: profileData.dateOfBirth
        });

    }

    handleExitEditProfileClick = () => {
        this.setState({
            editProfile: false
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true, editProfile: false });

        // const { userData } = this.state;
        const requestUserData = {
            // id: this.state.id,
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            dateOfBirth: this.state.dateOfBirth
        }

        // Action method Update Profile
        this.props.updateProfileData(requestUserData);
    }

    render() {
        const { profile } = this.props;
        const { profileData } = profile;
        const { editProfile } = this.state;

        let $imagePreview = (<img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail" alt="avatar" />);

        if (profileData && profileData.profilePhoto) {
            $imagePreview = (<img src={`data:image/jpeg;base64,${profileData.profilePhoto}`} className="avatar img-circle img-thumbnail" alt="icon" />);
        }

        if (this.state.imagePreviewUrl) {
            $imagePreview = (<img src={this.state.imagePreviewUrl} className="avatar img-circle img-thumbnail" alt="icon" />);
        }


        return (
            <Container className="bootstrap snippet">
                <Row xs={2}>
                    <Col sm={9}><h2>User Profile</h2></Col>
                    <Col sm={3}>
                        {!editProfile && <Button style={{ float: "right" }} onClick={this.handleEditProfileClick}> <FontAwesomeIcon icon={faPen} /> Edit Profile</Button>}
                        {editProfile && <Button title="Cancel profile editing" style={{ float: "right" }} onClick={this.handleExitEditProfileClick}>&times;</Button>}
                    </Col>
                </Row>
                <br></br>
                <Row xs={2}>
                    <Col sm={3}>
                        <div className="text-center">
                            <div className="photo-container">
                                {/* <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail" alt="avatar" /> */}
                                {$imagePreview}
                            </div>
                            <Input type='file' className="text-center center-block file-upload" name="file" onChange={this.fileSelectedHandler} />
                            {this.state.isSelected && <Button onClick={this.fileUploadHandler} style={{ marginTop: '1rem' }} className="btn-update-img">Update Photo</Button>}


                        </div>
                    </Col>

                    <Col sm={9}>
                        <div className="tab-content">
                            <div className="tab-pane active" id="home">
                                <Form onSubmit={this.handleSubmit}>
                                    <Row xs={2}>
                                        <FormGroup>
                                            <Col>
                                                <Label for="firstName" ><h6>First Name</h6></Label>
                                                <Input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    disabled={!editProfile}
                                                    placeholder="First Name"
                                                    onChange={this.handleChange}
                                                    defaultValue={profileData && profileData.firstName}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col>
                                                <Label for="lastName" ><h6>Last Name</h6></Label>
                                                <Input
                                                    type="text"
                                                    name="lastName"
                                                    disabled={!editProfile}
                                                    placeholder="Last Name"
                                                    onChange={this.handleChange}
                                                    defaultValue={profileData && profileData.lastName}
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Row>
                                    <Row xs={2}>
                                        <FormGroup>
                                            <Col>
                                                <Label for="firstName" ><h6>Username</h6></Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    id="userName"
                                                    name="userName"
                                                    disabled={true}
                                                    onChange={this.handleChange}
                                                    placeholder="Username"
                                                    defaultValue={profileData && profileData.userName}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col>
                                                <Label for="email" ><h6>Email</h6></Label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    disabled={!editProfile}
                                                    placeholder="email@domain.com"
                                                    onChange={this.handleChange}
                                                    defaultValue={profileData && profileData.email}
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Row>
                                    <Row xs={2}>
                                        <FormGroup>
                                            <Col>
                                                <Label for="dateOfBirth"><h6>Date of birth</h6></Label>
                                                <Input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    id="dateOfBirth"
                                                    disabled={!editProfile}
                                                    placeholder="1997-12-10"
                                                    onChange={this.handleChange}
                                                    defaultValue={profileData && profileData.dateOfBirth !== null ? profileData.dateOfBirth.toString().slice(0, 10) : null}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col>
                                                <Label for="phoneNumber"><h6>Phone Number</h6></Label>
                                                <Input
                                                    type="text"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    maxLength={10}
                                                    disabled={!editProfile}
                                                    placeholder="06x xxx xx xx"
                                                    onChange={this.handleChange}
                                                    defaultValue={profileData && profileData.phoneNumber}
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Row>
                                    <Row xs={1}>
                                        <FormGroup>
                                            <Col>
                                                {editProfile && <Button
                                                    type="submit"
                                                    color="dark"
                                                    style={{ marginTop: '2rem' }}
                                                    block
                                                >Update Profile</Button>}
                                            </Col>
                                        </FormGroup>
                                    </Row>
                                </Form>
                            </div>
                        </div>

                    </Col>

                </Row>

            </Container>

        );
    }
}

function mapState(state) {
    const { authentication, profile } = state;
    const { user } = authentication;
    const { profileData } = profile;

    return { user, profile, profileData };
}

const actionCreators = {
    getProfile: profileActions.getProfile,
    updateProfileData: profileActions.updateProfileData,
    changeProfilePhoto: profileActions.changeProfilePhoto
}

export default connect(mapState, actionCreators)(UserProfile);