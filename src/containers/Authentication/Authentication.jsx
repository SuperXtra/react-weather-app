import React, {Component} from "react";
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import cssStyling from './Authentication.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

const patternNumeric = /^\d+$/;
const patternEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;


class Authentication extends Component {


    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 10
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    };

    componentDidMount() {
            this.props.onSetAuthRedirectPath();
    }



    checkValidity(value, rules) {

        const validateEmail = (value, rules) => rules.isEmail ? patternEmail.test(value) : true;
        const isEmpty = (value, rules) => rules.required ? value.trim() !== '' : true;
        const validateMinimumLength = (value, rules) => rules.minLength ? value.length >= rules.minLength : true;
        const validateMaximumLength = (value, rules) => rules.maxLength ? value.length <= rules.maxLength : true;
        const validateNumericType = (value, rules) => rules.isNumeric ? patternNumeric.test(value) : true;

        const validations = [
            validateNumericType,
            validateEmail,
            validateMaximumLength,
            validateMinimumLength,
            isEmpty,
        ];

        if (!rules) {
            return true;
        } else return validations.map(x => x(value, rules)).reduceRight((prev, next)=>prev && next);
    }


    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
               ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls})
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(previousState => {
            return {isSignup: !previousState.isSignup};
        })
    };

    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

if (this.props.loading) {
    form = <Spinner/>
}

let authRedirect = null;

if (this.props.isAuthenticated) {
    authRedirect = <Redirect to="/favourites"/>
}

        return (
            <div className={cssStyling.exactAuth}>
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <div className="text-center">
                    <button type="submit" className="btn btn-outline-success mr-1 ml-2">{this.state.isSignup ? 'Login' : 'Create account' }</button>
                    <button onClick={this.switchAuthModeHandler} type="submit" className="btn btn-outline-warning ml-1">SWITCH TO {this.state.isSignup ? 'SIGN UP' : 'SIGN IN' }</button>
                    </div>
                    </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.authentication.loading,
        error: state.authentication.error,
        isAuthenticated: state.authentication.token !== null,
        authRedirectPath: state.authentication.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
      onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);