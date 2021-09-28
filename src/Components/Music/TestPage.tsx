import React, {useState} from "react";
import {login} from "../../redux/auth-reducer";

//массив пар
type UsersType = Array<[number, number]>
const users: UsersType = [
    [10, 50],
    [1, 75],
    [3, 6]
]

//функция поиск максимальной пары
function findMax(users: UsersType) {
     let maxPair = null
    for (let i = 0; i < users.length; i++) {
        if (maxPair === null) {
            maxPair = users[i];
        } else if (Math.max(users[i][0], users[i][1]) > Math.max(maxPair[0], maxPair[1]))
            maxPair = users[i];
    }
    return maxPair;
}


export const TestPage: React.FC = () => {

    //поиск максимальной пары
    // let pair = findMax(users)
    // if (pair === null) {
    //     pair = [10, 10]
    // }
    //Вариант стэйта с одним значение, в данном случае функция max будет вызываться постоянно
    // let [player1Counter, setPlayer1Counter] = useState(pair[0]);
    // let [player2Counter, setPlayer2Counter] = useState(pair[1]);


    //в хуке в качестве стэйта вызываем функцию по поиску
    let [player1Counter, setPlayer1Counter] = useState(() => {
        let pair = findMax(users)
        if (pair === null) {
           return 10;
        }
        return pair [0]
    });
    let [player2Counter, setPlayer2Counter] = useState(() => {
        let pair = findMax(users)
        if (pair === null) {
            return 10;
        }
        return pair [1]
    });



    return <div>
        <div>
            <div>Peter</div>
            <div>{player1Counter}</div>
            <button onClick={() => {
                //чтобы избежать проблем с актуальным значением необходимо использовать такую запись
                setPlayer1Counter((actual: number) => actual + 1)
            }}>+
            </button>
        </div>
        <hr/>
        <div>
            <div>Ivan</div>
            <div>{player2Counter}</div>
            <button onClick={() => {
                setPlayer2Counter(player2Counter + 1)
            }}>+
            </button>
        </div>
        <hr/>
        <button onClick={() => {
            setPlayer1Counter((actual) => actual - 1)
            setPlayer2Counter((actual) => actual - 1)
        }}>-
        </button>
        <button onClick={() => {
            setPlayer1Counter(10)
            setPlayer2Counter(10)
        }}>reset
        </button>
    </div>
}
export default TestPage;

//Вариант стэйта как объекта
// let [counters, setCounters] = useState({
//     c1: 10,
//     c2: 10
// });
//
// return <div>
//     <div>
//         <div>Peter</div>
//         <div>{counters.c1}</div>
//         <button onClick={() => {
//             //чтобы избежать мутации (изменения свойств объекта, но не объекта) необходимо создавать копию объекта. Иначе не будет перерисовки!!!
//             setCounters((actual) => {
//                 return {...actual, c1: actual.c1 + 1}
//             })
//         }}>+
//         </button>
//     </div>
//     <hr/>
//     <div>
//         <div>Ivan</div>
//         <div>{counters.c2}</div>
//         <button onClick={() => {
//             setCounters((actual) => {
//                 return {...actual, c2: actual.c2 + 1}
//             })
//         }}>+</button>
//     </div>
//     <hr/>
//     <button onClick={() => {
//         setCounters((actual) => {
//             return {
//                 ...actual,
//                 c1: actual.c1 - 1,
//                 c2: actual.c2 - 1
//             }
//         })
//     }}>-</button>
//         <button onClick={() => {
//             setCounters((actual) => {
//                 return {
//                     ...actual,
//                     c1: 10,
//                     c2: 10
//                 }
//             })
//         }}>reset</button>
//         </div>
//         }
