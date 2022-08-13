import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import PokemonInfo from './components/Main/PokemonData/Pokemon/PokemonInfo/PokemonInfo';
import Navbar from './components/Navbar/Navbar';
import PokemonsByType from './components/Type/PokemonsByType';

function App() {
  return (
    <div className='app'>
      <Header />
      <Navbar />
      <div className='mainWrapperContent'>
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path={'/pokemon/*'} element={<PokemonInfo />} />
          <Route path={'/:pokemonName/*'} element={<PokemonsByType />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
