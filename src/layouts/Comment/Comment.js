import { useState, useLayoutEffect, useEffect, memo, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';
import host from '~/ulties/host';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Image from '~/components/Image';
import { BookContext } from '~/components/context/BookContext';
import formatTime from '~/ulties/formatTime';

const cx = classNames.bind(styles);

function Comment({ bookId }) {
    // console.log('Comment');
    const { newComment, handleSetNewComment } = useContext(BookContext);
    const [userComment, setUserComment] = useState([]);
    const starRef = useRef([]);

    useLayoutEffect(() => {
        if (bookId) {
            axios
                .get(`${host}/comment/get-all/${bookId}`)
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

    useEffect(() => {
        if (newComment) {
            setUserComment((pre) => {
                return [newComment, ...pre];
            });
            handleSetNewComment(false);
        }
        // eslint-disable-next-line
    }, [newComment]);

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
                                <Tippy
                                    placement="right"
                                    render={(attrs) => (
                                        <div className="comment-content-box" tabIndex="-1" {...attrs}>
                                            {formatTime(item.time)}
                                        </div>
                                    )}
                                >
                                    <p>{item.content}</p>
                                </Tippy>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(Comment);
