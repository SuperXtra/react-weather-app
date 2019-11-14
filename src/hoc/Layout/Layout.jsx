import React, {Component} from 'react';
import cssClasses from './Layout.module.css'
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    };

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    };

    render () {
        return (
            <Aux>
                <Toolbar
                    isAuth = {this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth = {this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={cssClasses.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStatetoProps = state => {
    return {
        isAuthenticated: state.authentication.token !== null
    };
};

export default connect(mapStatetoProps)(Layout);