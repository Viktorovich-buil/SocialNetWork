import React, {useState} from "react";
import classes from "./Paginator.module.css";
import cn from 'classnames'


let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 6}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={classes.paginator}>
        {portionNumber > 1 &&
        <button className={classes.button} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}><b>&lt;</b></button>}
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={cn({[classes.selectedPage]: currentPage === p}, classes.pageNumber)}
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}> {p} </span>
            })}

        {portionCount > portionNumber && <button className={classes.button} onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}><b>&gt;</b></button>}
    </div>
}
export default Paginator;

