import React from "react";
import classes from './Preloader.module.css'

let Preloader = (props) => {
    return <div>
        <meta  name = "viewport" content = "width=device-width" />
        <div className={classes.body}>
            <div className={classes.water}>
                <br/>
                <div className={classes.text}> Loading...</div>
            </div>
        </div>
    </div>
}
export default Preloader;

