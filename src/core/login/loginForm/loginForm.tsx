import { NavLink, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import If from '../../../shared/If';
import React from 'react';
import { LoginInputs } from '../../../types/main';
import { ErrorMessage } from '../../../shared/ErrorMessage';
import { thunkLoginUser } from '../../../store/User/actions';
import { toast } from 'react-toastify';

export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginInputs>();
    const { loading } = useAppSelector((state) => state.main);
    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        try {
            await dispatch(
                thunkLoginUser({
                    email: data.email,
                    password: data.password,
                    remember: data.remember
                })
            );

            navigate('/home');
        } catch (e) {
            const error = e as Error;

            if (error.message === 'auth/account-exists-with-different-credential.') {
                toast.error(error.message);
            } else if (error.message === 'auth/user-not-found') {
                toast("User with such an email doesn't exist. Please sign up.");
            } else {
                toast.error('Wrong email or password.');
            }
        }
    };

    return (
        <form className='flex flex-col max-w-[28rem] w-full mb-4' onSubmit={handleSubmit(onSubmit)}>
            <label
                htmlFor='login-email'
                className='flex flex-col w-full mb-1 text-[14px] font-bold'
            >
                Эл. почта или имя пользователя
            </label>
            <input
                className='px-4 py-3 w-full border my-2'
                id='login-email'
                type='text'
                {...register('email', {
                    required: 'Please enter your email or username'
                })}
                placeholder='Эл. почта или имя пользователя'
            />
            {errors.email && <ErrorMessage message={errors.email.message!} />}

            <label
                htmlFor='login-password'
                className='flex flex-col w-full mb-1 text-[14px] font-bold'
            >
                Пароль
            </label>
            <input
                className='px-4 py-3 w-full border my-2'
                id='login-password'
                type='password'
                {...register('password', {
                    required: 'Please enter your password'
                })}
                placeholder='Пароль'
            />
            {errors.password && <ErrorMessage message={errors.password.message!} />}

            <NavLink className='self-start mb-4 hover:underline' to=''>
                Забыли пароль?
            </NavLink>

            <label className='flex items-center self-start hover:cursor-pointer'>
                <input
                    className='mr-2 hover:cursor-pointer'
                    type='checkbox'
                    {...register('remember')}
                />
                Запомнить меня
            </label>
            <button
                className='self-end bg-green-500 px-8 py-3 rounded-3xl hover:bg-green-400 hover:scale-105 disabled:bg-green-300 disabled:text-gray-500'
                disabled={loading}
            >
                <If condition={loading}>
                    <svg
                        role='status'
                        className='inline mr-3 w-6 h-6 text-white animate-spin'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                            fill='#E5E7EB'
                        />
                        <path
                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                            fill='currentColor'
                        />
                    </svg>
                </If>
                ВОЙТИ
            </button>
        </form>
    );
};
