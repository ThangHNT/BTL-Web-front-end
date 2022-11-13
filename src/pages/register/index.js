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
    {
        type: 'text',
        label: 'Confirm Password',
        placeholder: 'Nhập lại mật khẩu',
        name: 'confirmPassword',
        maxlength: 50,
    },
    {
        type: 'email',
        label: 'Email',
        placeholder: 'Email',
        name: 'email',
    },
    {
        type: 'number',
        label: 'Number phone',
        placeholder: 'Số điện thoại',
        name: 'numberPhone',
        maxlength: 15,
    },
];

function Register() {
    return (
        <div>
            <Container>
                <Header login={true} />
                <Form inputs={inputs} type={'register'} />
            </Container>
        </div>
    );
}

export default Register;
