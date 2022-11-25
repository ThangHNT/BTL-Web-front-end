import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '~/layouts/Header';
import Container from '~/layouts/Container';
import Footer from '~/layouts/Footer';
import Account from '~/layouts/Account';
import { UserContext } from '~/components/context/UserContext';

function AccountPage() {
    const User = useContext(UserContext);
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

    useEffect(() => {
        if (User.currentUser) {
            // console.log(User.currentUser);
            setCurrentUser(User.currentUser);
        }
    }, [User.currentUser]);

    return (
        <Container>
            <Header link="/home" currentUser={currentUser} />
            <Account />
            <Footer />
        </Container>
    );
}

export default AccountPage;
