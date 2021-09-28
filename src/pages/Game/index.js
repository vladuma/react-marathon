import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import StartGame from './routes/Start';
import FinishGame from './routes/Finish';
import Board from './routes/Board';
import { resetStore } from '../../store/game';

const GamePage = () => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    // add method to clear context
    const clearContext = () => {
        dispatch(resetStore());
    };
    
    // eslint-disable-next-line
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