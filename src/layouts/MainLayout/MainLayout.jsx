import React from 'react';

import Header from '~/layouts/Components/Header'
import Footer from '~/layouts/Components/Footer'

import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss'

const cx = classNames.bind(styles)


function MainLayout({ children, userData}) {
    const user = userData.data
    return ( 
        <div className={cx('wrapper')}>
            <Header userData={user}/>
            
            <div className={cx('content')}>
                {!userData ? children :  React.cloneElement(children, { user })}
            </div>

            <Footer/>
        </div>
    );
}

export default MainLayout;