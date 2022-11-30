import { Link } from 'react-router-dom';
import React, { memo } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Image from '~/components/Image';
import Search from '~/components/Search';
import Button from '~/components/Button';
import {
    faCartShopping,
    faRightFromBracket,
    faRightToBracket,
    faUser,
    faUserPlus,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header({ link = true, title = false, currentUser = false, login = false, register = false, search = false }) {
    const handleLogout = () => {
        localStorage.removeItem('user');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to={link}>
                    <Image src="/logo.png" logo circle />
                </Link>
            </div>
            {search && (
                <div className={cx('search')}>
                    <Search />
                </div>
            )}
            {title && <h1>Thư Viện Sách Online</h1>}
            <div className={cx('account')}>
                {currentUser ? (
                    <Tippy
                        interactive
                        // visible
                        render={(attrs) => (
                            <div className={cx('action-btns')} tabIndex="-1" {...attrs}>
                                <div className={cx('btn-item')}>
                                    <Button to="/account" secondary medium icon={<FontAwesomeIcon icon={faUser} />}>
                                        Tài khoản
                                    </Button>
                                </div>
                                <div className={cx('btn-item')}>
                                    <Button
                                        to="/user/cart"
                                        secondary
                                        medium
                                        icon={<FontAwesomeIcon icon={faCartShopping} />}
                                    >
                                        Giỏ hàng
                                    </Button>
                                </div>
                                {currentUser.admin && (
                                    <div className={cx('btn-item')}>
                                        <Button
                                            to="/admin"
                                            secondary
                                            medium
                                            icon={<FontAwesomeIcon icon={faUserTie} />}
                                        >
                                            Quản lý
                                        </Button>
                                    </div>
                                )}
                                <div className={cx('btn-item')}>
                                    <Button
                                        href="/"
                                        secondary
                                        medium
                                        icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </Button>
                                </div>
                                <div className={cx('btn-item')}></div>
                            </div>
                        )}
                    >
                        <div className={cx('user-info')}>
                            {currentUser && (
                                <>
                                    <span className={cx('user-name')}>{currentUser.account}</span>
                                    <div className={cx('user-avatar')}>
                                        <Image src={currentUser.avatar} logo circle avatar />
                                    </div>
                                </>
                            )}
                        </div>
                    </Tippy>
                ) : (
                    <div className={cx('login-btns')}>
                        {register && (
                            <div className={cx('login-btn-item')}>
                                <Button
                                    to="/login"
                                    primary
                                    border
                                    small
                                    icon={<FontAwesomeIcon icon={faRightToBracket} />}
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                        )}
                        {login && (
                            <div className={cx('login-btn-item')}>
                                <Button to="/register" basic border small icon={<FontAwesomeIcon icon={faUserPlus} />}>
                                    Đăng ký
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(Header);
