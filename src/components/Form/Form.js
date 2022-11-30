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

function Form({ inputs, type, order = false, otherValues = false, title = false, path }) {
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
            const { data } = await axios.post(`${host}/${path}`, formData);
            if (data.status) {
                if (type === 'register') {
                    toast.success('Đăng ký thành công.Chuyển hướng đến trang chủ.');
                    localStorage.setItem('user', JSON.stringify(data.newUser));
                    handleNavigate('home');
                } else if (type === 'login') {
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

    function handleCheckStrongPassword(password) {
        var strength = 0;
        if (password.match(/[a-z]+/)) {
            strength += 1;
        }
        if (password.match(/[A-Z]+/)) {
            strength += 1;
        }
        if (password.match(/[0-9]+/)) {
            strength += 1;
        }
        if (password.match(/[$@#&!]+/)) {
            strength += 1;
        }
        if (password.length < 8 || strength < 3) {
            return false;
        }
        return true;
    }

    const handleNavigate = (path) => {
        setTimeout(() => {
            navigate(`/${path}`);
        }, 2000);
    };

    const handleChangeInput = (e) => {
        let target = e.target;
        if (target.type !== 'file') {
            setUserInfo((pre) => {
                pre[target.name] = target.value;
                return { ...pre };
            });
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(target.files[0]);
            reader.onload = () => {
                let dataUrl = reader.result;
                setUserInfo((pre) => {
                    pre[target.name] = dataUrl;
                    return { ...pre };
                });
            };
        }
    };

    const handleCheckInputs = (type) => {
        if (type === 'register') {
            if (userInfo.password !== userInfo.confirmPassword) {
                toast.error('Mật khẩu không trùng khớp.');
                return false;
            }
            if (!handleCheckStrongPassword(userInfo.password)) {
                toast.error('Mật khẩu tối thiểu 8 ký tự, bao gồm chữ cái viết hoa, viết thường và số.');
                return false;
            }
        } else if (type === 'order-book' && otherValues.quantity < 1) {
            alert('Vui lòng chọn số lượng thích hợp.');
            return false;
        }
        return true;
    };

    return (
        <form className={cx('wrapper', { order })} onSubmit={handleSubmit}>
            {title && <span className={cx('title')}>{type}</span>}
            <div className={cx('content', { order })}>
                {inputs.map((input, index) => (
                    <div key={index} className={cx('input-item')}>
                        <Input
                            border
                            textArea={input.textArea}
                            rows={input.rows}
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
