import { forwardRef, useEffect, useState } from 'react'
import axios from 'axios'

import { WarningIcon, ShowPassword, HidePassword, Loading } from '~/components/Icons'

import classNames from 'classnames/bind'
import styles from './LoginRegister.module.scss'

const cx = classNames.bind(styles)

const  Login = forwardRef(({ onClick, showModal, clickModal, clickContentModal , onDataLogin }, ref) => {
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
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('http://localhost:5000/api/login', {
            userName,
            password
        })

        .then((res) => {
            const resultLogin = document.getElementById('resultLogin')
            resultLogin.innerText = res.data.msg ? res.data.msg : ''
            if(res.data.token) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data.userId)
                onDataLogin(localStorage.getItem('token'))
            }
            setLoading(false)

        })

        .catch((err) => console.error(err) )  
    }
    
    return ( 
        <div ref={ref} id='login' className={cx('login__modal', {showModal}) } onClick={clickModal}>
            <div className={cx('login__modal-container')} onClick={clickContentModal}>
                <div className={cx('login__modal-content')}>
                    <header className={cx('login__content-header')}>
                        <h1 className={cx('login__content-title')}>Đăng nhập vào conkeko</h1>
                        <p className={cx('login__content-sugges')}>Đăng nhập để trải nhiệm những dịch vụ và tiện ích mà mà chúng tôi đem lại cho bạn</p>
                    </header>
                    <main className={cx('login__content-body')}>
                        <form onSubmit={handleSubmit} className={cx('login__content-list')}>
                            <div className={cx('login__content-item')}>
                                <label htmlFor="username">Tên đăng nhập</label>
                                <div className={cx('login__wrap-input')}>
                                    <input type="text" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Email hoặc Username" required />
                                    <div className={cx('login__right-icon')}>
                                        <WarningIcon/>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('login__content-item')}>
                                <label htmlFor="password">Mật Khẩu</label>
                                <div className={cx('login__wrap-input')}>
                                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật Khẩu" required />
                                    <div fc='password' className={cx('login__right-icon')} onClick={(e) => handleTogglePassword(e)}>
                                        {isShowPass ? <ShowPassword /> : <HidePassword/>}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('login__content-item', 'check-remember')}>
                                <input type="checkbox" id="remember" name="remember" checked=""/>
                                <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                            </div>
                            <span id="resultLogin" className={cx('result-login')}></span>
                            <div className={cx('login__content-btn')}>
                                <button type="submit">{loading ? <span ><Loading /></span> : 'Đăng nhập' }</button>
                            </div>
                        </form>
                    </main>
                    <footer className={cx('login__content-footer')}>
                        <p className={cx('login__content__sugges-regis')}>
                            Bạn chưa có tài khoản?
                            <a href='#' onClick={onClick}>Đăng ký</a>
                        </p>
                        <a href='/'>Quên mật khẩu?</a>
                        <p className={cx('login__content__sugges-about')}>
                            Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                            <a href="/"> điều khoản sử dụng </a>
                            của chúng tôi.
                        </p>
                    </footer>
                </div>                  
            </div>
        </div>
    )
})

export default Login