import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './Modal.module.scss';
import Button from '~/components/Button';
import { BookContext } from '~/components/context/BookContext';

const cx = classNames.bind(styles);

function Modal() {
    const { confirmLoginToBuy, confirmCancelOrder } = useContext(BookContext);
    const [modal, setModal] = useState();

    useEffect(() => {
        setModal(confirmCancelOrder);
    }, [confirmCancelOrder]);

    useEffect(() => {
        setModal(confirmLoginToBuy);
    }, [confirmLoginToBuy]);

    const handleCloseModal = () => {
        setModal(false);
    };

    return (
        <div className={cx('wrapper')}>
            {modal && (
                <div className={cx('modal')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('body')}>
                        <div className={cx('header')}>
                            <p className={cx('title')}>{modal.title}</p>
                            <div className={cx('close-modal-btn')} onClick={handleCloseModal}>
                                <FontAwesomeIcon className={cx('close-icon')} icon={faXmark} />
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <p>{modal.content}</p>
                        </div>
                        <div className={cx('footer')}>
                            {modal.rejectBtn && (
                                <div className={cx('btn-item')}>
                                    <Button danger modal border onClick={handleCloseModal}>
                                        {modal.rejectBtn}
                                    </Button>
                                </div>
                            )}
                            {modal.acceptBtn && (
                                <div className={cx('btn-item')}>
                                    <Button primary modal border onClick={modal.action}>
                                        {modal.acceptBtn}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
