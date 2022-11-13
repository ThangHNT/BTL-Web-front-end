import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import Input from '~/components/Input';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Form({ inputs, type }) {
    return (
        <form className={cx('wrapper')} action={`/user/${type}`}>
            <span className={cx('title')}>{type}</span>
            <div className={cx('content')}>
                {inputs.map((input, index) => (
                    <div key={index} className={cx('input-item')}>
                        <Input
                            border
                            type={input.type}
                            label={input.label}
                            placeholder={input.placeholder}
                            name={input.name}
                            maxlength={input.maxlength}
                            required
                        />
                    </div>
                ))}
            </div>
            <div className={cx('btn')}>
                <Button primary border large type="submit">
                    {type === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                </Button>
            </div>
        </form>
    );
}

export default Form;
