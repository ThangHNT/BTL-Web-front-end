import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import host from '~/ulties/host';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Cart() {
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
    }, []);

    const handleShowHistory = () => {
        setShowHistory((pre) => !pre);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('purchased-books')}>
                <div className={cx('purchased-books-item')}>
                    <div className={cx('book-wrapper')}>
                        <Link to="#" className={cx('book-info')}>
                            <Image
                                bookCart
                                border
                                src="https://i.9mobi.vn/cf/images/2015/03/nkk/hinh-dep-19.jpg"
                                alt="cover image"
                            />
                            <div className={cx('book-title-author-price')}>
                                <p className={cx('book-title')}>Tác phẩm: Chiec thuyen ngoai xa</p>
                                <p className={cx('book-author')}>Tác giả: Thang Hoang</p>
                                <p className={cx('book-price')}>150000 VND</p>
                            </div>
                        </Link>
                        <div className={cx('view-history-btn')} onClick={handleShowHistory}>
                            <span>Lịch sử đặt hàng</span>
                            <FontAwesomeIcon icon={showHistory === false ? faChevronUp : faChevronDown} />
                        </div>
                    </div>
                    {showHistory && (
                        <div className={cx('buy-history-table')}>
                            <div className={cx('buy-history-header')}>
                                <div className={cx('row')}>
                                    <div className={cx('column')}>
                                        <span className={cx('column-name')}>Người nhận</span>
                                    </div>
                                    <div className={cx('column')}>
                                        <span className={cx('column-name')}>Địa chỉ</span>
                                    </div>
                                    <div className={cx('column')}>
                                        <span className={cx('column-name')}>Số điện thoại</span>
                                    </div>
                                    <div className={cx('column')}>
                                        <span className={cx('column-name')}>Thời gian</span>
                                    </div>
                                    <div className={cx('column')}>
                                        <span className={cx('column-name')}>Số lượng</span>
                                    </div>
                                    <div className={cx('column')}>
                                        <span className={cx('column-name')}>Tổng tiền</span>
                                    </div>
                                    <div className={cx('column')}>
                                        <span className={cx('column-name')}>Trạng thái</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('buy-history-item')}>
                                <div className={cx('row')}>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>Thang Hoang</p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>
                                            14 ngo 159 Phung Khoang, nam tu liem , Ha Noi
                                        </p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>094856233</p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>15:09 21/11/2022</p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>3</p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>450000 VND</p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>Dang chuyen hang</p>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('buy-history-item')}>
                                <div className={cx('row')}>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>Thang Hoang</p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>
                                            14 ngo 159 Phung Khoang, nam tu liem , Ha Noi
                                        </p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>094856233</p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>15:09 21/11/2022</p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>3</p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>450000 VND</p>
                                    </div>
                                    <div className={cx('column')}>
                                        <p className={cx('order-info')}>Dang chuyen hang</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;
