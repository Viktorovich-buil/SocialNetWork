import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getUserProfile, savePhoto} from "../../redux/profile-reducer";
import Navbar from "./Navbar";


class NavContainer extends React.Component {

    render() {
        return (
            <Navbar {...this.props}
                    profile={this.props.profile}
                    savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
});

let NavContainerComponent = withRouter(NavContainer);

export default connect(mapStateToProps, {
    getUserProfile,
    savePhoto
})(NavContainerComponent);
