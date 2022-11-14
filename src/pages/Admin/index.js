import { useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import host from '~/ulties/host';
import styles from './Admin.module.scss';
import { useNavigate } from 'react-router-dom';
import Container from '~/layouts/Container';
import Header from '~/layouts/Header';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Home() {
    const [inputValues, setInputValues] = useState({});

    const navigate = useNavigate();
    const coverImageRef = useRef();
    const formRef = useRef();

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

    const handleSetInputValue = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInputValues((pre) => {
            pre[name] = value;
            return { ...pre };
        });
    };

    const handleSelectImage = (e) => {
        const target = e.target;
        let reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => {
            let dataUrl = reader.result;
            coverImageRef.current.src(dataUrl);
            setInputValues((pre) => {
                pre.coverImage = dataUrl;
                return { ...pre };
            });
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`${host}/book/add`, inputValues);
        if (data.status) {
            alert('Them moi sach thanh cong');
        } else {
            alert('Loi them moi sach');
        }
    };

    return (
        <Container>
            <Header></Header>
            <div className={cx('content')}>
                <h1 className={cx('header-title')}>Thêm sách</h1>
                <form ref={formRef} className={cx('form')} onSubmit={handleSubmit}>
                    <div className={cx('input-fields')}>
                        <div className={cx('text-input')}>
                            <div className={cx('row')}>
                                <div className={cx('column')}>
                                    <Input
                                        type="text"
                                        placeholder="Tên sách"
                                        name="title"
                                        border
                                        autoComplete="off"
                                        required
                                        onChange={handleSetInputValue}
                                    />
                                </div>
                                <div className={cx('column')}>
                                    <Input
                                        type="text"
                                        placeholder="Tác giả"
                                        name="author"
                                        border
                                        autoComplete="off"
                                        required
                                        onChange={handleSetInputValue}
                                    />
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <Input
                                    textArea
                                    type="text"
                                    rows="10"
                                    placeholder="Mô tả"
                                    name="description"
                                    border
                                    onChange={handleSetInputValue}
                                />
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('column')}>
                                    <Input
                                        type="text"
                                        placeholder="Thể loại"
                                        name="category"
                                        border
                                        autoComplete="off"
                                        required
                                        onChange={handleSetInputValue}
                                    />
                                </div>
                                <div className={cx('column')}>
                                    <Input
                                        type="number"
                                        placeholder="Số trang"
                                        name="numberOfPage"
                                        border
                                        required
                                        onChange={handleSetInputValue}
                                    />
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('column')}>
                                    <Input
                                        label="Ngày phát hành"
                                        type="date"
                                        placeholder="Ngày phát hành"
                                        name="releaseDate"
                                        border
                                        required
                                        onChange={handleSetInputValue}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('file-input')}>
                            <Image ref={coverImageRef} coverImgae src="/default-image.png" alt="cover-image" />
                            <div className={cx('select-img-btn')}>
                                <Button secondary border medium type="button">
                                    Chọn ảnh
                                    <input
                                        type="file"
                                        className={cx('select-img-input')}
                                        onChange={handleSelectImage}
                                        name="coverImage"
                                        required
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('action-btn')}>
                        <Button type="submit" primary large border>
                            Thêm mới
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );
}

export default Home;
