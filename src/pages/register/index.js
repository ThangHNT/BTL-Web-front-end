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
    {
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Nhập lại mật khẩu',
        name: 'confirmPassword',
        maxlength: 50,
        required: true,
    },
    {
        type: 'email',
        label: 'Email',
        placeholder: 'Email',
        name: 'email',
    },
    {
        type: 'number',
        label: 'Phone number',
        placeholder: 'Số điện thoại',
        name: 'phoneNumber',
        maxlength: 15,
        required: true,
    },
    {
        type: 'file',
        label: 'Avatar',
        placeholder: 'Ảnh đại diện',
        name: 'avatar',
        maxlength: 15,
        noBorder: true,
    },
];

function Register() {
    return (
        <div>
            <Container>
                <Header register={true} />
                <Form inputs={inputs} type={'register'} />
            </Container>
        </div>
    );
}

export default Register;
