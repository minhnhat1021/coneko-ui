import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button, Input, Form, message } from "antd";
import * as authService from '~/apiServices/authService'

import { GoogleLogin } from '@react-oauth/google'
import FacebookLogin from 'react-facebook-login'
import { WarningIcon, ShowPassword, HidePassword, Loading } from '~/components/Icons'

import classNames from 'classnames/bind'
import styles from './LoginRegister.module.scss'

const cx = classNames.bind(styles)

function  Login  () {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const [isShowPass, setIsShowPass] = useState(true)
    const handleTogglePassword = (e) => {
        
        const toogleBtn = e.currentTarget
        
        const id = toogleBtn.getAttribute('fc')
        const inputFocus = document.getElementById(id)
        if(inputFocus.getAttribute('type') === 'password'){
            inputFocus.setAttribute('type', 'text')
            setIsShowPass(false)
        } else if(inputFocus.getAttribute('type') === 'text') {
            inputFocus.setAttribute('type', 'password')
            setIsShowPass(true)
        }
    }

    // Xử lý post lên backend khi login
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        const res = await authService.login(userName, password)
        
        const resultLogin = document.getElementById('resultLogin')
        resultLogin.innerText = res?.msg ? res?.msg : ''
        
        if(res?.token) {
            localStorage.setItem('token', res?.token)

            window.location.href = '/'
        }
        setLoading(false)

    }
    // Login Google
    const handleLoginSuccess = async (res) => {
        const credential = res.credential
        const result = await authService.googleLogin(credential)

        const resultLogin = document.getElementById('resultLogin')
        resultLogin.innerText = result?.msg ? result?.msg : ''

        console.log(res)

        if(result?.token) {
            localStorage.setItem('token', result?.token)

            window.location.href = '/'
        }

    }
    
    const handleLoginFailure = (error) => {
        console.error('Đăng nhập bằng google thất bại:', error)
    }
    // fb
    const handleFacebookLogin = async (data) => {
        const accessToken = data.accessToken
        const result = await authService.facebookLogin(accessToken)

        const resultLogin = document.getElementById('resultLogin')
        resultLogin.innerText = result?.msg ? result?.msg : ''
        if(result?.token) {
            localStorage.setItem('token', result?.token)

            window.location.href = '/'
        }
        console.log(result)
    }

    const handleResetPassword = async() => {
        form.validateFields()
        const values = form.getFieldsValue()
        console.log(values)
        const res = await authService?.resetPassword(values)
        console.log(res)
        if(res?.status === 200) {
            message.success(res?.msg)
            setNewPassword(res?.newPassword)
        } else if(res?.status === 400){
            message.error(res?.msg)
        }
    }
    const validateIdentifier = (_, value) => {
        if (!value) {
          return Promise.reject(new Error("Vui lòng nhập số điện thoại hoặc email!"))
        }
    
        const isPhoneNumber = /^[0-9]{10,11}$/.test(value)
        const isEmail =
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
    
        if (isPhoneNumber || isEmail) {
          return Promise.resolve()
        }
    
        return Promise.reject(
          new Error("Vui lòng nhập số điện thoại hoặc email hợp lệ!")
        )
    }

    return ( 
        <div className={cx('wrapper') } >
            <div className={cx('container')} >
                <header className={cx('header')}>
                    <h1 >Đăng nhập vào conkeko</h1>
                    <p >Đăng nhập để trải nhiệm những dịch vụ và tiện ích mà mà chúng tôi đem lại cho bạn</p>
                </header>
                <main className={cx('body')}>
                    <form onSubmit={handleSubmit} className={cx('body__content')}>
                        <div className={cx('body__item')}>
                            <label htmlFor="username">Tên đăng nhập</label>
                            <div className={cx('login__wrap-input')}>
                                <input type="text" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Email hoặc Username" required />
                                <div className={cx('login__right-icon')}>
                                    <WarningIcon/>
                                </div>
                            </div>
                        </div>
                        <div className={cx('body__item')}>
                            <label htmlFor="password">Mật Khẩu</label>
                            <div className={cx('login__wrap-input')}>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật Khẩu" required />
                                <div fc='password' className={cx('login__right-icon')} onClick={(e) => handleTogglePassword(e)}>
                                    {isShowPass ? <ShowPassword /> : <HidePassword/>}
                                </div>
                            </div>
                        </div>
                        <div className={cx('body__item', 'check-remember')}>
                            <input type="checkbox" id="remember" name="remember" />
                            <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                        </div>
                        <span id="resultLogin" className={cx('result-login')}></span>
                        <div className={cx('login__content-btn')}>
                            <button type="submit">{loading ? <span ><Loading /></span> : 'Đăng nhập' }</button>
                        </div>

                        <div className={cx('wrap__google-btn')}>
                            <div className={cx('google__login-btn')}>
                                <GoogleLogin
                                    onSuccess={handleLoginSuccess}
                                    onFailure={handleLoginFailure}
                                    width='260px'
                                    height='1000px'
                                />
                            </div>
                        </div>
                        <div className={cx('facebook__login-btn')}>
                            <FacebookLogin
                                appId={process.env.REACT_APP_FB_CLIENT_ID}
                                autoLoad={true}
                                fields='name,email,password'
                                callback={handleFacebookLogin}
                            />
                        </div>

                    </form>
                </main>
                <footer className={cx('footer')}>
                    <p className={cx('footer__register')}>
                        Bạn chưa có tài khoản?
                        <Link to ='/register' >Đăng ký</Link>
                    </p>
                    <Button onClick={() => setIsModalOpen(true)} style={{marginTop: '10px'}}>Quên mật khẩu?</Button>
                    <p className={cx('footer__about')}>
                        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                        <a href="/hotel-rules"> điều khoản sử dụng </a>
                        của chúng tôi.
                    </p>
                </footer>
            </div>   
            <Modal
                title="Lấy lại mật khẩu"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null} // Tắt nút mặc định của Modal
            >
                <Form form={form} layout="vertical" name="forgotPasswordForm">
                    <Form.Item
                        label="Tên người dùng"
                        name="userName"
                        rules={[
                        { required: true, message: "Vui lòng nhập tên người dùng!" },
                        ]}
                    >
                        <Input placeholder="Nhập tên người dùng" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại hoặc Email"
                        name="identifier"
                        rules={[ {validator: validateIdentifier } ]}
                    >
                        <Input placeholder="Nhập số điện thoại hoặc email" />
                    </Form.Item>
                    
                    {newPassword && (
                        <Form.Item label="Mật khẩu mới">
                            <Input value={newPassword} readOnly />
                        </Form.Item>
                    )}
                    <Form.Item>
                        <Button
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={handleResetPassword}
                        >
                        Lấy lại mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>               
        </div>
    )
}

export default Login