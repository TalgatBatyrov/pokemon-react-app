import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useMatch } from 'react-router-dom';
import { getPokemonByType } from '../../redux/mainReducer';
import style from '../Navbar/Navbar.module.css';

const Types = ({ match, getPokemonByType, name }) => {

    const pokemonName = match ? match.params.pokemonName : '';
    useEffect(async () => {

        if (pokemonName) {
            await getPokemonByType(pokemonName)
        }
    }, [pokemonName]);

    return (
        <div>
            <NavLink to={`/${name}`} className={(e) => e.isActive ? style.active : ''}> {name} </NavLink>
        </div>
    );
};

const mapStatetoProps = (state) => {
    return {}
}

let TypesURLMatch = (props) => {
    let match = useMatch('/:pokemonName/')
    return <Types {...props} match={match} />
}

export default connect(mapStatetoProps, { getPokemonByType })(TypesURLMatch);