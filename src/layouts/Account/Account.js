import { useEffect, useState, memo, useRef, useContext } from 'react';
import axios from 'axios';
import host from '~/ulties/host';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import Button from '~/components/Button';
import Modal from '~/layouts/Modal';
import Image from '~/components/Image';
import Input from '~/components/Input';
import { UserContext } from '~/components/context/UserContext';

const cx = classNames.bind(styles);

function Admin() {
    const { handleSetCurrentUser } = useContext(UserContext);
    const [profile, setProfile] = useState({
        avatar: '',
        account: '',
        email: '',
        phoneNumber: '',
    });

    const inputImgRef = useRef();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            axios
                .get(`${host}/user/profile/${user.userId}`)
                .then(({ data }) => {
                    // console.log(data.user);
                    data.user.password = false;
                    setProfile(data.user);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const handleSelectImage = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let base64String = reader.result;
            inputImgRef.src = base64String;
            setProfile((pre) => {
                pre.avatar = base64String;
                return { ...pre };
            });
        };
    };

    const handleChangeInput = (e) => {
        let value = e.target.value;
        let name = e.target.getAttribute('name');
        setProfile((pre) => {
            pre[name] = value;
            return { ...pre };
        });
    };

    const handleCanChangePassword = () => {
        setProfile((pre) => {
            pre.password = !pre.password;
            return { ...pre };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.put(`${host}/user/profile/edit`, { profile });
        let user = {
            account: profile.account,
            avatar: profile.avatar,
            userId: profile.userId,
        };
        if (!data.status) {
            toast.error(data.msg);
        } else {
            toast.success(data.msg);
            localStorage.setItem('user', JSON.stringify(user));
            handleSetCurrentUser(user);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <div className={cx('file-input')}>
                    <Image src={profile.avatar} alt="cover-image" selectAvatar />
                    <div className={cx('select-img-btn')}>
                        <Button secondary border medium type="button">
                            Chọn ảnh
                            <input
                                ref={inputImgRef}
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
                        <Input label="Tài khoản" noBorder disabled value={profile.account} />
                    </div>
                    <div className={cx('form-item')}>
                        <span className={cx('form-item-title')} onClick={handleCanChangePassword}>
                            Đổi mật khẩu
                        </span>
                        {profile.password && (
                            <div>
                                <div className={cx('input-item')}>
                                    <Input
                                        name="oldPassword"
                                        type="password"
                                        border
                                        label="Mật khẩu cũ"
                                        onChange={handleChangeInput}
                                        required={profile.password}
                                    />
                                </div>
                                <div className={cx('input-item')}>
                                    <Input
                                        name="newPassword"
                                        type="password"
                                        border
                                        label="Mật khẩu mới"
                                        onChange={handleChangeInput}
                                        required={profile.password}
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
                            value={profile.phoneNumber}
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
                            value={profile.email}
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
