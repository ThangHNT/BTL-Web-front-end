import { useLayoutEffect, useState } from 'react';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import BookDetail from '~/layouts/BookDetail';
import Footer from '~/layouts/Footer';

function BookDetailPage() {
    const [currentUser, setCurrentUser] = useState(false);

    useLayoutEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Container>
            <Header title currentUser={currentUser} register={!currentUser}></Header>
            <BookDetail />
            <Footer />
        </Container>
    );
}

export default BookDetailPage;
