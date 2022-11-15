import { useLayoutEffect, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BookDetail.module.scss';
import { BookContext } from '~/components/context/BookContext';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function BookDetail() {
    const { bookId, bookList } = useContext(BookContext);

    const [book, setBook] = useState();

    useLayoutEffect(() => {
        if (bookId) {
            setBook(bookList.get(bookId));
        }
        // eslint-disable-next-line
    }, [bookId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('book-info')}>
                <div className={cx('cover-image')}>
                    <Image coverImgae src={book.coverImage} alt="Ảnh bìa" />
                </div>
                <div className={cx('detail-info')}>
                    <p className={cx('title')}>{book.title}</p>
                    <p className={cx('author')}>{book.author}</p>
                    <p className={cx('description')}>{book.description}</p>
                    <p className={cx('release-date')}>{book.releaseDate}</p>
                    <p className={cx('number-of-page')}>{book.numberOfPage}</p>
                </div>
            </div>
            <div className={cx('user-actions')}></div>
        </div>
    );
}

export default BookDetail;
