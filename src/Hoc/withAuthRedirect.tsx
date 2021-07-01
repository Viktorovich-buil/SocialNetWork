import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
}as MapPropsType);

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {
}

export function withAuthRedirect <WCP> (Component: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC <MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/log'}/>
        return <Component {...restProps as WCP}/>
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect, {})(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}
