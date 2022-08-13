import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import useDebounce from './Debounce';
import style from './SearchComponent.module.css';

const SearchComponent = ({ allPokemons }) => {

    const [search, setSearch] = useState('');
    const [pokemon, setPokemon] = useState([]);
    const deboundSearch = useDebounce(search, 2000);

    useEffect(() => {
        if (deboundSearch) {
            setPokemon(allPokemons.filter(p => {
                return p.name.includes(deboundSearch)
            }))
        } else {
            setPokemon([])
        }
    }, [deboundSearch]);

    return (
        <div className={style.searchWrapper}>
            <span>
                <textarea type="text" onChange={(e) => setSearch(e.target.value)} placeholder='search...' />
            </span>
            <div>
                {
                    pokemon.map(p => {
                        return (
                            <div>
                                <NavLink to={'/pokemon/' + p.name}>
                                    <div>
                                        {p.name}
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        allPokemons: state.mainPage.allPokemons
    }
}

export default connect(mapStateToProps, {})(SearchComponent);