import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';
import { connect } from 'react-redux';
import { getPokemonTypes } from '../../redux/mainReducer';
import Types from '../Type/Types';

const Navbar = ({ types, getPokemonTypes }) => {
    useEffect(async () => {
        await getPokemonTypes()
    }, []);

    const type = types.map(t => {
        return <div className={style.type} key={t.name}>
            <Types name={t.name} />
        </div>
    })
    return (
        <div className={style.navbar}>
            <div className={style.type}>
                <NavLink to={'/'} className={(e) => e.isActive ? style.active : ''}> Main </NavLink>
            </div>
            {type}
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        types: state.mainPage.types
    }
}

export default connect(mapStateToProps, { getPokemonTypes })(Navbar);