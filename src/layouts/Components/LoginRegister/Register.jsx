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

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Your submit logic here,

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

    const [invalid, setInvalid] = useState(false)
    const Validator = (formSelector) => {

        const formRules = {}
        const validatorRules = {
            required: function (value) {
                return value ? undefined : 'Vui lòng nhập trường này'
            },
            email: function (value) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                return emailRegex.test(value) ? undefined : 'Vui lòng nhập email'
            },
            min: function (min) {
                return function (value) {
                    return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự `
                }
            },
        }
        // Lấy ra form register
        var formSelector = document.querySelector(formSelector)


        // Xử lý khi có form register
        if(formSelector){
            var inputs = formSelector.querySelectorAll('[name][rules]')

            // Thực hiện validator
            const handleValidator = (e) => {
                setInvalid(false)
                var rules = formRules[e.target.name]
                var errorMessage
                rules.find(function (rule) {
                    errorMessage = rule(e.target.value)
                    return errorMessage
                })

                if(errorMessage) {
                    var parentElement = e.target.parentElement.parentElement
                    if(parentElement) {
                        setInvalid(true)
                        var contentMessage = parentElement.querySelector('.error__message')
                        if(contentMessage) {
                            contentMessage.innerText = errorMessage
                        }
                    }
                }
            }

            // Clear message lỗi
            const handleClear = (e) => {

                var parentElement = e.target.parentElement.parentElement
                var contentMessage = parentElement.querySelector('.error__message')
                if(contentMessage) {
                    contentMessage.innerText = ''
                    // setInvalid(false)
                }
            }

            for(var input of inputs) {
                var rules = input.getAttribute('rules').split('|')
                
                for(var rule of rules) {
                    var isRuleHasValue = rule.includes(':')
                    var ruleInfo 

                    if(isRuleHasValue){
                        ruleInfo = rule.split(':')
                        rule = ruleInfo[0]
                    }

                    var ruleFunc = validatorRules[rule]
                    if(isRuleHasValue) {
                        ruleFunc = ruleFunc(ruleInfo[1])
                    }

                    if(Array.isArray(formRules[input.name])){
                        formRules[input.name].push(ruleFunc)
                    } else {
                        formRules[input.name] = [ruleFunc]
                    }
                }

                input.onblur = handleValidator
                input.onchange = handleClear
            }
            
        }

    }
    useEffect(() => {
        Validator('#register-form')
    },[])   
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
                                <div className={cx('login__wrap-input', { invalid: invalid })}>
                                    <input type="text" name='fullName' rules='required' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Họ và tên của bạn" required />
                                    <div className={cx('login__right-icon')}>
                                        <WarningIcon />
                                    </div>
                                </div>
                                <span className={cx('error__message', { invalid: invalid })}></span>
                            </div>
                            <div className={cx('login__content-item')}>
                                <label htmlFor="email">Email của bạn</label>
                                <div className={cx('login__wrap-input')}>
                                    <input type="text" name='email' rules='required|email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Địa chỉ email" required />
                                    <div className={cx('login__right-icon')}>
                                        <WarningIcon/>
                                    </div>
                                </div>
                                <span className={cx('error__message')}></span>
                            </div>
                            <div className={cx('login__content-item')}>
                                <label htmlFor="password">Mật Khẩu</label>
                                <div className={cx('login__wrap-input')}>
                                    <input type="password" name='password' rules='required|min:6' id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật Khẩu" required />
                                    <div fc='password' className={cx('login__right-icon')} onClick={(e) => handleTogglePassword(e)}>
                                        {isShowPass ? <ShowPassword /> : <HidePassword/>}
                                    </div>
                                </div>
                                <span className={cx('error__message')}></span>
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