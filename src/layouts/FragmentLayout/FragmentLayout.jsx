import React from 'react'

import classNames from 'classnames/bind'
import styles from './FragmentLayout.module.scss'

const cx = classNames.bind(styles)

function FragmentLayout({ children, userData }) {
    
    return ( 
        <>
            {!userData ? children :  React.cloneElement(children, { userData })}
        </>
    )
}

export default FragmentLayout