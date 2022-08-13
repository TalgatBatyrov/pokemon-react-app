import React from 'react';
import Pagination from '../../Pagination/Pagination';
import Pokemon from './Pokemon/Pokemon';
import style from './PokemonData.module.css';

const PokemonData = ({ pokemons, getPokemons, onPageChange, currentPage, pageSize, totalCount }) => {

    const pokemon = pokemons.map(p => <Pokemon pokemon={p} key={p.name} />)

    return (
        <div>
            <div className={style.paginationButton}>
                <Pagination getPokemons={getPokemons} onPageChanged={onPageChange}
                    currentPage={currentPage} pageSize={pageSize} totalCount={totalCount} />
            </div>
            <div className={style.pokemonWrapper}>
                {pokemon}
            </div>
        </div>
    );
};

export default PokemonData;