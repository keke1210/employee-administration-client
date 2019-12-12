import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { userActions } from '../../actions/user.actions';
import { profileActions } from '../../actions/profile.actions';
import { Col } from 'reactstrap';

export class UserProfile extends Component {
    state = {
        selectedFile: null,
        imagePreviewUrl: null,
        userName: '',
        firstName: '',
        lastName: '',
        submitted: false
    }

    componentDidMount() {
        this.props.myProfile();

        const { user } = this.props;
        this.setState({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
        });

    }
    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
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
        const fd = new FormData();
        fd.append('ProfilePhoto', this.state.selectedFile, this.state.selectedFile.name)
        axios.post("https://localhost:44339/api/v1/profile/changePhoto/13", fd)
            .then(res => console.log(res));

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { userName, firstName, lastName } = this.state;
        console.log("Submitted: " + userName + " " + firstName + " " + lastName);
        // Action method 
        // Update Profile
    }

    render() {
        const { user, profile } = this.props;
        var myData = profile;
        console.log(myData)

        let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);




        if (myData.profilePhoto) {
            console.log("binary")
            $imagePreview = (<div className="image-container" ><img alt="icon" width="200" src={`data:image/jpeg;base64,${myData.profilePhoto}`} /></div>);
        }

        if (this.state.imagePreviewUrl) {
            console.log("alt")
            $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
        }
        return (
            <div className="App">
                <h2>
                    <div className="m-l-lg">Profile</div>
                </h2>
                <div className="container">
                    <h4>Hi you are a {user.role}</h4>


                    <input type='file' onChange={this.fileSelectedHandler} />
                    <Col xs={6} md={4}>
                        {$imagePreview}
                        {/* {profilePicture} */}
                    </Col>
                    <button onClick={this.fileUploadHandler}>Upload</button>
                </div>
                <br></br>
                <br></br>
                <div className="container">
                    <div className="card card-body mt-5">
                        <div className="form-group">
                            <form onSubmit={this.handleSubmit}>
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="userName"
                                    onChange={this.handleChange}
                                    placeholder="Username"
                                    value={this.state.userName}
                                />
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={this.handleChange}
                                    value={this.state.firstName}
                                />
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    placeholder="Last Name"
                                    onChange={this.handleChange}
                                    value={this.state.lastName}
                                />
                                <button type="submit">Update data</button>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

function mapState(state) {
    const { authentication, profile } = state;
    const { user } = authentication;
    return { user, profile };
}

const actionCreators = {
    myProfile: profileActions.getProfile,
    // getUsers: userActions.getAll,
    //  deleteUser: userActions.delete
}

export default connect(mapState, actionCreators)(UserProfile);