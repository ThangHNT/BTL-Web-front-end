import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ textArea, borderRadius, ...passProps }) {
    let Input = 'input';
    if (textArea) {
        Input = 'textarea';
    }

    const props = { ...passProps };

    const classnames = cx('wrapper', {
        borderRadius,
    });

    return <Input className={classnames} {...props}></Input>;
}

export default Input;
