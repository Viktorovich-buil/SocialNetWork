import React, {Suspense} from "react";
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {LoginPage} from "./Components/Login/LoginPage";
import Preloader from "./Components/Common/Preloader/Preloader";
import NavContainer from "./Components/Nav/NavContainer";
import Error from "./Components/404/404";
import UnderConstractionPage from "./Components/Music/UnderConstractionPage";
import {UsersPage} from "./Components/Users/UsersContainer";
import {withSuspense} from "./Hoc/withSuspense";


const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)



const Content: React.FC = () => {
    return <div className='app-wrapper'>
        <HeaderContainer/>
        <NavContainer/>
        <div className='app-wrapper-content'>
            <Suspense fallback={<Preloader/>}>
                <Switch>
                    <Route path='/profile/:userId?' render={() => <SuspendedProfile />}/>
                    <Route path='/dialogs' render={() => <SuspendedDialogs />}/>
                    <Route path='/news' render={() => <UnderConstractionPage/>}/>
                    <Route path='/music' render={() => <UnderConstractionPage/>}/>
                    <Route path='/users' render={() => <UsersPage />}/>
                    <Route path='/settings' render={() => <UnderConstractionPage/>}/>
                    <Route path='/ru' render={() => <UnderConstractionPage/>}/>
                    <Route path='/en' render={() => <UnderConstractionPage/>}/>
                    <Route path='/log' render={() => <LoginPage/>}/>
                    <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                    <Route path="/404" component={Error}/>
                    <Route path="*" render={() => <Redirect to={"/404"}/>}/>
                </Switch>
            </Suspense>
        </div>
    </div>
}


export default Content;

