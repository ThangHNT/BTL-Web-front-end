import { useEffect, useState } from 'react';
import axios from 'axios';
import host from '~/ulties/host';
import { useNavigate } from 'react-router-dom';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import Admin from '~/layouts/Admin';
import Footer from '~/layouts/Footer';

function AdminPage() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
        } else {
            axios.post(`${host}/user/check-admin`, { userId: user.userId }).then(({ data }) => {
                if (!data.status) {
                    navigate('/home');
                } else {
                    setCurrentUser(user);
                }
            });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Container>
            <Header link="/home" currentUser={currentUser}></Header>
            <Admin />
            <Footer />
        </Container>
    );
}

export default AdminPage;
