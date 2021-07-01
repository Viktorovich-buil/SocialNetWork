import React from "react";
import {connect} from "react-redux";
import {getUserProfile, savePhoto} from "../../redux/profile-reducer";
import Navbar from "./Navbar";
import {AppStateType} from "../../redux/redux-store";

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
       savePhoto: (file: File) => void
}

type PropsType = MapPropsType & DispatchPropsType;

class NavContainer extends React.Component<PropsType> {

    render() {
        return (
            <Navbar {...this.props}
                    profile={this.props.profile}
                    savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
});


const NavContainerComponent = connect(mapStateToProps, {
    getUserProfile,
    savePhoto
})(NavContainer);

export default NavContainerComponent;

