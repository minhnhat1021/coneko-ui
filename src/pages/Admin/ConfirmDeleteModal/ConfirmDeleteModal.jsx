// ConfirmDeleteModal.js
import React from 'react'

import classNames from 'classnames/bind'
import styles from './ConfirmDeleteModal.module.scss'

const cx = classNames.bind(styles)

const ConfirmDeleteModal = ({ show, onClose, onConfirm, title }) => {
    if (!show) return null

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2>Xác nhận xóa vĩnh viễn </h2>
                <p>Bạn có chắc chắn muốn xóa {title} này không?</p>
                <div className={cx('btn')}>
                    <button onClick={onConfirm}>Xóa</button>
                    <button onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal