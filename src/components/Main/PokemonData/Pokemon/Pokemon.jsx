import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Pokemon.module.css';

const Pokemon = ({ pokemon }) => {
    return (
        <div className={style.pokemon}>
            <NavLink to={'/pokemon/' + pokemon.name}>
                <div title='Получить данные покемона?' className={style.pokemonName}>
                    {pokemon.name}
                </div>
            </NavLink>
            <div>
                <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
            </div>
        </div>
    );
};

export default Pokemon;