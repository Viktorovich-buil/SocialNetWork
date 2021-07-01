import React from "react";
import classes from './notfound.module.css';
import {NavLink} from "react-router-dom";
import notfound from '../img/notfound.png'

type PropsType = {

}

const Error: React.FC<PropsType> = () => {
    return <div className={classes.error}>
        <div className={classes.errortext}>
            <div className={classes.text404}>404</div>
            <div className={classes.text}>LOOKS LIKE YOU'RE LOST AT SEA</div>
            <div className={classes.link}>
                <NavLink to='/profile'>You can go back to the profile page. </NavLink>
            </div>
        </div>
        <div> <img className={classes.image} src={notfound} alt={'404 Page not found'}/> </div>
    </div>
}

export default Error;
