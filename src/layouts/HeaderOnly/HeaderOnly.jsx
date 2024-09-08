import styles from './HeaderOnly.module.scss'

import Header from '~/layouts/Components/Header'

function HeaderOnly({children}) {
    return ( 
        <div>
            <Header/>

            <div ClassName='container'>
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default HeaderOnly