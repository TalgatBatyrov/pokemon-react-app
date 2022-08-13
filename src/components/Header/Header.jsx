import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchComponent from '../Main/Search/SearchComponent';
import style from './Header.module.css';

const Header = () => {
    let imageHeader = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
    return (
        <div className={style.header}>
            <SearchComponent />
            <center><img src={imageHeader} alt="img" /></center>
        </div>
    );
};



export default Header;