import { memo, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import host from '~/ulties/host';
import styles from './BookList.module.scss';
import BookItem from '~/layouts/BookItem';
const cx = classNames.bind(styles);

function BookList() {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        axios
            .get(`${host}/book/get/all-book`)
            .then(({ data }) => {
                // console.log(data);
                setBookList([...data.books]);
            })
            .catch((err) => {
                console.log('loi lay tat ca sach');
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            {bookList.map((book, index) => {
                return (
                    <div key={index} className={cx('book-item')}>
                        <BookItem bookId={book._id} title={book.title} author={book.author} />
                    </div>
                );
            })}
        </div>
    );
}

export default memo(BookList);
