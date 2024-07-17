import React from 'react';

import Header from '~/layouts/Components/Header'
import Footer from '~/layouts/Components/Footer'

import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss'

const cx = classNames.bind(styles)


function MainLayout({ children, userData = {data: {message: ''}} }) {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <h2>{userData.data.message}</h2>

            <div className={cx('container')}>
                <div className={cx('content')}>
                    {children}
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default MainLayout;