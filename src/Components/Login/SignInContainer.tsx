import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import Login from "./Login";
import Content from "../../Content";
import {initializeApp} from "../../redux/app-reducer";
import Preloader from "../Common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";

type MapPropsType = ReturnType <typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}


class SignInContainer extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
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


const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default compose <React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(SignInContainer);


