import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/user';
import Layout from '../../components/Layout';
import Input from '../../components/Input';

const AboutPage = () => {
    const userData = useSelector(selectUserData);
    const UserInfo = Object.entries(userData).map(([key, value]) => {
        return <Input
            key={key}
            value={`${value}`}
            name={key}
            label={key}
            disabled={true}
            onChange={() => {}}
        />
    })

    return (
        <>
            <Layout
                title="This is User page"
                colorBg="#fff"
            >
                { UserInfo }
            </Layout>
        </>
    );
};

export default AboutPage;