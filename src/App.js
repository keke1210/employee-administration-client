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


class App extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
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
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/users" roles={[Role.Administrator]} component={UserList} />
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
