import { useState, useEffect } from 'react'
import axios from 'axios'

import * as showService from '~/apiServices/showService'
import images from '~/assets/images'

import classNames from 'classnames/bind'
import styles from './StatisticsRoom.module.scss'

const cx = classNames.bind(styles)

function StatisticsRoom() {
    
    const [statistics, setStatistics] = useState({})

    console.log(statistics)

    useEffect(() => {
        const fetchApi = async () => {
            const result = await showService.statisticsRoom()
            setStatistics(result)
        }
        fetchApi()
    }, [])

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                <div className={cx('item', 'room')}>
                    <div className={cx('title')}>Tổng phòng</div>
                    <div className={cx('count')}>Số lượng: {statistics.available}</div>
                </div>
                <div className={cx('item', 'room')}>
                    <div className={cx('title')}>Còn trống</div>
                    <div className={cx('count')}>Số lượng: {statistics.available}</div>
                </div>
                <div className={cx('item', 'room')}>
                    <div className={cx('title')}>Đã đặt</div>
                    <div className={cx('count')}>Số lượng: {statistics.booked}</div>
                </div>
                <div className={cx('item', 'room')}>
                    <div className={cx('title')}>Đang sử dụng</div>
                    <div className={cx('count')}>Số lượng: {statistics.inUse}</div>
                </div>
                <div className={cx('item', 'room')}>
                    <div className={cx('title')}>Đã hủy</div>
                    <div className={cx('count')}>Số lượng: {statistics.canceled}</div>
                </div>

                <div className={cx('item', 'bed')}>
                    <div className={cx('title')}>Giường đơn</div>
                    <div className={cx('count')}>Số lượng: {statistics.singleBed}</div>
                </div>
                <div className={cx('item', 'bed')}>
                    <div className={cx('title')}>Giường đôi</div>
                    <div className={cx('count')}>Số lượng: {statistics.doubleBed}</div>
                </div>
                <div className={cx('item', 'bed')}>
                    <div className={cx('title')}>1 giường </div>
                    <div className={cx('count')}>Số lượng: {statistics.oneBed}</div>
                </div>
                <div className={cx('item', 'bed')}>
                    <div className={cx('title')}>2 giường </div>
                    <div className={cx('count')}>Số lượng: {statistics.twoBeds}</div>
                </div>
                <div className={cx('item', 'bed')}>
                    <div className={cx('title')}>3 giường </div>
                    <div className={cx('count')}>Số lượng: {statistics.threeBeds}</div>
                </div>

                <div className={cx('item', 'person')}>
                    <div className={cx('title')}>1 người </div>
                    <div className={cx('count')}>Số lượng: {statistics.onePerson}</div>
                </div>
                <div className={cx('item', 'person')}>
                    <div className={cx('title')}>2 người </div>
                    <div className={cx('count')}>Số lượng: {statistics.twoPeople}</div>
                </div>
                <div className={cx('item', 'person')}>
                    <div className={cx('title')}>3 người </div>
                    <div className={cx('count')}>Số lượng: {statistics.threePeople}</div>
                </div>

                <div className={cx('item', 'rating')}>
                    <div className={cx('title')}>4 sao </div>
                    <div className={cx('count')}>Số lượng: {statistics.fourStars}</div>
                </div>
                <div className={cx('item', 'rating')}>
                    <div className={cx('title')}>5 sao </div>
                    <div className={cx('count')}>Số lượng: {statistics.fiveStars}</div>
                </div>

                <div className={cx('item', 'smoking')}>
                    <div className={cx('title')}>Hút thuốc</div>
                    <div className={cx('count')}>Số lượng: {statistics.smoking}</div>
                </div>
            </div>
        </div>
    );
}

export default StatisticsRoom;