import { useState, useEffect } from 'react'


import images from '~/assets/images'

import classNames from 'classnames/bind'
import styles from './BookedRooms.module.scss'

const cx = classNames.bind(styles)

function BookedRooms() {
    
    return ( 
        <div className={cx('wrapper')}>
            Phòng đã đặt
        </div>
    )
}

export default BookedRooms