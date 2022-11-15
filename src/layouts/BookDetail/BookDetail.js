import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import host from '~/ulties/host';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './BookDetail.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function BookDetail() {
    const [book, setBook] = useState();
    const location = useLocation();

    useEffect(() => {
        let bookId = location.pathname.split('/')[3];
        axios
            .get(`${host}/book/detail/?id=${bookId}`)
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
                                <div className={cx('star-item')}>
                                    <FontAwesomeIcon className={cx('star')} icon={faStar} />
                                    <FontAwesomeIcon className={cx('star', { fullStar: true })} icon={fullStar} />
                                </div>
                                <div className={cx('star-item')}>
                                    <FontAwesomeIcon className={cx('star')} icon={faStar} />
                                    <FontAwesomeIcon className={cx('star', { fullStar: true })} icon={fullStar} />
                                </div>
                                <div className={cx('star-item')}>
                                    <FontAwesomeIcon className={cx('star')} icon={faStar} />
                                    <FontAwesomeIcon className={cx('star', { fullStar: true })} icon={fullStar} />
                                </div>
                                <div className={cx('star-item')}>
                                    <FontAwesomeIcon className={cx('star')} icon={faStar} />
                                    <FontAwesomeIcon className={cx('star', { fullStar: true })} icon={fullStar} />
                                </div>
                                <div className={cx('star-item')}>
                                    <FontAwesomeIcon className={cx('star')} icon={faStar} />
                                    <FontAwesomeIcon className={cx('star', { fullStar: true })} icon={fullStar} />
                                </div>
                            </div>
                            <div className={cx('comment')}>
                                <span className={cx('evaluate-title')}>Bình luận</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookDetail;
