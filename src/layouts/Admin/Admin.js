import { useEffect, useState, memo, useCallback, useContext, useRef } from 'react';
import axios from 'axios';
import host from '~/ulties/host';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import Button from '~/components/Button';
import BookItem from '~/layouts/BookItem';
import Modal from '~/layouts/Modal';
import { BookContext } from '~/components/context/BookContext';

const cx = classNames.bind(styles);

function Admin() {
    const { handleSetDisplayModal } = useContext(BookContext);
    const [books, setBooks] = useState();
    const bookIdRef = useRef();

    useEffect(() => {
        axios
            .get(`${host}/book/get/all-book`)
            .then(({ data }) => {
                // console.log(data);
                setBooks(data.books);
            })
            .catch((err) => console.log('loi get all book at admin page'));
    }, []);

    const handleDeleteBook = useCallback((e) => {
        let bookId = e.currentTarget.getAttribute('bookid');
        if (bookId) {
            bookIdRef.current = bookId;
            handleSetDisplayModal({
                title: 'Xóa sách',
                content: 'Bạn có chắc chắn muốn xóa sách ?',
                acceptBtn: 'Đồng ý',
                rejectBtn: 'Hủy',
                action: handleDeleteBookInDatabas,
            });
        }
    }, []);

    const handleDeleteBookInDatabas = async () => {
        handleSetDisplayModal(false);
        const { data } = await axios.delete(`${host}/book/delete/${bookIdRef.current}`);
        // console.log(data);
        if (data.status) {
            toast.success('Xóa sách thành công.');
        } else {
            toast.error('Lỗi xóa sách');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <div className={cx('add-book-btn')}>
                    <Button to="/admin/add-book" primary border medium>
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
            <Modal />
            <ToastContainer
                position="bottom-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </div>
    );
}

export default memo(Admin);
