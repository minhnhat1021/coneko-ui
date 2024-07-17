

import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";

import { Fragment, useEffect } from "react";

import { publicRoutes, privateRoutes } from '~/routes'
import { MainLayout } from '~/layouts';

import React, { Component } from 'react';
import axios from 'axios'



function App() {
        
    // useEffect(() => {
        
    //     const authRoute = publicRoutes.find(route => route.isAuth)
    //     console.log(authRoute)
    //     if (authRoute.path === '/about' ) {
    //         const token = localStorage.getItem('token');
    //         const userId = localStorage.getItem('userId');

    //         axios.post('http://localhost:5000/api/about', {
    //             token,
    //             id: userId
    //         })
    //         .then((res) => {
    //             console.log(res);
    //             // Nếu xác thực thành công, có thể xử lý redirect ở đây
    //             // Ví dụ: window.location.href = '/about';
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });      
  
    //     } 
    // }, []);
    return (
        
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
                        return <Route key={index} path={route.path} element={<Layout> <Page /> </Layout>} />
                    })}

                    {privateRoutes.map((route, index) => {
                        let Layout = MainLayout
                        
                        if(route.layout) {
                            Layout = route.layout 
                        }else if(route.layout === null) {
                            Layout = Fragment
                        }
                        
                        const Page = route.component
                        return <Route key={index} path={route.path} element={<Layout> <Page /> </Layout>} />
                    })}
                </Routes>  
            </div>
        </Router>
    );
}

export default App;

