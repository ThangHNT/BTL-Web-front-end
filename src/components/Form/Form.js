import { useState, useRef } from 'react';
import axios from 'axios';
import host from '~/ulties/host';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Form.module.scss';
import Input from '~/components/Input';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Form({ inputs, type }) {
    const [userInfo, setUserInfo] = useState({});
    const checkInputRef = useRef(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkInputRef.current) {
            const { data } = await axios.post(`${host}/user/${type}`, userInfo);
            if (data.status) {
                console.log(data);
                toast.success('Chuyển hướng đến trang chủ.');
                localStorage.setItem('user', JSON.stringify(data.user));
            } else {
                toast.error(data.msg);
            }
        } else {
            console.log('no');
        }
    };

    const handleChangeInput = (e) => {
        let target = e.target;
        setUserInfo((pre) => {
            pre[target.name] = target.value;
            return { ...pre };
        });
    };

    const handleBlur = (e) => {
        checkInputRef.current = true;
        const target = e.target;
        // if (target.name === 'password' && target.value.length < 8) {
        //     toast.warning('Mật khẩu tối thiểu 8 ký tự.');
        //     checkInputRef.current = false;
        // }
        if (target.name === 'confirmPassword' && target.value !== userInfo.password) {
            toast.warning('Mật khẩu chưa trùng khớp.');
            checkInputRef.current = false;
        }
    };

    return (
        <form className={cx('wrapper')} action={`/user/${type}`} onSubmit={handleSubmit}>
            <span className={cx('title')}>{type}</span>
            <div className={cx('content')}>
                {inputs.map((input, index) => (
                    <div key={index} className={cx('input-item')}>
                        <Input
                            border
                            type={input.type}
                            label={input.label}
                            placeholder={input.placeholder}
                            name={input.name}
                            maxLength={input.maxlength}
                            noBorder={input.noBorder}
                            accept="image/*"
                            required={input.required}
                            onInput={handleChangeInput}
                            onBlur={handleBlur}
                        />
                    </div>
                ))}
            </div>
            <div className={cx('btn')}>
                <Button primary border large type="submit">
                    {type === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                </Button>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </form>
    );
}

export default Form;
