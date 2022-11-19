import warning from '../../../assets/warning.png';
import { NavLink } from 'react-router-dom';

export const LoginForm = () => {
    return (
        <form className='flex flex-col items-center max-w-[28rem]'>
            <label htmlFor='login-email' className='flex flex-col w-full mb-1 text-[14px] font-bold'>
                Эл. почта или имя пользователя
            </label>
            <input
                className='px-4 py-3 w-full border my-2'
                id='login-email'
                type='text'
                name='email'
                placeholder='Эл. почта или имя пользователя'/>
            <div className='flex text-xs text-red-500 self-start mb-2'>
                <img className='w-4 h-4 mt-0.5 mr-2' src={warning} alt='warning'/>
                <p>Введите имя пользователя или адрес электронной почты из аккаунта Spotify.</p>
            </div>

            <label htmlFor='login-password' className='flex flex-col w-full mb-1 text-[14px] font-bold'>
                Пароль
            </label>
            <input
                className='px-4 py-3 w-full border my-2'
                id='login-password'
                type='text'
                name='password'
                placeholder='Пароль'/>
            <div className='flex text-xs text-red-500 self-start mb-2'>
                <img className='w-4 h-4 mr-2' src={warning} alt='warning'/>
                <p>Введите пароль.</p>
            </div>

            <NavLink className='self-start mb-4 hover:underline' to=''>Забыли пароль?</NavLink>

            <label className='flex items-center self-start hover:cursor-pointer'>
                <input className='mr-2 hover:cursor-pointer' type='checkbox'/>
                Запомнить меня
            </label>
            <button
                className='self-end bg-green-500 px-8 py-3 rounded-3xl hover:bg-green-400 hover:scale-105'>ВОЙТИ
            </button>
        </form>
    )
}
