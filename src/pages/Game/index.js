import constants from '../../constants';

const GamePage = ({ onPageChange }) => {
    const goHome = () => onPageChange(constants.HOME_PAGE_SLUG);
    return (
        <div>
            Game page.
            <button onClick={goHome}>Go to Home</button>
        </div>
    );
};

export default GamePage;