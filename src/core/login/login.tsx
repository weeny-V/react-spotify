import logoSpotify from '../../assets/logo-spotify.png';
import { NavLink } from 'react-router-dom';
import { LoginForm } from './loginForm/loginForm';
import { LoginButtons } from './loginButtons/loginButtons';

export const Login = () => {
    return (
        <div className='flex flex-col'>

            <header className='flex justify-center p-6 border-b-2 w-full'>
                <img className='w-44' src={logoSpotify} alt='spotify'/>
            </header>

            <div className='flex flex-col items-center px-2'>
                <p className='my-5 font-medium'>Чтобы продолжить, войдите в <span
                    className='font-black'>React Spotify</span>.</p>

                <LoginButtons/>

                <div className='flex items-center justify-between max-w-[28rem] w-full my-4'>
                    <div className='w-full h-0.5 bg-gray-300'></div>
                    <span className='mx-3'>или</span>
                    <div className='w-full h-0.5 bg-gray-300'></div>
                </div>

                <LoginForm/>

                <div className='max-w-[32rem] w-full h-0.5 bg-gray-300 my-6'></div>

                <p className='text-xl font-bold mb-2'>Нет аккаунта?</p>
                <NavLink
                    className='flex justify-center items-center border-gray-500 border text-gray-500 max-w-[28rem] w-full py-3 rounded-[40px] font-bold hover:border-black'
                    to='/signup'>
                    РЕГИСТРАЦИЯ В REACT SPOTIFY
                </NavLink>
            </div>

        </div>
    )
};
