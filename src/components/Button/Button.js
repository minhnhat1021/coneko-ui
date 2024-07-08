import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({to,
    href, 
    login = false, 
    menu = false,
    primary = false, 
    disabled = false,
    leftIcon = false,
    children, 
    rightIcon = false, 
    onClick, 
    ...passProps }) 
{

    let Comp = 'button'

    const props = {
        onClick,
        ...passProps,
    }

    // tìm những sự kiện và loại bỏ khỏi props khi có disabled 
    if(disabled){
        Object.keys(props).forEach(key => {
            if(key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    if(to) {
        props.to = to
        Comp = Link
    } else if(href) {
        props.href = href
        Comp = 'a'
    }
    const classes = cx('wrapper', {
        login,
        menu,
        primary,
        disabled,
    })
    return ( 
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('left-icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;