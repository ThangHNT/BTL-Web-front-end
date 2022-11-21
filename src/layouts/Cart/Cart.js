import { useState, useEffect, useContext, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import host from '~/ulties/host';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Image from '~/components/Image';
import formatTime from '~/ulties/formatTime';
import Modal from '~/layouts/Modal';
import { BookContext } from '~/components/context/BookContext';

const cx = classNames.bind(styles);

function Cart() {
    const { handleSetDisplayModal } = useContext(BookContext);
    const [showHistory, setShowHistory] = useState(false);
    const [cart, setCart] = useState();
    const orderItemRef = useRef({ orderId: '', orderIndex: '' });
    const cartItemRef = useRef();

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

    const handleShowHistory = (e) => {
        let index = Number(e.currentTarget.getAttribute('index'));
        setShowHistory((pre) => {
            if (pre === index) pre = false;
            else pre = index;
            return pre;
        });
    };

    const cancelOrder = async () => {
        const { data } = await axios.post(`${host}/user/order-cancel/${orderItemRef.current.orderId}`);
        if (data.status) {
            setCart((pre) => {
                pre[cartItemRef.current].purchaseHistory.splice(orderItemRef.current.orderIndex, 1);
                return [...pre];
            });
            handleSetDisplayModal(false);
            setTimeout(() => {
                toast.success('Hủy đơn thành công.');
            }, 100);
        }
    };

    const handleClickCancelOrder = (e) => {
        let orderId = e.currentTarget.getAttribute('orderid');
        let orderIndex = e.currentTarget.getAttribute('orderindex');
        let cartItem = e.currentTarget.getAttribute('cartitem');
        cartItemRef.current = Number(cartItem);
        orderItemRef.current.orderId = orderId;
        orderItemRef.current.orderIndex = Number(orderIndex);
        // console.log(cartItem, orderIndex, orderId);
        handleSetDisplayModal({
            title: 'Hủy Đơn Hàng',
            content: 'Bạn chắc chắn muốn hủy đơn này ?',
            rejectBtn: 'Không',
            acceptBtn: 'Xác nhận',
            action: cancelOrder,
        });
    };

    return (
        <div className={cx('wrapper')}>
            {cart && (
                <div className={cx('purchased-books')}>
                    {cart.map((cart, cartIndex) => (
                        <div key={cartIndex} className={cx('purchased-books-item')}>
                            <div className={cx('book-wrapper')}>
                                <Link to={`/book/detail/${cart.bookInfo.bookId}`} className={cx('book-info')}>
                                    <Image bookCart border src={cart.bookInfo.coverImage} alt="cover image" />
                                    <div className={cx('book-title-author-price')}>
                                        <p className={cx('book-title')}>Tác phẩm: {cart.bookInfo.title}</p>
                                        <p className={cx('book-author')}>Tác giả: {cart.bookInfo.author}</p>
                                        <p className={cx('book-price')}>{cart.bookInfo.price} VND</p>
                                    </div>
                                </Link>
                                <div index={cartIndex} className={cx('view-history-btn')} onClick={handleShowHistory}>
                                    <span>Lịch sử đặt hàng</span>
                                    <FontAwesomeIcon icon={showHistory !== cartIndex ? faChevronUp : faChevronDown} />
                                </div>
                            </div>
                            {showHistory === cartIndex && (
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
                                                    <p className={cx('order-info')}>{formatTime(history.date)}</p>
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
                                                <div className={cx('column')}>
                                                    <span
                                                        cartitem={cartIndex}
                                                        orderid={history.orderId}
                                                        orderindex={index}
                                                        className={cx('cancel-btn')}
                                                        onClick={handleClickCancelOrder}
                                                    >
                                                        Hủy Đơn
                                                    </span>
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

export default memo(Cart);
