import React from "react";
import classes from './Preloader.module.css'

type PropsType = {

}

let Preloader: React.FC<PropsType> = () => {
    return <div className={classes.body}>
        <meta  name = "viewport" content = "width=device-width" />
        <div>
            <div className={classes.water}>
                <br/>
                <div className={classes.text}> Loading...</div>
            </div>
        </div>
    </div>
}
export default Preloader;

