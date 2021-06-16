import React from "react";
import classes from './Nav.module.css';
import {NavLink} from "react-router-dom";
import profilelogo from './../img/profile.png'
import messagelogo from './../img/message.png'
import newslogo from './../img/news2.png'
import musiclogo from './../img/music2.png'
import friendslogo from './../img/friends.png'
import settingslogo from './../img/settings.png'
import userDefaultPhoto from "../img/defaultuser.png";
import NavbarEmpty from "./NavbarEmpty";

const Navbar = ({
                    profile,
                    savePhoto,
                }) => {
    if (!profile) {
        return (<NavbarEmpty/>)
    }
    return <nav className={classes.nav}>
        <div>
            <img className={classes.logoavatar} src={profile.photos.small ? profile.photos.small : userDefaultPhoto}
                 alt='Аватар'/>
        </div>
        <div className={classes.item}>
            <NavLink to='/profile' activeClassName={classes.active}>
                <img className={classes.navlogo} src={profilelogo} alt='Profile'/>Profile</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/dialogs' activeClassName={classes.active}>
                <img className={classes.navlogo} src={messagelogo} alt='Messages'/>Messages</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/news' activeClassName={classes.active}>
                <img className={classes.navlogo} src={newslogo} alt='News'/>News</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/music' activeClassName={classes.active}>
                <img className={classes.navlogo} src={musiclogo} alt='Music'/>Music</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/users' activeClassName={classes.active}>
                <img className={classes.navlogo} src={friendslogo} alt='Friends'/>Friends</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/settings' activeClassName={classes.active}>
                <img className={classes.navlogo} src={settingslogo} alt='Settings'/>Settings</NavLink>
        </div>
    </nav>
}

export default Navbar;

