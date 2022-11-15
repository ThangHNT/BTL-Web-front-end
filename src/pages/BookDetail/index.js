import { useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import { UserContext } from '~/components/context/UserContext';
import BookDetail from '~/layouts/BookDetail';
import Footer from '~/layouts/Footer';

function BookDetailPage() {
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
            <Header title></Header>
            <BookDetail />
            <Footer />
        </Container>
    );
}

export default BookDetailPage;
