import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
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

const firebaseConfig = {
  apiKey: "AIzaSyDulN3LR-G9esYIsIYyLmCRqL5OlbK6tQU",
  authDomain: "pokemon-game-7d203.firebaseapp.com",
  databaseURL: "https://pokemon-game-7d203-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-game-7d203",
  storageBucket: "pokemon-game-7d203.appspot.com",
  messagingSenderId: "233008627031",
  appId: "1:233008627031:web:f4b20294b2c42aea5f5212"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

db.ref('pokemons').once('value', (snapshot) => {
  console.log('snap', snapshot.val());
});


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