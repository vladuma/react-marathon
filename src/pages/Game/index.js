import MenuHeader from '../../components/MenuHeader';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import constants from '../../constants';

const GamePage = ({ onPageChange }) => {
    const goHome = () => onPageChange(constants.HOME_PAGE_SLUG);
    return (
        <>
            <MenuHeader 
                onPageChange={onPageChange}
            />
            <Layout
                title="Game page."
                colorBg="#000"
            >
                <button onClick={goHome}>Go to Home</button>
            </Layout>
            <Footer />
        </>
    );
};

export default GamePage;