import { useLayoutEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import host from '~/ulties/host';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import Form from '~/components/Form';
import Input from '~/components/Input';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const inputs = [
    {
        type: 'text',
        label: 'Người nhận',
        name: 'receiver',
        maxlength: 50,
        required: true,
    },
    {
        type: 'email',
        label: 'Email',
        name: 'email',
        maxlength: 50,
        required: true,
    },
    {
        type: 'number',
        label: 'Số điện thoại',
        name: 'phoneNumber',
        maxlength: 13,
        required: true,
    },
    {
        type: 'text',
        label: 'Địa chỉ',
        name: 'address',
        maxlength: 50,
        required: true,
    },
];

function Payment({ currentUser }) {
    const location = useLocation();
    const [book, setBook] = useState();
    const [order, setOrder] = useState({ quantity: 0 });

    const bookIdRef = useRef(location.pathname.split('/')[3]);

    useLayoutEffect(() => {
        axios
            .get(`${host}/book/detail/${bookIdRef.current}`)
            .then(({ data }) => {
                // console.log(data);
                if (data.status) {
                    setBook(data.book);
                } else {
                    console.log('chua lay dc chi tiet sach');
                }
            })
            .catch((err) => console.log('loi lay thong tin sach at order'));
    }, []);

    const handleSetTotalPrice = (e) => {
        let quantity = Number(e.target.value);
        if (quantity > 0) {
            let totalPrice = quantity * Number(book.price);
            setOrder((pre) => {
                pre.quantity = quantity;
                pre.totalPrice = totalPrice;
                return { ...pre };
            });
        } else {
            setOrder((pre) => {
                pre.quantity = quantity;
                pre.totalPrice = 0;
                return { ...pre };
            });
        }
    };

    const handleCheckQuantity = (e) => {
        let quantity = Number(e.target.value);
        if (quantity < 1) {
            alert('Vui lòng chọn số lượng thích hợp.');
            e.target.value = '';
        }
    };

    return (
        <div className={cx('wrapper')}>
            {book && (
                <div className={cx('body')}>
                    <div className={cx('book')}>
                        <div className={cx('book-info')}>
                            <div className={cx('book-cover-image')}>
                                <Image src={book.coverImage} alt="book-cover-image" book />
                            </div>
                            <p className={cx('book-title')}>{book.title}</p>
                            <p className={cx('book-price')}>Giá : {book.price} VND</p>
                        </div>
                        <div className={cx('book-select-quantity')}>
                            <Input
                                type="number"
                                label="Số lượng"
                                border
                                min="1"
                                onChange={handleSetTotalPrice}
                                onBlur={handleCheckQuantity}
                                required
                            />
                        </div>
                        <div className={cx('book-into-money')}>
                            Thành tiền:
                            <p>{order.totalPrice} VND</p>
                        </div>
                    </div>
                    <div className={cx('payment-area')}>
                        <Form
                            payment
                            inputs={inputs}
                            otherValues={{
                                quantity: order.quantity,
                                customer: currentUser.userId,
                                book: bookIdRef.current,
                                date: new Date().getTime(),
                            }}
                            type="order-book"
                            path={`book/order/${bookIdRef.current}`}
                        ></Form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payment;
