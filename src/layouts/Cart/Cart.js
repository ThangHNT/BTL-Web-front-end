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
    const [cart, setCart] = useState();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        axios
            .get(`${host}/user/cart/${user.userId}`)
            .then(({ data }) => {
                // console.log(data);
                setCart(data.data);
            })
            .catch(() => {
                console.log('loi lay cart');
            });
    }, []);

    const handleShowHistory = () => {
        setShowHistory((pre) => !pre);
    };

    return (
        <div className={cx('wrapper')}>
            {cart && (
                <div className={cx('purchased-books')}>
                    {cart.map((cart, index) => (
                        <div key={index} className={cx('purchased-books-item')}>
                            <div className={cx('book-wrapper')}>
                                <Link to="#" className={cx('book-info')}>
                                    <Image bookCart border src={cart.bookInfo.coverImage} alt="cover image" />
                                    <div className={cx('book-title-author-price')}>
                                        <p className={cx('book-title')}>Tác phẩm: {cart.bookInfo.title}</p>
                                        <p className={cx('book-author')}>Tác giả: {cart.bookInfo.author}</p>
                                        <p className={cx('book-price')}>{cart.bookInfo.price} VND</p>
                                    </div>
                                </Link>
                                <div index={index} className={cx('view-history-btn')} onClick={handleShowHistory}>
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
                                    {cart.purchaseHistory.map((history, index) => (
                                        <div key={index} className={cx('buy-history-item')}>
                                            <div className={cx('row')}>
                                                <div className={cx('column')}>
                                                    <p className={cx('order-info')}>{history.receiver}</p>
                                                </div>
                                                <div className={cx('column')}>
                                                    <p className={cx('order-info')}>{history.address}</p>
                                                </div>
                                                <div className={cx('column')}>
                                                    <p className={cx('order-info')}>{history.phoneNumber}</p>
                                                </div>
                                                <div className={cx('column')}>
                                                    <p className={cx('order-info')}>{history.date}</p>
                                                </div>
                                                <div className={cx('column')}>
                                                    <p className={cx('order-info')}>{history.quantity}</p>
                                                </div>
                                                <div className={cx('column')}>
                                                    <p className={cx('order-info')}>{history.price} VND</p>
                                                </div>
                                                <div className={cx('column')}>
                                                    <p className={cx('order-info')}>Dang chuyen hang</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;
