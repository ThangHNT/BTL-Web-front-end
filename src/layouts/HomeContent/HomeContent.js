import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeContent.module.scss';

const cx = classNames.bind(styles);

function HomeContent() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('book-list')}>
                <h3>helo</h3>
            </div>
        </div>
    );
}

export default memo(HomeContent);
