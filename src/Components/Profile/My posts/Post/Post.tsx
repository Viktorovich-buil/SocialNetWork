import React from "react";
import classes from './Post.module.css';
import defoultuseravatar from '../../../img/defaultuser.png'

type PropsType = {
    post: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
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
