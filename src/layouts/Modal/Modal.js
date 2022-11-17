import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './Modal.module.scss';
import Button from '~/components/Button';
import { BookContext } from '~/components/context/BookContext';

const cx = classNames.bind(styles);

function Modal({ title = false, content = false, action = false, rejectBtn = false, acceptBtn = false }) {
    const { confirmLoginToBuy, handleSetConfirmLoginToBuy } = useContext(BookContext);

    const handleCloseModal = () => {
        handleSetConfirmLoginToBuy(false);
    };

    return (
        <div className={cx('wrapper')}>
            {confirmLoginToBuy && (
                <div className={cx('modal')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('body')}>
                        <div className={cx('header')}>
                            <p className={cx('title')}>Thanh toan</p>
                            <div className={cx('close-modal-btn')} onClick={handleCloseModal}>
                                <FontAwesomeIcon className={cx('close-icon')} icon={faXmark} />
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <p>Ban co muon thanh toan ko?</p>
                        </div>
                        <div className={cx('footer')}>
                            <div className={cx('btn-item')}>
                                <Button danger modal border onClick={handleCloseModal}>
                                    Huy
                                </Button>
                            </div>
                            <div className={cx('btn-item')}>
                                <Button primary modal border>
                                    oke
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
