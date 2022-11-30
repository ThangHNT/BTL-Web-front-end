import { useEffect, useState, useRef, useCallback, memo, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import host from '~/ulties/host';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './BookDetail.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Comment from '~/layouts/Comment';
import { BookContext } from '~/components/context/BookContext';

const cx = classNames.bind(styles);

const fullStarArr = [
    { star: <FontAwesomeIcon className={cx('star', { fullStar: true })} icon={fullStar} /> },
    { star: <FontAwesomeIcon className={cx('star', { fullStar: true })} icon={fullStar} /> },
    { star: <FontAwesomeIcon className={cx('star', { fullStar: true })} icon={fullStar} /> },
    { star: <FontAwesomeIcon className={cx('star', { fullStar: true })} icon={fullStar} /> },
    { star: <FontAwesomeIcon className={cx('star', { fullStar: true })} icon={fullStar} /> },
];
const emptyStarArr = [
    { star: <FontAwesomeIcon className={cx('star')} icon={faStar} /> },
    { star: <FontAwesomeIcon className={cx('star')} icon={faStar} /> },
    { star: <FontAwesomeIcon className={cx('star')} icon={faStar} /> },
    { star: <FontAwesomeIcon className={cx('star')} icon={faStar} /> },
    { star: <FontAwesomeIcon className={cx('star')} icon={faStar} /> },
];

function BookDetail() {
    const { handleSetNewComment, handleSetDisplayModal } = useContext(BookContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [book, setBook] = useState();
    const [changeStar, setChangeStar] = useState(false);
    const [commentContent, setCommentContent] = useState();

    const currentUserRef = useRef(JSON.parse(localStorage.getItem('user')));
    const fullStarRef = useRef([]);
    const emptyStarRef = useRef(emptyStarArr);
    const bookIdRef = useRef(location.pathname.split('/')[3]);

    useEffect(() => {
        axios
            .get(`${host}/book/detail/${bookIdRef.current}`)
            .then(({ data }) => {
                // console.log(data);
                if (data.status) {
                    setBook(data.book);
                } else {
                    console.log('Lỗi lấy sách');
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {}, [changeStar]);

    const handleChangeStarArr = (e) => {
        const target = e.currentTarget;
        let fullStarLength = fullStarRef.current.length;
        // let emptyStarLength = emptyStarRef.current.length;
        let index = Number(target.getAttribute('index'));
        let type = target.getAttribute('type');
        if (type === 'empty-star') {
            let arr1 = fullStarArr.slice(0, index + fullStarLength + 1);
            let arr2 = emptyStarArr.slice(arr1.length, 5);
            fullStarRef.current = arr1;
            emptyStarRef.current = arr2;
        } else {
            if (index <= 1 && fullStarLength === 1) {
                emptyStarRef.current = emptyStarArr;
                fullStarRef.current = [];
            } else {
                let arr1 = fullStarArr.slice(0, index + 1);
                let arr2 = emptyStarArr.slice(index + 1, 5);
                emptyStarRef.current = arr2;
                fullStarRef.current = arr1;
            }
        }
        setChangeStar((pre) => !pre);
    };

    const handleChangeInput = (e) => {
        setCommentContent(e.target.value);
    };

    const handleSendEvaluate = async () => {
        if (fullStarRef.current.length < 1) {
            alert('Bạn hãy đánh giá sao cho sách!');
            return;
        }
        const { data } = await axios.post(`${host}/comment/send`, {
            star: fullStarRef.current.length,
            user: currentUserRef.current.userId,
            book: bookIdRef.current,
            content: commentContent,
            time: new Date().getTime(),
        });
        handleSetNewComment({
            star: fullStarRef.current.length,
            content: commentContent,
            time: new Date().getTime(),
            account: currentUserRef.current.account,
            avatar: currentUserRef.current.avatar,
        });

        if (!data.status) alert('Loi gui comment');
        setCommentContent('');
        let arr = emptyStarArr.slice(0, 5);
        fullStarRef.current = [];
        emptyStarRef.current = arr;
        setChangeStar((pre) => !pre);
    };

    const goToLoginPage = useCallback(() => {
        return navigate('/login');
        // eslint-disable-next-line
    }, []);

    const handleConfirmLoginToBuy = () => {
        if (currentUserRef.current) {
            navigate('/book/order/' + bookIdRef.current);
        } else {
            handleSetDisplayModal({
                title: 'Thanh toán',
                content: 'Bạn cần đăng nhập để mua sách',
                rejectBtn: 'Hủy',
                acceptBtn: 'Đăng nhập',
                action: goToLoginPage,
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            {book && (
                <div>
                    <div className={cx('book-info')}>
                        <div className={cx('cover-image')}>
                            <Image coverImgae src={book.coverImage} alt="Ảnh bìa" />
                        </div>
                        <div className={cx('detail-info')}>
                            <div className={cx('detail-info-item')}>
                                <p>
                                    <span className={cx('attribute')}>Tác phẩm: </span>
                                    <span className={cx('title')}>{book.title}</span>
                                </p>
                            </div>
                            <div className={cx('detail-info-item')}>
                                <p>
                                    <span className={cx('attribute')}>Tác giả: </span>
                                    <span className={cx('author')}>{book.author}</span>
                                </p>
                            </div>
                            <div className={cx('detail-info-item')}>
                                <p>
                                    <span className={cx('attribute')}>Mô tả: </span>
                                    <span className={cx('description')}>{book.description}</span>
                                </p>
                            </div>
                            <div className={cx('detail-info-item')}>
                                <p>
                                    <span className={cx('attribute')}>Ngày phát hành: </span>
                                    <span>{book.releaseDate}</span>
                                </p>
                            </div>
                            <div className={cx('detail-info-item')}>
                                <p>
                                    <span className={cx('attribute')}>Số trang: </span>
                                    <span>{book.numberOfPage}</span>
                                </p>
                            </div>
                            <div className={cx('detail-info-item')}>
                                <p>
                                    <span className={cx('attribute')}>Còn lại: {book.quantity} </span>
                                    <span>{book.remains}</span>
                                </p>
                            </div>
                            <div className={cx('detail-info-item')}>
                                <p>
                                    <span className={cx('attribute')}>Giá: </span>
                                    <span className={cx('price')}>{book.price} VND</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {!book.deleted && (
                        <div className={cx('user-actions')}>
                            <div className={cx('buy-btn')}>
                                {book.quantity < 1 ? (
                                    <span className={cx('sold-out')}>SÁCH ĐÃ BÁN HẾT</span>
                                ) : (
                                    <Button border primary veryLarge onClick={handleConfirmLoginToBuy}>
                                        Đặt mua ngay
                                    </Button>
                                )}
                            </div>
                            <div className={cx('evaluate')}>
                                <div className={cx('vote')}>
                                    <span className={cx('evaluate-title')}>Đánh giá</span>
                                    {fullStarRef.current.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                type="full-star"
                                                index={index}
                                                className={cx('star-item')}
                                                onClick={handleChangeStarArr}
                                            >
                                                {item.star}
                                            </div>
                                        );
                                    })}
                                    {emptyStarRef.current.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                type="empty-star"
                                                index={index}
                                                className={cx('star-item')}
                                                onClick={handleChangeStarArr}
                                            >
                                                {item.star}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={cx('comment')}>
                                    <div className={cx('write-comment')}>
                                        <span className={cx('evaluate-title')}>Bình luận</span>
                                        <div className={cx('input-comment')}>
                                            <Input
                                                value={commentContent}
                                                border
                                                rows="5"
                                                maxLength="500"
                                                textArea
                                                onChange={handleChangeInput}
                                            ></Input>
                                        </div>
                                        {(commentContent || fullStarRef.current.length > 0) && (
                                            <div className={cx('send-comment-btn')}>
                                                <Button secondary border large onClick={handleSendEvaluate}>
                                                    Gửi đánh giá và bình luận
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <div className={cx('user-comments')}>
                                        <Comment bookId={bookIdRef.current} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default memo(BookDetail);
