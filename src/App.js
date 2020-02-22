import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      user: null
    }
  }

  async componentDidMount() {
    let resp = await fetch("/api/v1/dashboard");
    if (resp.ok) {
      let data = await resp.json();
      this.setState({isAuth: true, user: data.user});
    } else if (resp.status === 403) {
      this.setState({isAuth: false});
    }
  }

  render() {
    if (this.state.isAuth) {
      return (
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink exact to="/" className="nav-link" activeClassName="active">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/items" className="nav-link" activeClassName="active">Items</NavLink>
                </li>
              </ul>
            </div>
          </nav>

          <div className="container-fluid">
            <Switch>
              <Route path="/items">
                <p>...</p>
              </Route>
              <Route path="/">
                <p>...</p>
              </Route>
            </Switch>
          </div>
        </Router>
      );
    } else {
      return (<p>Login issue</p>);
    }
  }
}

export default App;
