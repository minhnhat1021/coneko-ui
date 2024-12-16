import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Button ,message } from 'antd';
import * as userService from '~/apiServices/userService'

import classNames from 'classnames/bind'
import styles from './PersonalSecurity.module.scss'

const cx = classNames.bind(styles)

function Security({ userData }) {

    const user = userData
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)

    const handleModal = () => {
        setOpen(true)
    }
    const handleSave = async() => {
        const values = form.getFieldsValue()
        const res = await userService.userUpdatePassword(userData?._id, values)
        if(res?.status === 200) {
            message.success(res?.msg)
            window.location.reload()
            setOpen(false)
            return
        } if(res?.status === 400) {
            message.error(res?.msg)
            return
        }
    }
    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <p className={cx('header__des')}>
                    Quản lý mật khẩu và cài đặt bảo mật.
                </p>
            </header>
            <section className={cx('container')}>
                <div className={cx('container__header')}>
                    <h2 className={cx('container__header-title')}>Đăng nhập & khôi phục</h2>
                    <p className={cx('container__header-desc')}>Quản lý mật khẩu và xác minh 2 bước.</p>
                </div>
                <div className={cx('content')}>
                    <nav className={cx('nav')}>
                        <div className={cx('nav__item')} onClick={handleModal}>
                            <h4 className={cx('nav__item-title')}>Đổi mật khẩu</h4>
                            <p className={cx('nav__item-info')}>Chưa đổi mật khẩu</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Xác minh 2 bước</h4>
                            <p className={cx('nav__item-info')}>Đang tắt</p>
                        </div>
                        
                    </nav>
                </div>
            </section>

            <Modal
                title="Đổi mật khẩu"
                open={open}
                onCancel={() => setOpen(false)}
                onOk={handleSave}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        style={{color: 'white'}}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
                </Modal>
        </div>
    )
}

export default Security