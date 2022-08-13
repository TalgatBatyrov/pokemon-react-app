import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
})

export const mainApi = {
    getPokemons(currentPage, pageSize) {
        return (
            instance.get(`pokemon?offset=${(currentPage - 1) * 20}&limit=${pageSize}`)
                .then(response => response.data)
        )
    },
    // Пытаемся получить всех покемонов чтобы сделать поиск по имени
    getAllPokemons() {
        // Получили данные 
        return (
            instance.get(`pokemon?offset=0&limit=1000`)
                .then(response => response.data)
        )
    },
    // Пытаемся искать покемона по имени
    searchPokemonsData(name) {
        // нашли покемона по имени
        return (
            instance.get(`pokemon/${name}`)
                .then(response => response.data)
        )
    },

    getPokemonTypes() {
        return (
            instance.get(`type`)
                .then(response => response.data)
        )
    },

    getPokemonByType(name) {
        return (
            instance.get(`type/${name}`)
                .then(response => response.data)
        )
    },

    getPokemonProfile(name) {
        return (
            instance.get(`pokemon/${name}`)
                .then(response => response.data)
        )
    },

    getPokemonsData(url) {
        return (
            instance.get(url)
                .then(response => response.data)
        )
    },
};