import HeadlessTippy from '@tippyjs/react/headless';

import {Wrapper as PopperWrapper} from '~/components/Popper'
import MenuItem from './MenuItem';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function Menu({children, Menu_item = []}) {

    const renderItems = () => {
        return Menu_item.map((item, index) => {
            console.log(item.title)
            return <MenuItem key={index} data={item}/>}
        )
    }
    return ( 
        <HeadlessTippy 
            delay={[0, 500]}
            interactive
            placement='bottom-end'
            render={attrs => (
                    <div className={cx('actions__menu-item')} tabIndex='-1' {...attrs}>
                        <PopperWrapper>
                            {renderItems()}
                        </PopperWrapper>
                    </div>
            )}
        >
            {children}
        </HeadlessTippy>
     );
}

export default Menu;