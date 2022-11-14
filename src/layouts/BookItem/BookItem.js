import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BookItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function BookItem({ bookId, coverImage, author, title, category }) {
    return (
        <Link to="#" className={cx('wrapper')}>
            <div className={cx('cover-image')}>
                <Image book src="https://vaithuhayho.com/wp-content/uploads/2021/03/hinh-anh-dep-51.jpg" />
            </div>
            <div className={cx('introduction')}>
                <p className={cx('introduction-title')}>Cay da cung trang</p>
                <p className={cx('introduction-author')}>Tác giả: Thang Hoang </p>
                <p className={cx('introduction-category')}>Thể loại : truyện ngắn</p>
            </div>
        </Link>
    );
}

export default memo(BookItem);
