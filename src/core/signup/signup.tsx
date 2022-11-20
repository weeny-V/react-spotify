import logoSpotify from '../../assets/logo-spotify.png';
import { NavLink } from 'react-router-dom';
import { SignupButtons } from './signupButtons/signupButtons';
import { SignupForm } from './signupForm/signupForm';

export const Signup = () => {
    return (
        <div className='flex flex-col items-center mb-24 px-2'>
            <header className='flex justify-center p-10 w-full'>
                <img className='w-36' src={logoSpotify} alt='spotify' />
            </header>

            <p className='font-black text-3xl max-w-96 w-full text-center mb-12'>
                Зарегистрируйтесь и слушайте бесплатно
            </p>

            <SignupButtons />

            <div className='flex items-center max-w-[24rem] w-full my-4'>
                <div className='w-full h-0.5 bg-gray-300'></div>
                <span className='mx-3'>или</span>
                <div className='w-full h-0.5 bg-gray-300'></div>
            </div>

            <p className='text-lg font-bold mb-4'>Укажите электронную почту и пароль</p>

            <SignupForm />

            <div className='flex'>
                <p className='mr-2'>Уже есть аккаунт?</p>
                <NavLink className='text-green-500 underline' to='/login'>
                    Войти
                </NavLink>
            </div>
        </div>
    );
};
