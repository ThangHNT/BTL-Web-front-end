import { useLayoutEffect } from 'react';
import axios from 'axios';
import host from '~/ulties/host';
import { useNavigate } from 'react-router-dom';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import AddBook from '~/layouts/AddBook';

function Home() {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
        } else {
            axios.post(`${host}/user/check-admin`, { userId: user.userId }).then(({ data }) => {
                if (!data.status) {
                    navigate('/home');
                }
            });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Container>
            <Header link="/home"></Header>
            <AddBook />
        </Container>
    );
}

export default Home;
