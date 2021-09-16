import { useHistory } from 'react-router-dom'
import Layout from '../../components/Layout';
import constants from '../../constants';

const AboutPage = () => {
    const history = useHistory();
    const goHome = () => history.push(constants.HOME_PAGE_SLUG);
    return (
        <>
            <Layout
                title="This is About page"
                colorBg="#000"
            >
                <button onClick={goHome}>Go to Home</button>
            </Layout>
        </>
    );
};

export default AboutPage;