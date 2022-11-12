import classNames from 'classnames/bind';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

function Image({ src, alt = '', rounded = false, circle = false, logo = false }) {
    const classes = cx('wrapper', {
        rounded,
        circle,
        logo,
    });

    return <img className={classes} src={src} alt={alt}></img>;
}

export default Image;
