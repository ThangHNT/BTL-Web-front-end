import { memo, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeContent.module.scss';

const cx = classNames.bind(styles);

function BookList() {
    const [bookList, setBookList] = useState();

    return <div className={cx('wrapper')}></div>;
}

export default memo(BookList);
