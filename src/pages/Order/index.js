import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '~/layouts/Container';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import Payment from '~/layouts/Order';

function PaymentPage() {
    const navigate = useNavigate();

    const currentUserRef = useRef(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
        if (!currentUserRef.current) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, []);
    return (
        <Container>
            <Header title link="/home" currentUser={currentUserRef.current} />
            <Payment currentUser={currentUserRef.current} />
            <Footer />
        </Container>
    );
}

export default PaymentPage;
