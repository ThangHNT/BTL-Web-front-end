import { useEffect, useState, memo, useRef } from 'react';
import axios from 'axios';
import host from '~/ulties/host';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import Button from '~/components/Button';
import Modal from '~/layouts/Modal';
import Image from '~/components/Image';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function Admin() {
    const [account, setAccount] = useState({
        avatar: '',
        account: '',
        email: '',
        phoneNumber: '',
    });

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        axios
            .get(`${host}/user/account/${user.userId}`)
            .then(({ data }) => {
                // console.log(data.user);
                setAccount(data.user);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        // console.log(account);
    }, [account]);

    const handleSelectImage = (e) => {
        console.log('select img');
    };

    const handleChangeInput = (e) => {
        let value = e.target.value;
        let name = e.target.getAttribute('name');
        setAccount((pre) => {
            pre[name] = value;
            return { ...pre };
        });
    };

    const handleCanChangePassword = () => {
        setAccount((pre) => {
            pre.password = !pre.password;
            return { ...pre };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(account);
        if (account.password) {
            if (account.password !== account.confirmPassword) {
                toast.warning('Mật khẩu không trùng khớp.');
            } else if (account.password.length < 8) {
                toast.warning('Mật khẩu yếu.');
            }
        } else if (account.phoneNumber.length < 9 || account.phoneNumber.length > 12) {
            toast.warning('Số điện thoại chưa hợp lệ.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <div className={cx('file-input')}>
                    <Image src={account.avatar} alt="cover-image" selectAvatar />
                    <div className={cx('select-img-btn')}>
                        <Button secondary border medium type="button">
                            Chọn ảnh
                            <input
                                type="file"
                                className={cx('select-img-input')}
                                onChange={handleSelectImage}
                                name="coverImage"
                            />
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('user-info')}>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <div className={cx('form-item')}>
                        <Input label="Tài khoản" noBorder disabled value={account.account} />
                    </div>
                    <div className={cx('form-item')}>
                        <span className={cx('form-item-title')} onClick={handleCanChangePassword}>
                            Đổi mật khẩu
                        </span>
                        {account.password && (
                            <div>
                                <div className={cx('input-item')}>
                                    <Input
                                        name="confirmPassword"
                                        type="password"
                                        border
                                        label="Mật khẩu cũ"
                                        onChange={handleChangeInput}
                                    />
                                </div>
                                <div className={cx('input-item')}>
                                    <Input
                                        name="password"
                                        type="password"
                                        border
                                        label="Mật khẩu mới"
                                        onChange={handleChangeInput}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={cx('form-item')}>
                        <Input
                            name="phoneNumber"
                            type="number"
                            border
                            label="Số điện thoại"
                            value={account.phoneNumber}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>
                    <div className={cx('form-item')}>
                        <Input
                            name="email"
                            type="email"
                            border
                            label="Email"
                            value={account.email}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>
                    <div className={cx('submit-btn')}>
                        <Button type="submit" primary border veryLarge>
                            Lưu
                        </Button>
                    </div>
                </form>
            </div>
            <Modal />
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
        </div>
    );
}

export default memo(Admin);
