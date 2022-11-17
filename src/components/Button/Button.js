import { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    onClick,
    children,
    icon,
    title,
    medium = false,
    small = false,
    large = false,
    veryLarge = false,
    primary = false,
    secondary = false,
    danger = false,
    basic = false,
    circle = false,
    border = false,
    modal = false,
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
        veryLarge,
        circle,
        primary,
        secondary,
        basic,
        border,
        danger,
        modal,
    });

    return (
        <Btn {...props} className={classnames}>
            {icon && <span className={cx('icon')}>{icon}</span>}
            <span className={cx('title')}>{children}</span>
        </Btn>
    );
}

export default memo(Button);
