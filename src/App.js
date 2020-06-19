import React from 'react';
import './App.css';
import Login from './login';
import styled from 'styled-components';
import {isNil} from 'ramda';
import MainPage from './mainPage.js'
import ReceiptPage from './receiptPage';
import AddStock from './AddStock';
import {Switch, Route, Redirect, withRouter, RouteComponentProps, BrowserRouter} from 'react-router-dom';

interface State {
  loggedIn: boolean;
}

class App extends React.Component<RouteComponentProps,State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      loggedIn: this.isLoggedIn(),
    };
  };

  isLoggedIn = () => {
    return !isNil(localStorage.getItem('token'));
  };

  handleLogin = () => {
    this.setState({
      loggedIn: true,
    });
    this.props.history.push("/menu");
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({
        loggedIn: false
    });
    this.props.history.push("/login");
  };

  render() {
    const {loggedIn} = this.state;
    console.log(loggedIn);
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact={true}
              path="/login"
              render = { () => {
                return loggedIn ? <Redirect to={"/menu"}/> : <Login onLogin={this.handleLogin} /> ;
              }}
            />
            {loggedIn && (<Route
              exact={true}
              path="/menu"
              render={()=>{
                return localStorage.getItem('token') ? <MainPage onLogout={this.handleLogout} /> : <Redirect to={"/login"}/>;
              }}
            />)}
            {loggedIn && (<Route
              exact={true}
              path="/generateReceipt"
              render={(props)=>{
                return localStorage.getItem('token') ? <ReceiptPage/> : <Redirect to={"/login"}/>;
              }}
            />)}
            {loggedIn && (<Route
               exact={true}
               path="/addStock"
               render={(props)=>{
                 return localStorage.getItem('token') ? <AddStock/> : <Redirect to={"/login"}/>;
               }}
             />)}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default withRouter(App);
