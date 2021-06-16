import React from 'react';
import Paginator from "../Common/Paginate/Paginator";
import User from "./User";
import classes from './Users.module.css'


let Users = ({currentPage, onPageChanged, pageSize, totalUsersCount, users, ...props}) => {
    return <div className={classes.content}>
        <div className={classes.paginator}>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       pageSize={pageSize}
                       totalItemsCount={totalUsersCount}/>
        </div>
        <div className={classes.users}>
            {users.map(u => <User user={u}
                                  key={u.id}
                                  followingInProgress={props.followingInProgress}
                                  unfollow={props.unfollow}
                                  follow={props.follow}/>)
            }
        </div>
    </div>
}

export default Users;
