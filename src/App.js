import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { history, Role } from './_helpers';
import AppNavBar from './components/layouts/AppNavBar';
import Dashboard from './components/tasks/Dashboard';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import UserProfile from './components/accounts/UserProfile';
import { PrivateRoute } from './components/common';
import { UserList } from './components/users';
import { alertActions } from './actions';
import { connect } from 'react-redux';
import DepartmentsList from './components/departments/DepartmentsList';
import ProjectsList from './components/projects/ProjectsList';
import TaskList from './components/tasks/TaskList';
import ProjectTasks from './components/projects/ProjectTasks';
import ShowUser from './components/users/ShowUser';
// import { Alert } from 'reactstrap';
import AlertHandler from './components/layouts/AlertHandler';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false })
      }, 200)
    });
  }

  render() {
    const { alert } = this.props;

    return (

      <Fragment>

        <Router history={history}>
          <Fragment>
            <AppNavBar />
            <div className="container">
              {/* <button onClick={this.onShowAlert} >Click</button> 
              {alert.message && <Alert color={alert.type} isOpen={this.state.visible} transition={{ in: true, timeout: 2000 }}> {alert.message}</Alert  >} */}
              {/* {alert.message &&
                <div onLoad={this.onShowAlert} className={`alert alert-${alert.type}`}>Error: {alert.message}</div>
              } */}
              <AlertHandler alert={alert} />
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/users" roles={[Role.Administrator]} component={UserList} />
                <PrivateRoute path="/users/:id" component={ShowUser} />
                <PrivateRoute exact path="/departments" component={DepartmentsList} />
                <PrivateRoute exact path="/projects" component={ProjectsList} />
                <PrivateRoute path="/projects/:id" component={ProjectTasks} />
                <PrivateRoute exact path="/tasks" component={TaskList} />
                <PrivateRoute exact path="/profile" component={UserProfile} />

                <Redirect from="*" to="/" />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Fragment>
    );
  }

}


function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(App);
