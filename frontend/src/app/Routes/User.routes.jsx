import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../layout/User/Dashboard/Dashboard';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';


const User = () => {
    
    return (
        <div id="main-wrapper" className="wallet-open show">
            {/* <Header /> */}
            <Sidebar />
            <div className="content-body" style={{ minHeight: '80vh' }}>
                <Routes>
                    <Route>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </div>

        </div>
    );
};

export default User;
