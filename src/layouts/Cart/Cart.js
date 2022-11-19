import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Cart() {
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
                    </div>
                    <div className={cx('buy-history')}>
                        <div className={cx('buy-history-header')}></div>
                        <div className={cx('buy-history-item')}></div>
                    </div>
                    <div className={cx('view-history-btn')}>
                        <span>Lịch sử đặt hàng</span>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
