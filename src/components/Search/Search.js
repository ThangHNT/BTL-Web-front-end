import { memo } from 'react';
import classNames from 'classnames/bind';
import Input from '~/components/Input';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('input')}>
                <Input rounded placeholder="Tìm kiếm sách" />
            </div>
            <div className={cx('search-result')}></div>
        </div>
    );
}

export default memo(Search);
