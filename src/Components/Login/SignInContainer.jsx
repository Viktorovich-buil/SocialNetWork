import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import Login from "./Login";
import Content from "../../Content";
import {initializeApp} from "../../redux/app-reducer";
import Preloader from "../Common/Preloader/Preloader";


class SignInContainer extends React.Component {
    catchAllUnhandledErrors = (reason, promise) => {
        alert('Alarm!!! some error occured :(');
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)

    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (<div>
            {this.props.isAuth
                ? <Content {...this.props} />
                : <Login />}
        </div>)
    }
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default SignInContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(SignInContainer);


