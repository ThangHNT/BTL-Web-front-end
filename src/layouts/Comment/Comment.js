import { useState, useLayoutEffect, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import host from '~/ulties/host';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Comment({ bookId }) {
    const [userComment, setUserComment] = useState();

    useLayoutEffect(() => {
        if (bookId) {
            axios
                .get(`${host}/comment/get-all/${bookId}`)
                .then(({ data }) => {
                    console.log(data);
                })
                .catch((err) => console.log('loi lay comments'));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Nhận xét</span>
            <div className={cx('comment-list')}>
                <div className={cx('comment-item')}>
                    <div className={cx('user-avatar')}>
                        <Image
                            src="https://vaithuhayho.com/wp-content/uploads/2021/03/hinh-anh-dep-51.jpg"
                            circle
                            avatar
                        />
                    </div>
                    <div className={cx('user-info-evaluate')}>
                        <div style={{ display: 'flex' }}>
                            <p className={cx('user-account')}>Thang Hoang</p>
                            <div className={cx('user-vote-star')}>
                                <FontAwesomeIcon className={cx('star')} icon={faStar} />
                            </div>
                        </div>
                        <div className={cx('comment-content')}>
                            <p>
                                môn nghiên cứu về những vấn đề chung và cơ bản của con người, thế giới quan và vị trí
                                của con người trong thế giới quan, những vấn đề có kết nối với chân lý, sự tồn tại, kiến
                                thức, giá trị, quy luật, ý thức, và ngôn ngữ. Triết học được phân biệt{' '}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={cx('comment-item')}>
                    <div className={cx('user-avatar')}>
                        <Image
                            src="https://vaithuhayho.com/wp-content/uploads/2021/03/hinh-anh-dep-51.jpg"
                            circle
                            avatar
                        />
                    </div>
                    <div className={cx('user-info-evaluate')}>
                        <div style={{ display: 'flex' }}>
                            <p className={cx('user-account')}>Thang Hoang</p>
                            <div className={cx('user-vote-star')}>
                                <FontAwesomeIcon className={cx('star')} icon={faStar} />
                            </div>
                        </div>
                        <div className={cx('comment-content')}>
                            <p>
                                môn nghiên cứu về những vấn đề chung và cơ bản của con người, thế giới quan và vị trí
                                của con người trong thế giới quan, những vấn đề có kết nối với chân lý, sự tồn tại, kiến
                                thức, giá trị, quy luật, ý thức, và ngôn ngữ. Triết học được phân biệt{' '}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Comment);
