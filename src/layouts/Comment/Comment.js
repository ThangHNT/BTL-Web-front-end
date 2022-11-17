import { useState, useLayoutEffect, memo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import host from '~/ulties/host';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Comment({ bookId }) {
    const [userComment, setUserComment] = useState([]);
    const starRef = useRef([]);

    useLayoutEffect(() => {
        if (bookId) {
            axios
                .get(`${host}/evaluate/get-all/${bookId}`)
                .then(({ data }) => {
                    // console.log(data.comments[0]);
                    if (!data.status) alert('Loi lay comments');
                    else {
                        setUserComment(data.comments);
                    }
                })
                .catch((err) => console.log('loi lay comments'));
        }
        // eslint-disable-next-line
    }, []);

    const handleGetStar = (numberOfStar) => {
        starRef.current = [];
        for (let i = 0; i < numberOfStar; i++) {
            starRef.current.push(0);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Nhận xét</span>
            <div className={cx('comment-list')}>
                {userComment.map((item, index) => (
                    <div key={index} className={cx('comment-item')}>
                        <div className={cx('user-avatar')}>
                            <Image src={item.avatar} circle avatar />
                        </div>
                        <div className={cx('user-info-evaluate')}>
                            <div style={{ display: 'flex' }}>
                                <p className={cx('user-account')}>{item.account}</p>
                                <div className={cx('user-vote-star')}>
                                    {handleGetStar(item.star)}
                                    {starRef.current.map((item, index) => (
                                        <FontAwesomeIcon key={index} className={cx('star')} icon={faStar} />
                                    ))}
                                </div>
                            </div>
                            <div className={cx('comment-content')}>
                                <p>{item.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(Comment);
