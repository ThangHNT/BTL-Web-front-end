import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

function Image({ src, alt = '', rounded = false, avatar = false, circle = false, logo = false }) {
    const classes = cx('wrapper', {
        rounded,
        circle,
        logo,
        avatar,
    });

    return <img className={classes} src={src} alt={alt}></img>;
}

export default memo(Image);
