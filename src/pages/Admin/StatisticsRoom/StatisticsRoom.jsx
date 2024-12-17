import { useState, useEffect } from 'react'

import * as managementService from '~/apiServices/managementServive'

import classNames from 'classnames/bind'
import styles from './StatisticsRoom.module.scss'

const cx = classNames.bind(styles)

function StatisticsRoom() {
    
    const [statistics, setStatistics] = useState({})
    console.log(statistics)

    useEffect(() => {
        const fetchApi = async () => {
            const result = await managementService.statisticsRoom()
            setStatistics(result)
        }   
        fetchApi()
    }, [])

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                <div className={cx('item', 'bed')}>
                    <div className={cx('icon', 'bed')}>
                        <i className={cx('fa-solid fa-bed')}></i>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('title')}>Giường đơn</div>
                        <div className={cx('count')}>Số lượng: {statistics.singleBed}</div>
                    </div>
                </div>
                <div className={cx('item', 'bed')}>
                    <div className={cx('icon', 'bed')}>
                        <i className={cx('fa-solid fa-bed')}></i>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('title')}>Giường đôi</div>
                        <div className={cx('count')}>Số lượng: {statistics.doubleBed}</div>
                    </div>
                </div>
                <div className={cx('item', 'bed__count')}>
                    <div className={cx('icon', 'bed__count')}>
                        <i className={cx('fa-solid fa-bed')}></i>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('title')}>1 giường </div>
                        <div className={cx('count')}>Số lượng: {statistics.oneBed}</div>
                    </div>
                </div>
                <div className={cx('item', 'bed__count')}>
                    <div className={cx('icon', 'bed__count')}>
                        <i className={cx('fa-solid fa-bed')}></i>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('title')}>2 giường </div>
                        <div className={cx('count')}>Số lượng: {statistics.twoBeds}</div>
                    </div>
                </div>
                <div className={cx('item', 'rating')}>
                    <div className={cx('icon', 'rating')}>
                        <i className={cx('fa-solid fa-star')}></i>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('title')}>5 sao </div>
                        <div className={cx('count')}>Số lượng: {statistics.fiveStars}</div>
                    </div>
                </div>
                <div className={cx('item', 'bed__count')}>
                    <div className={cx('icon', 'bed__count')}>
                        <i className={cx('fa-solid fa-bed')}></i>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('title')}>2 khách </div>
                        <div className={cx('count')}>Số lượng: {statistics.twoPeople} </div>
                    </div>
                </div>
                <div className={cx('item', 'bed__count')}>
                    <div className={cx('icon', 'bed__count')}>
                        <i className={cx('fa-solid fa-bed')}></i>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('title')}>4 khách</div>
                        <div className={cx('count')}>Số lượng: {statistics.fourPeople} </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatisticsRoom