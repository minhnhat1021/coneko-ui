import { useState, useEffect } from 'react'
import axios from 'axios'

import images from '~/assets/images'

import classNames from 'classnames/bind'
import styles from './AvailableRooms.module.scss'

const cx = classNames.bind(styles)

function AvailableRooms() {
    
    return ( 
        <div className={cx('wrapper')}>
            Phòng đã đặt
        </div>
    );
}

export default AvailableRooms;