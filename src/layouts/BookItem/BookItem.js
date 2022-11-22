import { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BookItem.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function BookItem({
    bookId,
    coverImage,
    book = false,
    bookCart = false,
    author,
    title,
    category,
    horizontal = false,
    button = false,
    edit = false,
    remove = false,
}) {
    let WRAPPER = Link;

    if (horizontal) {
        WRAPPER = 'div';
    }

    return (
        <WRAPPER to={horizontal ? '' : `/book/detail/${bookId}`} className={cx('wrapper', { horizontal })}>
            <div className={cx('cover-image')}>
                <Image bookCart={bookCart} book={book} src={coverImage} />
            </div>
            <div className={cx('introduction')}>
                <p className={cx('introduction-title', { horizontalTitle: horizontal })}>{title}</p>
                <p className={cx('introduction-author', { horizontalAuthor: horizontal })}>Tác giả: {author}</p>
                {category && <p className={cx('introduction-category')}>Thể loại: {category}</p>}
            </div>
            {button && (
                <div className={cx('action-btns')}>
                    <div className={cx('btn-item')}>
                        <Button to={`/book/detail/${bookId}`} small border secondary>
                            Xem
                        </Button>
                    </div>
                    <div bookid={bookId} className={cx('btn-item')} onClick={edit}>
                        <Button small border primary>
                            Chỉnh sửa
                        </Button>
                    </div>
                    <div bookid={bookId} className={cx('btn-item')} onClick={remove}>
                        <Button small border danger>
                            Xóa
                        </Button>
                    </div>
                </div>
            )}
        </WRAPPER>
    );
}

export default memo(BookItem);
