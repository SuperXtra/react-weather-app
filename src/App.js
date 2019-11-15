import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import './App.css';
import Layout from './hoc/Layout/Layout';
import SearchData from "./containers/SearchData/SearchData";
import Authentication from './containers/Authentication/Authentication';
import Favourites from "./containers/Favourites/Favourites";
import Logout from './containers/Logout/logout';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {

        let routes = (
            <Switch>
            <Route path="/auth" component={Authentication}/>
            <Route path="/" exact component={SearchData}/>
            <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
            <Switch>
                <Route path="/favourites" component={Favourites}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/" exact component={SearchData}/>
                <Route path="/auth" component={Authentication}/>
                <Redirect to="/"/>

            </Switch>

            );
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
              onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
