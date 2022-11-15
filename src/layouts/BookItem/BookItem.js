import { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BookItem.module.scss';
import Image from '~/components/Image';
import { BookContext } from '~/components/context/BookContext';

const cx = classNames.bind(styles);

function BookItem({ bookId, coverImage, author, title, category }) {
    const { handleSetGetBookId } = useContext(BookContext);

    const handleGoBookDetailPage = () => {
        handleSetGetBookId(bookId);
    };

    return (
        <Link to={`/book/detail/${bookId}`} className={cx('wrapper')} onClick={handleGoBookDetailPage}>
            <div className={cx('cover-image')}>
                <Image book src={coverImage} />
            </div>
            <div className={cx('introduction')}>
                <p className={cx('introduction-title')}>{title}</p>
                <p className={cx('introduction-author')}>Tác giả: {author}</p>
                <p className={cx('introduction-category')}>Thể loại: {category}</p>
            </div>
        </Link>
    );
}

export default memo(BookItem);
