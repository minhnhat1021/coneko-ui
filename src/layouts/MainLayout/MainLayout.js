import styles from './MainLayout.module.scss'

import Header from '~/layouts/Components/Header'
import Footer from '~/layouts/Components/Footer'

function MainLayout({children}) {
    return ( 
        <div>
            <Header/>

            <div ClassName='container'>
                <div className='content'>
                    {children}
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default MainLayout;