import React from "react";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";





class HeaderContainer extends React.Component {

    render() {
        return (<Header {...this.props}/>)
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id
});

let UrlDataContainerComponent = withRouter(HeaderContainer);

export default connect (mapStateToProps, {logout}) (UrlDataContainerComponent);

