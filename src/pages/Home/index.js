import { useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import { UserContext } from '~/components/context/UserContext';
import HomeContent from '~/layouts/HomeContent';
import Footer from '~/layouts/Footer';

function Home() {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (currentUser) {
            navigate('/home');
        }
        // eslint-disable-next-line
    });
    return (
        <Container>
            <Header login={true} register={true} search={true}></Header>
            <HomeContent />
            <Footer />
        </Container>
    );
}

export default Home;
