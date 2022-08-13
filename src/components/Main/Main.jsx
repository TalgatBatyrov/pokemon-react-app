import React, { useEffect } from 'react';
import style from './Main.module.css';
import PokemonData from './PokemonData/PokemonData';
import { connect } from 'react-redux';
import { getAllPokemons, getPokemons, setCurrentPage } from '../../redux/mainReducer';

const Main = ({ pokemonList, totalCount, pageSize, currentPage, getPokemons, getAllPokemons }) => {

    useEffect(async () => {
        await getAllPokemons();
        await getPokemons(currentPage, pageSize)
    }, []);

    // Получаем данные для конкретной страницы
    const onPageChange = (page) => {
        getPokemons(page, pageSize)
    }

    return (
        <div className={style.main}>
            <PokemonData
                getPokemons={getPokemons}
                onPageChange={onPageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                pokemons={pokemonList}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pokemonList: state.mainPage.pokemonList,
        totalCount: state.mainPage.totalCount,
        pageSize: state.mainPage.pageSize,
        currentPage: state.mainPage.currentPage
    }
}

export default connect(mapStateToProps, { getPokemons, setCurrentPage, getAllPokemons })(Main);