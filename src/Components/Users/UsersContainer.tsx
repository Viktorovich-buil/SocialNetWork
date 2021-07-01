import {useSelector} from "react-redux";
import {getIsFetching,} from "../../redux/users-selectors";
import React from "react";
import Preloader from "../Common/Preloader/Preloader";
import {Users} from "./Users";


export type UsersPagePropsType = {

}
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader/> : null}
        <Users  />
    </>
}

