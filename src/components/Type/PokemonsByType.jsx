import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import style from './PokemonByType.module.css';

const PokemonsByType = ({ pokemonByType, }) => {
    const pokemon = pokemonByType.map((p, i) => {

        return (
            <div className={style.pokemon}>
                <NavLink to={'/pokemon/' + p.name}>{i + 1}   {p.name}</NavLink>
                <img src={p.sprites.other.dream_world.front_default ? p.sprites.other.dream_world.front_default : p.sprites.front_default} alt="" />
            </div>
        )
    })
    return (
        <div className={style.flex}>
            {pokemon}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pokemonByType: state.mainPage.pokemonByType
    }
}

export default connect(mapStateToProps, {})(PokemonsByType);