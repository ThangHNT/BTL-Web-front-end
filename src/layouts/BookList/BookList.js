import { memo, useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import host from '~/ulties/host';
import styles from './BookList.module.scss';
import BookItem from '~/layouts/BookItem';
import { BookContext } from '~/components/context/BookContext';

const cx = classNames.bind(styles);

function BookList() {
    const { handleSetBookList } = useContext(BookContext);
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        axios
            .get(`${host}/book/get/all-book`)
            .then(({ data }) => {
                // console.log(data);
                handleSetBookList(data.books);
                setBookList([...data.books]);
            })
            .catch((err) => {
                console.log('loi lay tat ca sach');
            });
        // eslint-disable-next-line
    }, []);

    return (
        <div className={cx('wrapper')}>
            {bookList.map((book, index) => {
                return (
                    <div key={index} className={cx('book-item')}>
                        <BookItem
                            bookId={book._id}
                            coverImage={book.coverImage}
                            title={book.title}
                            author={book.author}
                            category={book.category}
                            book
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default memo(BookList);
