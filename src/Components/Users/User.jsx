import React from 'react';
import classes from './Users.module.css';
import userDefaultPhoto from '../img/defaultuser.png';
import {NavLink} from "react-router-dom";


let User = ({user, followingInProgress, unfollow, follow}) => {
    return <div className={classes.user}>
              <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userDefaultPhoto}
                             className={classes.userPhoto} alt={'AvatarPhoto'}/>
                        </NavLink>

                    </div>
                    <div>
                        {user.followed
                            ?
                            <button className={classes.button}
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        unfollow(user.id);
                                    }}>Unfollow</button>
                            :
                            <button className={classes.button}
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        follow(user.id);
                                    }}>Follow</button>}
                            </div>
                            </span>
        <span>
                            <div className={classes.datauser}>
                            <div>Name: {user.name}</div>
                            <div className={classes.text}>Status: {user.status ? user.status :
                                '---'}</div>
                              <div className={classes.text}>ID: {user.id}</div>
                            </div>
                              </span>
    </div>
}


export default User;

//нажатие кнопки добавляло новых юзеров
// <button onClick={getUsers}>Get UsersApiComponent</button>

// {u.followed
//     ? <button onClick={() => {
//         axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
//             {
//                 withCredentials: true,
//                 headers: {'API-KEY': '4ec8c38e-55f5-42e0-90c0-dd3ccf362845'}
//             }
//         )
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     props.unfollow(u.id)
//                 }
//             });
//
//     }}>Unfollow</button>
//     : <button onClick={() => {
//
//         axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
//             withCredentials: true,
//             headers: {'API-KEY': '4ec8c38e-55f5-42e0-90c0-dd3ccf362845'}
//         })
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     props.follow(u.id)
//                 }
//             });
//     }}>Follow</button>}


//
// {u.followed
//     ? <button onClick={() => followAPI.unfollowUser(u).then(data => {
//         if (data.resultCode === 0) {
//             props.unfollow(u.id)
//         }
//     })
//     }>Unfollow</button>
//     : <button onClick={() => followAPI.followUser(u).then(data => {
//         if (data.resultCode === 0) {
//             props.follow(u.id)
//         }
//     })
//     }>Follow</button>}
