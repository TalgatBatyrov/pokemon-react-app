import { mainApi } from "../components/api/api";

const SET_POKEMON = 'SET_POKEMON';
const SET_TOTAL_POKEMONS_COUNTS = 'SET_TOTAL_POKEMONS_COUNTS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_POKEMON_PROFILE = 'SET_POKEMON_PROFILE';
const SET_POKEMON_TYPES = 'SET_POKEMON_TYPES';
const SET_POKEMON_BY_TYPE = 'SET_POKEMON_BY_TYPE';
const SET_ALL_POKEMONS = 'SET_ALL_POKEMONS';

const initialState = {
    allPokemons: [],
    // Список всех покемонов
    pokemonList: [],
    // Общее кол-во покемонов
    totalCount: 0,
    //Размер страницы
    pageSize: 8,
    // Текущая страница
    currentPage: 1,
    // Данные конкретного покемона
    profile: '',
    // Типы покемонов
    types: [],
    // Список покемонов по типу
    pokemonByType: [],
    // Прелоудер
    isFetching: false
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POKEMON:
            return {
                ...state,
                pokemonList: [...action.pokemons]
            }
        case SET_TOTAL_POKEMONS_COUNTS:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_POKEMON_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_POKEMON_TYPES:
            return {
                ...state,
                types: [...action.types]
            }
        case SET_POKEMON_BY_TYPE:
            return {
                ...state,
                pokemonByType: action.pokemons
            }
        case SET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: [...action.pokemons]
            }
        default:
            return state
    }
}


// Желательно в одну строку писать)))
const setPokemon = (pokemons) => {
    return {
        type: SET_POKEMON,
        pokemons
    }
}

const setTotalPokemonsCounts = (totalCount) => {
    return {
        type: SET_TOTAL_POKEMONS_COUNTS,
        totalCount
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

const setPokemonProfile = (profile) => {
    return {
        type: SET_POKEMON_PROFILE,
        profile
    }
}

const setPokemonTypes = (types) => {
    return {
        type: SET_POKEMON_TYPES,
        types
    }
}

const setPokemonByType = (pokemons) => {
    return {
        type: SET_POKEMON_BY_TYPE,
        pokemons
    }
}

const setAllPokemons = (pokemons) => {
    return {
        type: SET_ALL_POKEMONS,
        pokemons
    }
}

// Пытаемся получить данные покемонов по типу
export const getPokemonByType = (name) => {
    return async (dispatch) => {
        // Получили сперва типы покемонов чтобы дальше получить типизированных покемонов
        let data = await mainApi.getPokemonByType(name);
        // Делим покемонов на типы
        const promises = data.pokemon.map((pok) => {
            // Разделили покемонов
            return mainApi.getPokemonsData(pok.pokemon.url);
        })
        const results = await Promise.all(promises);
        // Сохраняем типизированных покемонов
        dispatch(setPokemonByType(results));
    }
}

// Пытаемся получить типы покемонов
export const getPokemonTypes = () => {
    return async (dispatch) => {
        // Получаем типы
        let data = await mainApi.getPokemonTypes();
        // Сохраняем в стор
        dispatch(setPokemonTypes(data.results));
    }
}

// Пытаемся получить данные конкретного покемона
export const getPokemonProfile = (name) => {
    return async (dispatch) => {
        // Получаем данные конкретного покемона
        let data = await mainApi.getPokemonProfile(name)
        // Сохраняем в стор данные
        dispatch(setPokemonProfile(data));
    }
}

export const getPokemons = (page, pageSize) => {
    return async (dispatch) => {
        // Пытаемся получить данные
        try {
            // Получаем список всех покемонов
            let response = await mainApi.getPokemons(page, pageSize);
            // Сохраняем в стор общее колличество покемонов
            dispatch(setTotalPokemonsCounts(response.count));

            dispatch(setCurrentPage(page))
            // Получаем данные каждого покемона 
            const promises = response.results.map((pok) => {
                return mainApi.getPokemonsData(pok.url);
            })
            // Сохраняем результаты всех запросов в переменную
            const results = await Promise.all(promises);
            // Сохраняем данные в стор
            dispatch(setPokemon(results));
        }
        // Не удалось получить данные 
        catch (err) {
            alert(err);
        }
    }
}

// Пытаемся получить данные всех покемонов
export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            // Сохраняем данные в сторе
            let response = await mainApi.getAllPokemons();
            dispatch(setAllPokemons(response.results));
        }
        // Не удалось получить данные
        catch (err) {
            alert(err);
        }
    }
}

export default mainReducer;