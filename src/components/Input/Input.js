import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ label = false, noLabel = false, noBorder = false, border = false, textArea, rounded, ...passProps }) {
    let Input = 'input';
    if (textArea) {
        Input = 'textarea';
    }

    const props = { ...passProps };

    const classnames = cx('input', {
        rounded,
        border,
        noBorder,
    });

    return (
        <div className={cx('wrapper')}>
            {label && <label className={cx('label')}>{label}</label>}
            <Input className={classnames} {...props}></Input>
        </div>
    );
}

export default Input;
