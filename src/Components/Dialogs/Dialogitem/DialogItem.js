import React from "react";
import classes from './DialogItem.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id
    return <div className={classes.item + ' ' + classes.active}>
        <img className={classes.imgavatar} src={props.avatar} alt='Аватар'/>
        <NavLink to={path} activeClassName={classes.active}>{props.name}</NavLink>
    </div>
}

export default DialogItem;


