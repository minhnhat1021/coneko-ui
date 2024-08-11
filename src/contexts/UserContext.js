import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const fetchUserData = (path) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            axios.post(`http://localhost:5000/api${path}`, { token, userId })
                .then(res => {
                    setUserData(prevState => ({
                        ...prevState,
                        data: res.data.userData
                    }))
                    setLoading(false)

                })
                .catch(error => {
                    console.error(`Tạm thời không thể truy cập vào đường dẫn ${path}:`, error)
                })
        }
       
    }
    return (
        <UserContext.Provider value={{loading, userData, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};