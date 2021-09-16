import { useRouteMatch, Switch, Route, Redirect } from 'react-router';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import Home from './pages/Home';
import Game from './pages/Game';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import constants from './constants';
import cn from 'classnames';
import style from './style.module.css';

import './App.css';

const App = () => {
  const { isExact: match} = useRouteMatch('/');
  return (
    <Switch>
      <Route path="/404" component={NotFound} />
      <Route>
        <>
          <MenuHeader bgActive={!match} />
          <div className={cn(style.wrap, { [style.isHomePage]: match })}>
            <Switch>
              <Route path={constants.HOME_PAGE_SLUG} exact component={Home} />
              <Route path={constants.GAME_PAGE_SLUG} component={Game} />
              <Route path={constants.ABOUT_PAGE_SLUG} component={About} />
              <Route path={constants.CONTACT_PAGE_SLUG} component={Contact} />
              <Route render={() => (
                <Redirect to="/404" />
              )} />
            </Switch>
          </div>
          <Footer />
        </>
      </Route>
    </Switch>
  );
}

export default App;