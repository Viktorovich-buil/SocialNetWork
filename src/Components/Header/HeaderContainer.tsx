import React from "react";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    logout: () => void
}

type PropsType = MapPropsType & DispatchPropsType;


class HeaderContainer extends React.Component<PropsType> {

    render() {
        return (<Header {...this.props}/>)
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id
});

const HeaderContainerComponent = connect (mapStateToProps, {logout})(HeaderContainer)
export default HeaderContainerComponent;

// let UrlDataContainerComponent = withRouter(HeaderContainer);
//
// export default connect (mapStateToProps, {logout}) (UrlDataContainerComponent);


//
// const NavContainerComponent = connect(mapStateToProps, {
//     getUserProfile,
//     savePhoto
// })(NavContainer);
//
// export default NavContainerComponent;
