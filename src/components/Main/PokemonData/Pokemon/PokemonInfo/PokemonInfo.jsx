import React, { useEffect, useState } from 'react';
import style from './PokemonInfo.module.css';
import { connect } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { getPokemonProfile } from '../../../../../redux/mainReducer';

const PokemonInfo = ({ match, getPokemonProfile, profile, }) => {

    const [ability, setAbility] = useState(null);

    useEffect(async () => {
        const pokemonName = match ? match.params.pokemonName : 'ditto';

        if (pokemonName) {
            await getPokemonProfile(pokemonName)
        }
    }, []);

    const showHiddenAbility = () => {
        setAbility(profile.abilities.map(abili => {
            return abili.is_hidden ? abili.ability.name : ''
        }))
    }
    return (
        <div className={style.wrapper}>
            <div>
                <img src={profile?.sprites?.other.dream_world.front_default} alt="" />
            </div>
            <div>
                Имя:    {profile.name}
                <br />
                order:     {profile.order}
            </div>
            <div>
                {profile?.stats?.map(res => {
                    return (
                        <div>
                            <div>{res.stat.name} : {res.base_stat} </div>
                        </div>
                    )
                })}
            </div>
            <button onClick={showHiddenAbility}>Show hidden ability</button>
            <div>
                {ability}
            </div>
        </div >
    );
};

let mapStateToProps = (state) => {
    return {
        profile: state.mainPage.profile
    }
}

let ProfileURLMatch = ({ profile, getPokemonProfile }) => {
    let match = useMatch('/pokemon/:pokemonName/')
    return <PokemonInfo profile={profile} getPokemonProfile={getPokemonProfile} match={match} />
}

export default connect(mapStateToProps, { getPokemonProfile })(ProfileURLMatch);