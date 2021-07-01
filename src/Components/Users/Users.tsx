import React, {useEffect} from 'react';
import Paginator from "../Common/Paginate/Paginator";
import User from "./User";
import classes from './Users.module.css'
import {UserSearchForm} from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import Preloader2 from "../Common/Preloader/Preloader2";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import { useHistory } from 'react-router-dom';
import * as queryString from "querystring";

type PropsType = {
    }
type QueryParamsType = { term?: string, page?: string, friend?: string };

export const Users: React.FC<PropsType> = () => {
    //HOOK
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch();
    const history = useHistory();


     useEffect(() => {
        const search = history.location.search
        const parsed = queryString.parse(search.substr(1)) as  QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter
        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true'}

        dispatch(requestUsers(actualPage, pageSize, actualFilter));
    }, [])

    useEffect(() => {
       const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)


        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])


    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    }


    const unfollowUser = (userID: number) => {
        dispatch(unfollow(userID))
    }

    const followUser = (userID: number) => {
        dispatch(follow(userID))
    }

    return <div className={classes.content}>
        {totalUsersCount === 0 ?
            <div className={classes.paginator2}>No result for Pagination</div>
            : null}
        <div className={classes.paginator}>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       pageSize={pageSize}
                       totalItemsCount={totalUsersCount}/>
        </div>
        <UserSearchForm onFilterChanged={onFilterChanged}/>
        <div className={classes.users}>
            {users.map(u => <User user={u}
                                  key={u.id}
                                  followingInProgress={followingInProgress}
                                  unfollow={unfollowUser}
                                  follow={followUser}/>)
            }
        </div>
        {totalUsersCount === 0 ? <Preloader2/> : null}

    </div>
}

