import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import React from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '~/components/Image';
import Search from '~/components/Search';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import { faRightFromBracket, faRightToBracket, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header({ currentUser = false, login = false, register = false }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to="/">
                    <Image
                        src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-4k-01.jpg"
                        logo
                        circle
                    />
                </Link>
            </div>
            {!login && !register && (
                <div className={cx('search')}>
                    <Search />
                </div>
            )}
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
                                        href="/logout"
                                        secondary
                                        medium
                                        icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                                    >
                                        Đăng xuất
                                    </Button>
                                </div>
                                <div className={cx('btn-item')}></div>
                            </div>
                        )}
                    >
                        <div className={cx('user-avatar')}>
                            <Image
                                src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-4k-01.jpg"
                                logo
                                circle
                                avatar
                            />
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
                                <Button to="/sign-up" basic border small icon={<FontAwesomeIcon icon={faUserPlus} />}>
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

export default Header;
