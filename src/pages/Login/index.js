import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '~/components/Form';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';

const inputs = [
    { type: 'text', label: 'Account', placeholder: 'Tài khoản', name: 'account', maxlength: 30, required: true },
    {
        type: 'password',
        label: 'Password',
        placeholder: 'Mật khẩu',
        name: 'password',
        maxlength: 50,
        required: true,
    },
];

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser) {
            navigate('/home');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Container>
                <Header link="/" login={true} title />
                <Form inputs={inputs} type={'login'} title path="user/login" />
            </Container>
        </div>
    );
}

export default Login;
