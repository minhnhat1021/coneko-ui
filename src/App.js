import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Fragment} from "react"
import { publicRoutes, privateRoutes, adminRoutes } from '~/routes'
import { MainLayout, AdminLayout } from '~/layouts'

import React from 'react'
import './App.css'
import AuthenticatedRoute from './routes/AuthenticatedRoute'
import AdminAuthenticatedRoute from './routes/AdminAuthenticatedRoute'
import { UserProvider } from '~/contexts/UserContext'
import { AdminProvider } from '~/contexts/AdminContext'


function App() {

    return (
        <AdminProvider>
        <UserProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            let Layout = MainLayout
                            
                            if(route.layout) {
                                Layout = route.layout 
                            }else if(route.layout === null) {
                                Layout = Fragment
                            }
                            
                            const Page = route.component
                            return <Route 
                            key={index} 
                            path={route.path} 
                            element={  
                                        <Layout>
                                            <Page /> 
                                        </Layout> 
                                    }
                            />
                            
                        })}
    
                        {privateRoutes.map((route, index) => {
                            let Layout = MainLayout
                            let SubLayout = Fragment

                            if(route.layout) {
                                Layout = route.layout 
                            }else if(route.layout === null) {
                                Layout = Fragment
                            }

                            if(route.subLayout) {
                                SubLayout = route.subLayout
                            }

                            const Page = route.component
                            return <Route 
                                key={index} 
                                path={route.path} 
                                element={<AuthenticatedRoute path={route.path}> 
                                            <Layout> 
                                                <SubLayout ><Page /></SubLayout>
                                            </Layout> 
                                        </AuthenticatedRoute>} 
                            />
                        })}
                        
                        {adminRoutes.map((route, index) => {
                            let Layout = AdminLayout
                            let SubLayout = Fragment

                            if(route.layout) {
                                Layout = route.layout 
                            }else if(route.layout === null) {
                                Layout = Fragment
                            }

                            if(route.subLayout) {
                                SubLayout = route.subLayout
                            }

                            const Page = route.component

                            return <Route 
                                key={index} 
                                path={route.path} 
                                element={<AdminAuthenticatedRoute path={route.path}>
                                            <Layout> 
                                                <SubLayout> <Page /> </SubLayout>
                                            </Layout>
                                        </AdminAuthenticatedRoute> } 
                            />
                        })}
                    </Routes>  
                </div>
            </Router>
        </UserProvider>
        </AdminProvider>

    )
}

export default App

