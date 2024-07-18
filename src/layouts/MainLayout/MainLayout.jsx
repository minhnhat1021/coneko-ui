import React from 'react';

import Header from '~/layouts/Components/Header'
import Footer from '~/layouts/Components/Footer'

import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss'

const cx = classNames.bind(styles)


function MainLayout({ children, userData}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {!userData ? children :  React.cloneElement(children, { userData })}
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default MainLayout;