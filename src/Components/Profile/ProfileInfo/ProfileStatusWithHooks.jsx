import React, {useEffect, useState} from 'react';
import classes from "./ProfileInfo.module.css";

// //массив со значением и функц
// let array = [0, ()=>];
// //присваиваем значения а=0, setA = функции По очереди
// let [a, setA] = array;


const ProfileStatusWithHooks = (props) => {
    // let stateWithSetState = useState(true);
    // let editMode = stateWithSetState [0];
    // let setEditMode = stateWithSetState [1];
    //запись в одну строку
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( ()=> {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode (false)
        props.updateUserStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus (e.currentTarget.value)
    }

    return <div>
        {!editMode &&
        <div>
            <span onDoubleClick={activateEditMode}>{props.status || '-----'}</span>
        </div>
        }
        {editMode &&
        <div>
            <input className={classes.input}
                   autoFocus={true}
                   value={status}
                   onBlur={deactivateEditMode}
                   onChange={onStatusChange} />
        </div>
        }
    </div>
}

export default ProfileStatusWithHooks;
