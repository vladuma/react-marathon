import { useHistory } from 'react-router-dom'
import Layout from '../../components/Layout';
import constants from '../../constants';

const NotFoundPage = () => {
    const history = useHistory();
    const goHome = () => history.push(constants.HOME_PAGE_SLUG);
    return (
        <>
            <Layout
                title="Page not found"
                colorBg="#000"
            >
                <button onClick={goHome}>Go to Home</button>
            </Layout>
        </>
    );
};

export default NotFoundPage;