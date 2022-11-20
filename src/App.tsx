import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './core/login/login';
import { Signup } from './core/signup/signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './core/home/home';

function App() {
    return (
        <div className='App'>
            <ToastContainer
                position='top-center'
                theme='dark'
                autoClose={4000}
                closeOnClick={true}
            />
            <Routes>
                <Route path='' element={<Navigate to='home' />} />
                <Route path='home' element={<Home />}></Route>
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
