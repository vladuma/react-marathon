import { useEffect } from 'react';
import { useLocation, Switch, Route, Redirect } from 'react-router';
import { NotificationContainer } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, selectUserLoading } from './store/user';

import PrivateRoute from './components/PrivateRoute';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import Home from './pages/Home';
import Game from './pages/Game';
import About from './pages/About';
import Contact from './pages/Contact';
import User from './pages/User';
import NotFound from './pages/NotFound';

import constants from './constants';

import cn from 'classnames';
import style from './style.module.css';
import 'react-notifications/lib/notifications.css';
import './App.css';

const App = () => {
  const isUserLoading = useSelector(selectUserLoading);
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
    // eslint-disable-next-line
  }, []);

  if (isUserLoading) {
    return 'Loading';
  }
  
  return (
    <>
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={cn(style.wrap, { [style.isHomePage]: isPadding })}>
              <Switch>
                <Route path={constants.HOME_PAGE_SLUG} exact component={Home} />
                <PrivateRoute path={constants.GAME_PAGE_SLUG} component={Game} />
                <PrivateRoute path={constants.ABOUT_PAGE_SLUG} component={About} />
                <PrivateRoute path={constants.CONTACT_PAGE_SLUG} component={Contact} />
                <PrivateRoute path={constants.USER_PAGE_SLUG} component={User} />
                <Route render={() => (
                  <Redirect to="/404" />
                )} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </>
  );
}

export default App;