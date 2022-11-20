import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import Cart from '~/layouts/Cart';
import Footer from '~/layouts/Footer';

function CartPage() {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
        } else {
            setCurrentUser(user);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Container>
            <Header link="/home" title currentUser={currentUser}></Header>
            <Cart currentUser={currentUser} />
            <Footer />
        </Container>
    );
}

export default CartPage;
