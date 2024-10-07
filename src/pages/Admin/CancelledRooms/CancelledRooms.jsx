import { useState, useEffect } from 'react'

import images from '~/assets/images'

import classNames from 'classnames/bind'
import styles from './CancelledRooms.module.scss'

const cx = classNames.bind(styles)

function CancelledRooms() {
    
    return ( 
        <div className={cx('wrapper')}>
            Phòng đã hủy đặt
        </div>
    )
}

export default CancelledRooms