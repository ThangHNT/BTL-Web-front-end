import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '~/layouts/Header';
import Container from '~/layouts/Container';
import HomeContent from '~/layouts/HomeContent';
import Footer from '~/layouts/Footer';

function Logined() {
    const navigate = useNavigate();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, []);
    return (
        <Container>
            <Header link={false} currentUser={true} search={true}></Header>
            <HomeContent />
            <Footer />
        </Container>
    );
}

export default Logined;
