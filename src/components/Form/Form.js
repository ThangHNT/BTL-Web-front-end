import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import host from '~/ulties/host';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Form.module.scss';
import Input from '~/components/Input';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Form({ inputs, type, payment = false, otherValues = false, title = false, path }) {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleCheckInputs(type)) {
            let formData;
            if (otherValues) {
                formData = { ...userInfo, ...otherValues };
            } else {
                formData = { ...userInfo };
            }
            // console.log(otherValues);
            const { data } = await axios.post(`${host}/${path}`, formData);
            if (data.status) {
                // console.log(data);
                if (type === 'register') {
                    toast.success('Đăng ký thành công.Chuyển hướng đến trang chủ.');
                    localStorage.setItem('user', JSON.stringify(data.newUser));
                    handleNavigate('home');
                } else if (type === 'register') {
                    toast.success('Chuyển hướng đến trang chủ.');
                    localStorage.setItem('user', JSON.stringify(data.user));
                    handleNavigate('home');
                } else if (type === 'order-book') {
                    toast.success('Đặt sách thành công.');
                    handleNavigate(`book/detail/${otherValues.book}`);
                }
            } else {
                toast.error(data.msg);
            }
        }
    };

    const handleNavigate = (path) => {
        setTimeout(() => {
            navigate(`/${path}`);
        }, 2500);
    };

    const handleChangeInput = (e) => {
        let target = e.target;
        setUserInfo((pre) => {
            pre[target.name] = target.value;
            return { ...pre };
        });
    };

    const handleCheckInputs = (type) => {
        if (type === 'register') {
            // if (userInfo.password.length < 8) {
            //     toast.error('Mật khẩu yếu.');
            //     return false;
            // }
            if (userInfo.password !== userInfo.confirmPassword) {
                toast.error('Mật khẩu chưa trùng khớp.');
                return false;
            }
        } else if (type === 'order-book' && otherValues.orderQuantity < 1) {
            alert('Vui lòng chọn số lượng thích hợp.');
            return false;
        }
        return true;
    };

    return (
        <form className={cx('wrapper', { payment })} onSubmit={handleSubmit}>
            {title && <span className={cx('title')}>{type}</span>}
            <div className={cx('content', { payment })}>
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
                        />
                    </div>
                ))}
            </div>
            <div className={cx('btn')}>
                <Button primary border large type="submit">
                    {type === 'login' ? 'Đăng nhập' : type === 'register' ? 'Đăng ký' : 'Đặt sách'}
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

export default memo(Form);
