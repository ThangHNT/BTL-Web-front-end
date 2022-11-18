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
        label: 'Họ tên',
        name: 'fullName',
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
        maxlength: 50,
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
    const bookIdRef = useRef(location.pathname.split('/')[3]);
    const bookPriceRef = useRef();

    useLayoutEffect(() => {
        axios
            .get(`${host}/book/detail/${bookIdRef.current}`)
            .then(({ data }) => {
                // console.log(data);
                if (data.status) {
                    setBook(data.book);
                    bookPriceRef.current = data.book.price;
                } else {
                    console.log('chua lay dc chi tiet sach');
                }
            })
            .catch((err) => console.log('loi lay thong tin sach at order'));
    }, []);

    const handleSetTotalPrice = (e) => {
        let quantity = Number(e.target.value);
        let totalPrice = quantity * Number(bookPriceRef.current);
        setBook((pre) => {
            pre.price = totalPrice > 0 ? totalPrice : bookPriceRef.current;
            return { ...pre };
        });
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
                            <p className={cx('book-price')}>Giá : {bookPriceRef.current} VND</p>
                        </div>
                        <div className={cx('book-select-quantity')}>
                            <Input
                                type="number"
                                label="Số lượng"
                                border
                                max="100"
                                maxLength="3"
                                onChange={handleSetTotalPrice}
                            />
                        </div>
                        <div className={cx('book-into-money')}>
                            Thành tiền:
                            <p>{book.price} VND</p>
                        </div>
                    </div>
                    <div className={cx('payment-area')}>
                        <Form payment inputs={inputs} type="payment"></Form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payment;
