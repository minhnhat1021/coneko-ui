// import PropTypes from 'prop-types';
import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'

import styles from './Menu.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)



function MenuItem({title, to , icon, activeIcon}) {
    const location = useLocation()
    const query = new URLSearchParams(location.search)

    const getNavLinkClass = (nav, linkName) => {
        return cx('menu-item', { active: query.get('room-list') === linkName || (!query.get('room-list') && linkName === 'room-list') });
    }
    return (     
        

        <NavLink className={(nav) => getNavLinkClass(nav, 'room-list')} to={to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

// MenuItem.prototypes = {
//     title: PropTypes.string.isRequired,
//     to: PropTypes.string.isRequired,
//     icon: PropTypes.node.isRequired,
// }
export default MenuItem;