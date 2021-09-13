import { useState } from 'react';
import Home from './pages/Home';
import Game from './pages/Game';
import './App.css';

const App = () => {
  const [page, setPage] = useState('home');
  const router = {
    'home': () => <Home />,
    'game': () => <Game />,
    'default': () => <Home />,
  };

  return router[page] ? router[page]() : router.default();
}

export default App;