import { useState } from 'react';
import Home from './pages/Home';
import Game from './pages/Game';
import constants from './constants';
import './App.css';

const App = () => {
  const [page, setPage] = useState(constants.HOME_PAGE_SLUG);
  const handlePageChange = (page) => setPage(page);
  const router = {
    [constants.HOME_PAGE_SLUG]: () => <Home onPageChange={handlePageChange} />,
    [constants.GAME_PAGE_SLUG]: () => <Game onPageChange={handlePageChange} />,
    [constants.DEFAULT_PAGE_SLUG]: () => <Home onPageChange={handlePageChange} />,
  };

  return router[page] ? router[page]() : router[constants.DEFAULT_PAGE_SLUG]();
}

export default App;