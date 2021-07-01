import React from "react";
import classes from './Preloader.module.css'

type PropsType = {

}

let Preloader2: React.FC<PropsType> = () => {
    return <div>
        <meta  name = "viewport" content = "width=device-width" />
        <div className={classes.body}>
            <div className={classes.water}>
                          <div className={classes.text2}>
                    A user with this name does not exist.<br/> Please change the search value. </div>
            </div>
        </div>
    </div>
}
export default Preloader2;

