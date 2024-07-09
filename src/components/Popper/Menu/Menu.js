import { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import {Wrapper as PopperWrapper} from '~/components/Popper'
import MenuItem from './MenuItem';
import Header from './Header';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

const defaultFn = () => {

}
function Menu({children, Menu_item = [], onChange = defaultFn}) {

    const [history, setHistory] = useState([{ data: Menu_item }])
    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.subMenu
                return <MenuItem key={index} data={item} onClick={() => {
                if(isParent) {
                    setHistory(prev => [...prev, item.subMenu])
                }else {
                    onChange(item)
                }
            }}/>
        })
    }
    const handleBack = () => {
        setHistory(prev => prev.slice(0, prev.length - 1))
    }
    const handleHide = () => {
        setHistory(prev => [prev[0]])
    }
    return ( 
        <HeadlessTippy 
            delay={[0, 500]}
            interactive
            placement='bottom-end'
            render={attrs => (
                    <div className={cx('actions__menu-item')} tabIndex='-1' {...attrs}>
                        <PopperWrapper>
                            {history.length > 1 && <Header title={current.title} onBack={handleBack}/>}
                            {renderItems()}
                        </PopperWrapper>
                    </div>
            )}
            onHide={() => {handleHide()}}
        >
            {children}
        </HeadlessTippy>
     );
}

export default Menu;