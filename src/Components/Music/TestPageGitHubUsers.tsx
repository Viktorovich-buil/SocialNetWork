import React, {useEffect, useState} from "react";
import classes from './TestPageGitHubUsers.module.css';
import axios from "axios";

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUserType []
}
type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}


type SearchPropsType = {
    value: string
    onSubmit: (fixedValue: string) => void
}
export const Search = (props: SearchPropsType) => {
    const [tempSearch, setTempSearch] = useState<string>('')

    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])

    return (
        <div>
            <input placeholder={'search'} value={tempSearch}
                   onChange={(e) => {
                       setTempSearch(e.currentTarget.value)
                   }}/>
            <button onClick={() => {
                props.onSubmit(tempSearch)
            }}>Find
            </button>
        </div>)
}

type UsersListPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}
export const UsersList = (props: UsersListPropsType) => {
    const [users, setUsers] = useState<SearchUserType[]>([])
    useEffect(() => {
        console.log('SYNC USERS')
        //рефактор
        //  fetchData(tempSearch)
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [props.term])

    return (
        <ul>
            {users.map(u => <li key={u.id} className={props.selectedUser === u ? classes.selected : ''}
                                onClick={() => {
                                    props.onUserSelect(u)
                                }}>
                {u.login}
            </li>)}
        </ul>
    )
}

type TimerPropsType = {
    seconds: number
    onChange: (actualSeconds: number) => void
    timerKey: string
}
export const Timer = (props: TimerPropsType) => {
    const [seconds, SetSeconds] = useState(props.seconds)
    useEffect(() => {
        SetSeconds(props.seconds)
    }, [props.seconds])

    useEffect(() => {
        props.onChange(seconds)
    }, [seconds])

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('tick')
            SetSeconds((prev) => prev - 1)
        }, 1000)

        //Очитска счетчика. Необходим intervalId
        return () => {clearInterval(intervalId)}
    }, [props.timerKey])

    return (
        <div>
            {seconds}
        </div>
    )
}

type UserDetailsPropsType = {
    user: SearchUserType | null
}
const startTimerSecond = 5;

export const UserDetails = (props: UserDetailsPropsType) => {

    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    const [seconds, setSeconds] = useState(startTimerSecond)

    useEffect(() => {
        console.log('SYNC USER DETAILS')
        if (!!props.user) {
            axios
                .get<UserType>(`https://api.github.com/users/${props.user.login}`)
                .then(res => {
                    //зависит от порядка строк. не будет обновлятся счетчик если поменять местами
                    setSeconds(startTimerSecond)
                    setUserDetails(res.data)

                })
        }
    }, [props.user])
    useEffect(() => {
        if (seconds < 1) {
            setUserDetails(null)
        }
    }, [seconds])

    return (
        <div>
            {userDetails && <div>
                <h2>{userDetails.login}</h2>
                <div>
                    <img src={userDetails.avatar_url} width={250}/>
                    <br/>
                    followers: {userDetails.followers}
                </div>
                <Timer seconds={seconds} onChange={setSeconds} timerKey={userDetails.id.toString()}/>
            </div>}
        </div>
    )
}

export const TestPageGitHubUsers: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>('Viktorovich-')

    //рефактор вынос функции запроса на сервер
    // const fetchData = (term: string) => {
    //     axios
    //         .get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
    //         .then(res => {
    //             setUsers(res.data.items)
    //         })
    // }

    useEffect(() => {
        console.log('SYNC TITLE')
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return <div className={classes.container}>
        <div>
            <Search value={searchTerm} onSubmit={(value: string) => {
                setSearchTerm(value)
            }}/>
            <button onClick={() => setSearchTerm('Viktorovich-')}>Reset</button>

            <UsersList term={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser}/>

        </div>
        <UserDetails user={selectedUser}/>
    </div>
}
export default TestPageGitHubUsers;


//ВСЕ В ОДНОЙ КОМПОНЕНТЕ
// type SearchUserType = {
//     login: string
//     id: number
// }
// type SearchResult = {
//     items: SearchUserType []
// }
// type UserType = {
//     login: string
//     id: number
//     avatar_url: string
//     followers: number
// }
//
//
// export const TestPageGitHubUsers: React.FC = () => {
//
//     const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
//     const [userDetails, setUserDetails] = useState<null | UserType>(null)
//     const [users, setUsers] = useState<SearchUserType[]>([])
//     const [tempSearch, setTempSearch] = useState<string>('Viktorovich-')
//     const [searchTerm, setSearchTerm] = useState<string>('Viktorovich-')
//
//     //рефактор вынос функции запроса на сервер
//     // const fetchData = (term: string) => {
//     //     axios
//     //         .get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
//     //         .then(res => {
//     //             setUsers(res.data.items)
//     //         })
//     // }
//
//     useEffect(() => {
//         console.log('SYNC TITLE')
//         if (selectedUser) {
//             document.title = selectedUser.login
//         }
//     }, [selectedUser])
//
//     useEffect(() => {
//         console.log('SYNC USERS')
//         //рефактор
//         //  fetchData(tempSearch)
//         axios
//             .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
//             .then(res => {
//                 setUsers(res.data.items)
//             })
//     }, [searchTerm])
//
//     useEffect(() => {
//         console.log('SYNC USER DETAILS')
//         if (!!selectedUser) {
//             axios
//                 .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
//                 .then(res => {
//                     setUserDetails(res.data)
//                 })
//         }
//     }, [selectedUser])
//
//     return <div className={classes.container}>
//         <div>
//             <div>
//                 <input placeholder={'search'} value={tempSearch}
//                        onChange={(e) => {
//                            setTempSearch(e.currentTarget.value)
//                        }}/>
//                 <button onClick={() => {
//                     setSearchTerm(tempSearch)
//                 }}>Find
//                 </button>
//             </div>
//             <ul>
//                 {users.map(u => <li key={u.id} className={selectedUser === u ? classes.selected : ''}
//                                     onClick={() => {
//                                         setSelectedUser(u)
//                                     }}>
//                     {u.login}
//                 </li>)}
//             </ul>
//         </div>
//
//         {userDetails && <div>
//             <h2>{userDetails.login}</h2>
//             <div>
//                 <img src={userDetails.avatar_url} width={250}/>
//                 <br/>
//                 followers: {userDetails.followers}
//             </div>
//         </div>}
//     </div>
// }
// export default TestPageGitHubUsers;

