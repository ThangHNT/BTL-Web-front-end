import { memo, forwardRef, useRef, useImperativeHandle } from 'react';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

function Image(
    {
        src,
        alt = '',
        border = false,
        book = false,
        coverImgae = false,
        avatar = false,
        circle = false,
        logo = false,
        bookCart = false,
        selectAvatar = false,
    },
    ref,
) {
    const imageRef = useRef();

    useImperativeHandle(ref, () => ({
        src(src) {
            imageRef.current.src = src;
        },
    }));

    const classes = cx('wrapper', {
        border,
        circle,
        logo,
        avatar,
        coverImgae,
        book,
        bookCart,
        selectAvatar,
    });

    return <img ref={imageRef} className={classes} src={src} alt={alt}></img>;
}

export default memo(forwardRef(Image));
