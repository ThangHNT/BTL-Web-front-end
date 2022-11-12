import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import Search from '~/components/Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to="/">
                    <Image
                        src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-4k-01.jpg"
                        logo
                        circle
                    />
                </Link>
            </div>
            <div className={cx('search')}>
                <Search />
            </div>
            <div className={cx('account')}>
                <h3>hello</h3>
            </div>
        </div>
    );
}

export default Header;
