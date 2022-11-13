import { useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '~/components/Form';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import { UserContext } from '~/components/context/UserContext';

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
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (currentUser) {
            navigate('/home');
        }
        // eslint-disable-next-line
    });

    return (
        <div>
            <Container>
                <Header login={true} />
                <Form inputs={inputs} type={'login'} />
            </Container>
        </div>
    );
}

export default Login;
