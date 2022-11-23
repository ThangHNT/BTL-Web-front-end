import { memo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import host from '~/ulties/host';
import classNames from 'classnames/bind';
import Input from '~/components/Input';
import styles from './Search.module.scss';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [displaySearchResults, setDisplaySearchResults] = useState(false);
    const debounce = useDebounce(searchValue, 800);
    const searchResultsRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        if (!debounce.trim()) return;
        // console.log(debounce);
        axios
            .post(`${host}/book/search`, { searchValue: debounce })
            .then(({ data }) => {
                // console.log(data.results);
                setResults(data.results);
            })
            .catch((err) => console.log('Loi tim kiem sach'));
    }, [debounce]);

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (searchResultsRef.current) {
                if (!searchResultsRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
                    setDisplaySearchResults(false);
                }
            }
        });

        return () => document.removeEventListener('click', (e) => {});
    }, []);

    const handleTexting = (e) => {
        let valueInput = e.currentTarget.value;
        if (!valueInput.startsWith(' ')) {
            setSearchValue(valueInput);
        } else {
            setSearchValue('');
            e.currentTarget.value = '';
        }
    };

    const handleFocusInput = (e) => {
        setDisplaySearchResults(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('input')}>
                <Input
                    ref={inputRef}
                    rounded
                    placeholder="Tìm kiếm sách"
                    onChange={handleTexting}
                    onFocus={handleFocusInput}
                />
            </div>
            {results.length > 0 && displaySearchResults && (
                <div ref={searchResultsRef} className={cx('search-result')}>
                    {results.map((result, index) => (
                        <Link key={index} to={`/book/detail/${result.bookId}`} className={cx('search-result-item')}>
                            <p className={cx('title')}>{result.title}</p>
                            <p className={cx('author')}>Tác giả: {result.author}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(Search);
