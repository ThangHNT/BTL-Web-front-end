import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import axios from 'axios';
import host from '~/ulties/host';
import styles from './BookControl.module.scss';
import { useNavigate } from 'react-router-dom';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AddBook({ add = false, edit = false }) {
    const [inputValues, setInputValues] = useState({
        title: '',
        author: '',
        description: '',
        numberOfPage: '',
        category: '',
        releaseDate: '',
        price: '',
        quantity: '',
    });

    const navigate = useNavigate();
    const location = useLocation();
    const coverImageRef = useRef();
    const formRef = useRef();
    const bookIdRef = useRef(location.pathname.split('/')[3]);

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

    useEffect(() => {
        if (edit) {
            axios
                .get(`${host}/book/detail/${bookIdRef.current}`)
                .then(({ data }) => {
                    // console.log(data.book);
                    setInputValues(data.book);
                })
                .catch((err) => console.log(err));
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
        console.log(inputValues);
        if (edit) {
            const { data } = await axios.put(`${host}/book/edit/${bookIdRef.current}`, inputValues);
            // console.log(data);
            if (data.status) {
                console.log('Chinh sua sach thanh cong');
            } else {
                console.log('Loi sua sach');
            }
        } else {
            const { data } = await axios.post(`${host}/book/add`, inputValues);
            if (data.status) {
                alert('Them moi sach thanh cong');
                window.location.reload();
            } else {
                alert('Loi them moi sach');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('header-title')}>Th??m s??ch</h1>
            <form ref={formRef} className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('input-fields')}>
                    <div className={cx('text-input')}>
                        <div className={cx('row')}>
                            <div className={cx('column')}>
                                <Input
                                    type="text"
                                    placeholder="T??n s??ch"
                                    name="title"
                                    border
                                    autoComplete="off"
                                    required
                                    onChange={handleSetInputValue}
                                    value={inputValues.title}
                                />
                            </div>
                            <div className={cx('column')}>
                                <Input
                                    type="text"
                                    placeholder="T??c gi???"
                                    name="author"
                                    border
                                    autoComplete="off"
                                    required
                                    onChange={handleSetInputValue}
                                    value={inputValues.author}
                                />
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <Input
                                textArea
                                type="text"
                                rows="10"
                                placeholder="M?? t???"
                                name="description"
                                border
                                onChange={handleSetInputValue}
                                value={inputValues.description}
                            />
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('column')}>
                                <Input
                                    type="text"
                                    placeholder="Th??? lo???i"
                                    name="category"
                                    border
                                    autoComplete="off"
                                    required
                                    onChange={handleSetInputValue}
                                    value={inputValues.category}
                                />
                            </div>
                            <div className={cx('column')}>
                                <Input
                                    type="number"
                                    placeholder="S??? trang"
                                    name="numberOfPage"
                                    border
                                    required
                                    onChange={handleSetInputValue}
                                    value={inputValues.numberOfPage}
                                />
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('column')}>
                                <Input
                                    label="Ng??y ph??t h??nh"
                                    type="date"
                                    placeholder="Ng??y ph??t h??nh"
                                    name="releaseDate"
                                    border
                                    required
                                    onChange={handleSetInputValue}
                                    value={inputValues.releaseDate}
                                />
                            </div>
                            <div className={cx('column')}>
                                <Input
                                    label="Gi??(VND)"
                                    type="number"
                                    placeholder="Gi??"
                                    name="price"
                                    border
                                    required
                                    onChange={handleSetInputValue}
                                    value={inputValues.price}
                                />
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('column')}>
                                <Input
                                    label="S??? l?????ng"
                                    type="number"
                                    placeholder="S??? l?????ng"
                                    name="quantity"
                                    border
                                    required
                                    onChange={handleSetInputValue}
                                    value={inputValues.quantity}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('file-input')}>
                        <Image
                            ref={coverImageRef}
                            coverImgae
                            src={add ? '/default-image.png' : inputValues.coverImage}
                            alt="cover-image"
                        />
                        <div className={cx('select-img-btn')}>
                            <Button secondary border medium type="button">
                                Ch???n ???nh
                                <input
                                    type="file"
                                    className={cx('select-img-input')}
                                    onChange={handleSelectImage}
                                    name="coverImage"
                                    required={inputValues.coverImage ? false : true}
                                />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('action-btn')}>
                    <Button type="submit" primary large border>
                        {add ? 'Th??m m???i' : 'Ch???nh s???a'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddBook;
