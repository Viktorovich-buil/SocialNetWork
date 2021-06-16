import React from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from "../img/Logo2.png";


const Header = (props) => {
    return <div className={classes.header}>
        <div className={classes.headerContent}>
            <NavLink to='/profile' className={classes.headerText}><img className={classes.headerText} src={logo}
                                                                       alt='logo'/> </NavLink>
            <div className={classes.langru}>
                <NavLink to='/ru' activeClassName={classes.active}>RU</NavLink>
            </div>
            <div className={classes.langen}>
                <NavLink to='/en' activeClassName={classes.active}>EN</NavLink>
            </div>
            <div className={classes.log}>
                {props.isAuth
                    ? <div >
                        <button className={classes.buttonlogout} onClick={props.logout}>
                            <div className={classes.text}>Login: {props.login}</div>
                            <div className={classes.text}>ID: {props.id}</div>
                            <div className={classes.textlogout}>LOG OUT</div>
                        </button>
                    </div>
                    : <div className={classes.log}>
                        <NavLink to='/log' activeClassName={classes.active}>LOG IN</NavLink>
                    </div>}
            </div>
        </div>
    </div>
}

export default Header;
