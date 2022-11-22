import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import BookControl from '~/layouts/BookControl';
import Footer from '~/layouts/Footer';

function AdminPage() {
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
            <Header link="/home" currentUser={currentUser}></Header>
            <BookControl edit />
            <Footer />
        </Container>
    );
}

export default AdminPage;
