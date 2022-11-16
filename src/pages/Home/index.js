import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import HomeContent from '~/layouts/HomeContent';
import Footer from '~/layouts/Footer';

function Home() {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem('user'));
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
