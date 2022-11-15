import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <span>Mọi chi tiết xin liên hệ 094512348</span>
            <span>Admin: Thắng Hoàng - B19DCAT186</span>
        </div>
    );
}

export default memo(Footer);
