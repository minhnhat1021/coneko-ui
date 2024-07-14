import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

const Button = forwardRef(({to,
    href, 
    login = false,
    register = false, 
    dsShow = false,
    primary = false, 
    disabled = false,
    itemBtn,
    itemUserBtn,
    leftIcon = false,
    children, 
    rightIcon = false, 
    onClick, 
    showModal,
    logout,
    ...passProps }, ref) => 
{

    let Comp = 'button'
    const handleOnClick = (e) => {
        if (showModal) {
            showModal(e);
        } else if (logout) {
            logout(e);
        } else if (onClick) {
            onClick(e);
        }
    }
    const props = {
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
        register,
        primary,
        disabled,
        itemBtn,
        itemUserBtn,
    })
    return ( 
        <Comp onClick={handleOnClick} className={classes} ref={ref} {...props}>
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('left-icon')}>{rightIcon}</span>}
        </Comp>
    );
})

export default Button;