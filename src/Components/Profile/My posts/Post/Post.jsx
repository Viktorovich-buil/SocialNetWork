import React from "react";
import classes from './Post.module.css';
import defoultuseravatar from '../../../img/defaultuser.png'

const Post = (props) => {
    return <div className={classes.item}>
        <div className={classes.posts}>
            <div>
                <img className={classes.itemimg}
                     src={defoultuseravatar} alt='Avatar'/>
            </div>
            <div className={classes.posttext}>
                {props.post}
            </div>
            <div className={classes.postlike}>
                {props.likesCount} like
            </div>
        </div>
    </div>

}

export default Post;
