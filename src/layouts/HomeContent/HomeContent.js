import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeContent.module.scss';
import BookList from '~/layouts/BookList';

const cx = classNames.bind(styles);

function HomeContent() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('book-list')}>
                <BookList />
            </div>
        </div>
    );
}

export default memo(HomeContent);
