import { useEffect, useState, useRef, memo } from 'react';
import { useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const [book, setBook] = useState();
    const [changeStar, setChangeStar] = useState(false);
    const [commentContent, setCommentContent] = useState();

    const currentUserRef = useRef(JSON.parse(localStorage.getItem('user')));
    const fullStarRef = useRef([]);
    const emptyStarRef = useRef(emptyStarArr);
    const bookIdRef = useRef(location.pathname.split('/')[3]);

    useEffect(() => {
        axios
            .get(`${host}/book/detail/?id=${bookIdRef.current}`)
            .then(({ data }) => {
                // console.log(data);
                if (data.status) {
                    setBook(data.book);
                } else {
                    alert('Lỗi lấy sách');
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
        const { data } = await axios.post(`${host}/evaluate/send`, {
            star: fullStarRef.current.length,
            user: currentUserRef.current.userId,
            book: bookIdRef.current,
            comment: commentContent,
            time: new Date().getTime(),
        });
        if (!data.status) alert('Loi gui comment');
        setCommentContent('');
        let arr = emptyStarArr.slice(0, 5);
        fullStarRef.current = [];
        emptyStarRef.current = arr;
        setChangeStar((pre) => !pre);
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
                                    <span className={cx('description')}>
                                        {book.description} Triết học là bộ môn nghiên cứu về những vấn đề chung và cơ
                                        bản của con người, thế giới quan và vị trí của con người trong thế giới quan,
                                        những vấn đề có kết nối với chân lý, sự tồn tại, kiến thức, giá trị, quy luật, ý
                                        thức, và ngôn ngữ. Triết học được phân biệt với những môn khoa học khác bằng
                                        cách thức mà nó giải quyết những vấn đề trên, đó là ở tính phê phán, phương pháp
                                        tiếp cận có hệ thống chung nhất và sự phụ thuộc của nó vào tính duy lý trong
                                        việc lập luận. Trong tiếng Anh, từ "philosophy" (triết học) xuất phát từ tiếng
                                        Hy Lạp cổ đại φιλοσοφία (philosophia), có nghĩa là "tình yêu đối với sự thông
                                        thái". Sự ra đời của các thuật ngữ "triết học" và "triết gia" được gắn với nhà
                                        tư tưởng Hy Lạp Pythagoras. Một "nhà triết học" được hiểu theo nghĩa tương phản
                                        với một "kẻ ngụy biện" (σοφιστής). Những "kẻ ngụy biện" hay "những người nghĩ
                                        mình thông thái" có một vị trí quan trọng trong Hy Lạp cổ điển, được coi như
                                        những nhà giáo, thường đi khắp nơi thuyết giảng về triết lý, nghệ thuật hùng
                                        biện và các bộ môn khác cho những người có tiền, trong khi các "triết gia" là
                                        "những người yêu thích sự thông thái" và do đó không sử dụng sự thông thái của
                                        mình với mục đích chính là kiếm tiền.
                                    </span>
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
                        </div>
                    </div>
                    <div className={cx('user-actions')}>
                        <div className={cx('buy-btn')}>
                            <Button border primary veryLarge>
                                Đặt mua ngay
                            </Button>
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
                </div>
            )}
        </div>
    );
}

export default memo(BookDetail);
