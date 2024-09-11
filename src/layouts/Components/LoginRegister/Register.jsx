import { forwardRef, useState, useEffect } from 'react'
import axios from 'axios'
import { WarningIcon, ShowPassword, HidePassword, Loading } from '~/components/Icons'

import classNames from 'classnames/bind'
import styles from './LoginRegister.module.scss'

const cx = classNames.bind(styles)

const Register = forwardRef(({ onClick, showModal, clickModal, clickContentModal, onDataLogin }, ref) => {

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

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    // Validator form register
    const [inputStates, setInputStates] = useState({
        fullName: false,
        email: false,
        password: false,
    })

    // Thực hiện Validator
    const handleValidator = (e) => {
        const formRules = {
            fullName: [value => value ? undefined : 'Vui lòng nhập trường này'],
            email: [
                value => value ? undefined : 'Vui lòng nhập trường này',
                value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? undefined : 'Vui lòng nhập email hợp lệ',
            ],
            password: [
                value => value ? undefined : 'Vui lòng nhập trường này',
                value => value.length >= 6 ? undefined : 'Vui lòng nhập tối thiểu 6 ký tự'
            ]
        }

        const rules = formRules[e.target.name]
        let errorMessage

        for(var rule of rules) {
            errorMessage = rule(e.target.value)
            if(errorMessage) break

        }

        if (errorMessage) {
            setInputStates((prevState) => ({
                ...prevState,
                [e.target.name]: true,
            }))
            const parentElement = e.target.parentElement.parentElement
            if (parentElement) {
                const contentMessage = parentElement.querySelector('.error__message')
                if (contentMessage) {
                    contentMessage.innerText = errorMessage
                }
            }
        }
        return !!errorMessage
    }

    // Hàm clear message lỗi
    const handleClear = (e) => {
        setInputStates((prevState) => ({
            ...prevState,
            [e.target.name]: false,
        }))
        const parentElement = e.target.parentElement.parentElement
        const contentMessage = parentElement.querySelector('.error__message')
        if (contentMessage) {
            contentMessage.innerText = ''
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Validator
        var formSelector = document.querySelector('#register-form')
        var inputs = formSelector.querySelectorAll('[name][rules]')
        var isValid = true

        for (var input of inputs) {
            // Nếu có lỗi
            if( handleValidator({target: input}) ) {
                isValid = false
            }       
        }
        if(isValid) {
            // Thực hiện đăng ký
            axios.post('http://localhost:5000/api/register', {
                fullName,
                email,
                password
            })  
                .then((res) => {
                    const resultRegister = document.getElementById('resultRegister')
                    resultRegister.innerText = res.data.msg ? res.data.msg : ''
                    if(res.data.token) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('userId', res.data.userId)
                        onDataLogin(localStorage.getItem('token') )
                    }
                    setLoading(false)
                })
                .catch((err) => console.error(err) )
        }
    }

    useEffect(() => {
        var formSelector = document.querySelector('#register-form')
        var inputs = formSelector.querySelectorAll('[name][rules]')
        for (var input of inputs) {
            input.onblur = handleValidator
            input.onfocus = handleClear
        }
    }, [])
    

    return ( 
        <div ref={ref} id='register' className={cx('register__modal', {showModal}) } onClick={clickModal}>
            <div className={cx('login__modal-container')} onClick={clickContentModal}>
                <div className={cx('login__modal-content', 'register')}>
                    <header className={cx('login__content-header')}>
                        <h1 className={cx('login__content-title')}>Đăng ký tài khoản conkeko</h1>
                        <p className={cx('login__content-sugges')}>Đăng nhập để trải nhiệm những dịch vụ và tiện ích mà mà chúng tôi đem lại cho bạn</p>
                    </header>
                    <main className={cx('login__content-body')}>
                        <form id='register-form' name='register-form' onSubmit={handleSubmit} className={cx('login__content-list')} >
                            <div className={cx('login__content-item')}>
                                <label htmlFor="fullname">Tên của bạn</label>
                                <div className={cx('login__wrap-input', { invalid: inputStates.fullName })}>
                                    <input type="text" name='fullName' rules='' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Họ và tên của bạn"  />
                                    <div className={cx('login__right-icon')}>
                                        <WarningIcon />
                                    </div>
                                </div>
                                <span className={cx('error__message', { invalid: inputStates.fullName })}></span>
                            </div>
                            <div className={cx('login__content-item')}>
                                <label htmlFor="email">Email của bạn</label>
                                <div className={cx('login__wrap-input', { invalid: inputStates.email })}>
                                    <input type="text" name='email' rules='' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Địa chỉ email"  />
                                    <div className={cx('login__right-icon')}>
                                        <WarningIcon/>
                                    </div>
                                </div>
                                <span className={cx('error__message', { invalid: inputStates.email })}></span>
                            </div>
                            <div className={cx('login__content-item')}>
                                <label htmlFor="password">Mật Khẩu</label>
                                <div className={cx('login__wrap-input', { invalid: inputStates.password })}>
                                    <input type="password" name='password' rules='' id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật Khẩu"  />
                                    <div fc='password' className={cx('login__right-icon')} onClick={(e) => handleTogglePassword(e)}>
                                        {isShowPass ? <ShowPassword /> : <HidePassword/>}
                                    </div>
                                </div>
                                <span className={cx('error__message', { invalid: inputStates.password })}></span>
                            </div>  
                            <span id="resultRegister" className={cx('result-register')}></span>
                            <div className={cx('login__content-btn')}>
                                <button type="submit">{loading ? <span ><Loading /></span> : 'Đăng ký' }</button>
                            </div>
                        </form>
                    </main>
                    <footer className={cx('login__content-footer')}>
                        <p className={cx('login__content__sugges-regis')}>
                            Bạn đã có tài khoản?
                            <a href="#" onClick={onClick}>Đăng nhập</a>
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

export default Register