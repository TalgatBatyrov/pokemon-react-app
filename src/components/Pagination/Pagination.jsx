import React, { useState } from 'react';
import style from './Pagination.module.css';

const Pagination = ({ totalCount, pageSize, currentPage, onPageChanged, getPokemons, portionSize = 10 }) => {

    const pagesCount = Math.ceil(totalCount / pageSize);

    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);

    const [portionNumber, setPortionNamber] = useState(1);

    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;

    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={style.pageSizeButton}>
            <button disabled={currentPage === 1} onClick={() => getPokemons(currentPage - 1)}>◄</button>
            {portionNumber > 1 && <button onClick={() => setPortionNamber(portionNumber - 1)}>Prev</button>}
            {
                pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <span className={currentPage === p ? style.selectedPage : style.page}
                            onClick={(e) => { onPageChanged(p) }} key={p} >
                            {p}</span>
                    })
            }
            {portionCount > portionNumber && <button onClick={() => setPortionNamber(portionNumber + 1)}>Next</button>}
            <button disabled={currentPage === pagesCount} onClick={() => getPokemons(currentPage + 1)}>►</button>
        </div >
    );
};

export default Pagination;