import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Button } from 'antd';
import * as userService from '~/apiServices/userService'
import classNames from 'classnames/bind'
import styles from './PersonalSecurity.module.scss'

const cx = classNames.bind(styles)

function Personal({ userData }) {
    const user = userData
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        form.setFieldsValue({
          fullName: userData.fullName,
          userName: userData.userName,
          email: userData.email,
          phone: userData.phone,
        })
      }, [open, form, userData])

    const handleModal = () => {
        setOpen(true)
    }
    const handleSave = async() => {
        const values = form.getFieldsValue()
        const res = await userService.userUpdateInfo(userData?._id, values)
        if(res?.status === 200) {
            window.location.reload()
            setOpen(false)
        }
    }

    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <p className={cx('header__des')}>
                    Quản lý thông tin cá nhân của bạn.
                </p>
            </header>
            <section className={cx('container')}>
                <div className={cx('container__header')}>
                    <h2 className={cx('container__header-title')}>Thông tin cơ bản</h2>
                    <p className={cx('container__header-desc')}>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</p>
                </div>
                <div className={cx('content')}>
                    <nav className={cx('nav')} onClick={handleModal}>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Họ và tên</h4>
                            <p className={cx('nav__item-info')}>{user?.fullName}</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Tên người dùng</h4>
                            <p className={cx('nav__item-info')}>{user?.userName}</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>email</h4>
                            <p className={cx('nav__item-info')}>{user?.email}</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Số điện thoại</h4>
                            <p className={cx('nav__item-info')}>{user?.phone || 'Thêm số điện thoại'}</p>
                        </div>
                    </nav>
                </div>
            </section>

            <Modal
                title="Chỉnh sửa thông tin"
                open={open}
                onCancel={() => setOpen(false)}
                onOk={handleSave}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Họ tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        style={{color: 'white'}}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên người dùng"
                        name="userName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
                </Modal>
            {/* <section className={cx('container')}>
                <div className={cx('container__header')}>
                    <h2 className={cx('container__header-title')}>Tài khoản đã Liên kết</h2>
                    <p className={cx('container__header-desc')}>Quản lý liên kết tới các trang mạng xã hội của bạn.</p>
                </div>
                <div className={cx('content')}>
                    <nav className={cx('nav')}>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Facebook</h4>
                            <p className={cx('nav__item-info')}>{user?.facebook || 'Bạn chưa liên kết facebook'}</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Google</h4>
                            <p className={cx('nav__item-info')}>{user?.google || 'Bạn chưa liên kết google'}</p>
                        </div>
                    </nav>
                </div>
            </section> */}
        </div>
    )
}

export default Personal