import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    onClick,
    children,
    leftIcon,
    medium = false,
    small = false,
    large = false,
    primary = false,
    secondary = false,
    circle = false,
    ...passProps
}) {
    let Btn = 'button';
    const props = { ...passProps, onClick };
    if (to) {
        Btn = Link;
        props.to = to;
    } else if (href) {
        Btn = 'a';
        props.href = href;
    }

    const classnames = cx('wrapper', {
        medium,
        small,
        large,
        circle,
        primary,
        secondary,
    });

    return (
        <Btn {...props} className={classnames}>
            {leftIcon && <span className={cx('icon')}></span>}
            <span className={cx('title')}>{children}</span>
        </Btn>
    );
}

export default Button;
