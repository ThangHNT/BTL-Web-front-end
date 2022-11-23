import { useEffect, useState, memo, useCallback, useContext, useRef } from 'react';
import axios from 'axios';
import host from '~/ulties/host';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import Button from '~/components/Button';
import Modal from '~/layouts/Modal';
import { BookContext } from '~/components/context/BookContext';

const cx = classNames.bind(styles);

function Admin() {
    return (
        <div className={cx('wrapper')}>
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
