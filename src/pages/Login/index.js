import Form from '~/components/Form';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';

const inputs = [
    { type: 'text', label: 'Account', placeholder: 'Tài khoản', name: 'account', maxlength: 30 },
    {
        type: 'password',
        label: 'Password',
        placeholder: 'Mật khẩu',
        name: 'password',
        maxlength: 50,
    },
];

function Login() {
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
