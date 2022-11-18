import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
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
        type: 'number',
        label: 'Số thẻ ngân hàng',
        name: 'creditNumber',
        maxlength: 50,
        required: true,
    },
];

function Payment({ currentUser }) {
    useEffect(() => {
        console.log('payment');
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('book')}>
                <div className={cx('book-cover-image')}>
                    <Image
                        src="https://nld.mediacdn.vn/2020/5/29/doi-hoa-tim-5-1590731334546464136746.jpg"
                        alt="book-cover-image"
                        book
                    />
                </div>
                <p className={cx('book-title')}>Bau troi mua thu</p>
                <p className={cx('book-price')}>150.000</p>
                <div className={cx('book-select-quantity')}>
                    <Input type="number" label="Số lượng" border />
                </div>
                <div className={cx('book-into-money')}>
                    Thành tiền:
                    <p>150.000đ</p>
                </div>
            </div>
            <div className={cx('payment-area')}>
                <Form payment inputs={inputs} type="payment"></Form>
            </div>
        </div>
    );
}

export default Payment;
