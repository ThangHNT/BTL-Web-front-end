import { useEffect, useState, memo } from 'react';
import axios from 'axios';
import host from '~/ulties/host';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import Button from '~/components/Button';
import BookItem from '~/layouts/BookItem';

const cx = classNames.bind(styles);

function Admin() {
    const [books, setBooks] = useState();

    useEffect(() => {
        axios
            .get(`${host}/book/get/all-book`)
            .then(({ data }) => {
                // console.log(data);
                setBooks(data.books);
            })
            .catch((err) => console.log('loi get all book at admin page'));
    }, []);

    const handleDeleteBook = () => {
        console.log('delete book');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <div className={cx('add-book-btn')}>
                    <Button primary border medium>
                        Thêm sách mới
                    </Button>
                </div>
                <div className={cx('book-list')}>
                    {books &&
                        books.map((book, index) => (
                            <div key={index} className={cx('book-item')}>
                                <BookItem
                                    horizontal
                                    coverImage={book.coverImage}
                                    title={book.title}
                                    author={book.author}
                                    bookCart
                                    button
                                    bookId={book._id}
                                    remove={handleDeleteBook}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default memo(Admin);
