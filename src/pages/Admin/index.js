import { useLayoutEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import host from '~/ulties/host';
import styles from './Admin.module.scss';
import { useNavigate } from 'react-router-dom';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
        } else {
            axios.post(`${host}/user/check-admin`, { userId: user.userId }).then(({ data }) => {
                if (!data.status) {
                    navigate('/home');
                }
            });
        }
        // eslint-disable-next-line
    }, []);
    return (
        <Container>
            <Header></Header>
            <div className={cx('content')}>
                <h1 className={cx('header-title')}>Thêm sách</h1>
                <form className={cx('form')}>
                    <div className={cx('text-input')}>
                        <div className={cx('row')}>
                            <div className={cx('column')}>
                                <Input type="text" placeholder="Tên sách" name="title" border />
                            </div>
                            <div className={cx('column')}>
                                <Input type="text" placeholder="Tác giả" name="author" border />
                            </div>
                        </div>
                    </div>
                    <div className={cx('file-input')}></div>
                </form>
            </div>
        </Container>
    );
}

export default Home;
