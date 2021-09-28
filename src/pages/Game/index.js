import { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import StartGame from './routes/Start';
import FinishGame from './routes/Finish';
import Board from './routes/Board';


const GamePage = () => {
    const match = useRouteMatch();
    // add method to clear context
    const clearContext = () => {
    };

    useEffect(clearContext, []);

    return (
        <Switch>
            <Route path={`${match.path}/`} exact component={StartGame} />
            <Route path={`${match.path}/board`} component={Board} />
            <Route path={`${match.path}/finish`} component={FinishGame} />
        </Switch>
    );
};

export default GamePage;