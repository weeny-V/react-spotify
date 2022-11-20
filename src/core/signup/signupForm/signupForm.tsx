import React from 'react';
import { SignupInputs } from '../../../types/main';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '../../../shared/ErrorMessage';
import './signupForm.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import If from '../../../shared/If';
import { thunkSignupUser } from '../../../store/User/actions';
import { toast } from 'react-toastify';

export const SignupForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state) => state.main);
    const [queries] = useSearchParams();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<SignupInputs>({
        mode: 'all'
    });
    const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
        try {
            await dispatch(
                thunkSignupUser({
                    email: data.email,
                    password: data.password,
                    fullName: data.name
                })
            );

            toast('Your account was successfully created.');
            navigate('/login');
        } catch (err) {
            toast('Something went wrong try again later');
        }
    };

    return (
        <form className='flex flex-col max-w-[28rem] w-full mb-4' onSubmit={handleSubmit(onSubmit)}>
            <label
                htmlFor='signup-email'
                className='flex flex-col w-full mb-1 text-[14px] font-bold'
            >
                Ваш адрес электронной почты.
            </label>
            <input
                className='px-4 py-3 w-full border my-2'
                id='signup-email'
                type='text'
                defaultValue={queries.get('email') || ''}
                {...register('email', {
                    required: 'Please enter your email',
                    pattern: {
                        value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                        message: "Email should be like 'example@gmail.com'"
                    }
                })}
                placeholder='Введите адрес электронной почты.'
            />
            {errors.email && <ErrorMessage message={errors.email.message!} />}

            <label
                htmlFor='signup-email-confirm'
                className='flex flex-col w-full mb-1 text-[14px] font-bold'
            >
                Подтвердите адрес электронной почты
            </label>
            <input
                className='px-4 py-3 w-full border my-2'
                id='signup-email-confirm'
                type='text'
                defaultValue={queries.get('email') || ''}
                {...register('confirmEmail', {
                    required: 'Please confirm your email',
                    validate: {
                        value: (value) => value === getValues('email') || "Your emails don't match"
                    }
                })}
                placeholder='Введите адрес электронной почты еще раз.'
            />
            {errors.confirmEmail && <ErrorMessage message={errors.confirmEmail.message!} />}

            <label
                htmlFor='signup-password'
                className='flex flex-col w-full mb-1 text-[14px] font-bold'
            >
                Придумайте пароль
            </label>
            <input
                className='px-4 py-3 w-full border my-2'
                id='signup=password'
                type='password'
                placeholder='Придумайте пароль'
                autoComplete='off'
                {...register('password', {
                    required: 'Please enter your password',
                    minLength: {
                        value: 8,
                        message: 'Password should be longer than 8 characters'
                    },
                    validate: {
                        onlyLatin: (value) =>
                            /[a-zA-Z]/g.test(value) ||
                            'Password should contain only latins letter and digits',
                        lowerLetter: (value) =>
                            /(?=.*[a-z])/.test(value) ||
                            'Password should contain at least one lower case letter',
                        upperLetter: (value) =>
                            /(?=.*[A-Z])/.test(value) ||
                            'Password should contain at least one upper case letter',
                        digit: (value) =>
                            /(?=.*\d)/.test(value) || 'Password should contain at least one digit'
                    }
                })}
            />
            {errors.password && <ErrorMessage message={errors.password.message!} />}

            <label
                htmlFor='signup-name'
                className='flex flex-col w-full mb-1 text-[14px] font-bold'
            >
                Ваше имя
            </label>
            <input
                className='px-4 py-3 w-full border my-2'
                id='signup-name'
                type='text'
                defaultValue={queries.get('fullName') || ''}
                {...register('name', {
                    required: 'Please enter your name'
                })}
                placeholder='Укажите свое имя'
            />
            {errors.name && <ErrorMessage message={errors.name.message!} />}

            <label
                className='flex flex-col w-full mb-1 text-[14px] font-bold'
                htmlFor='signup-birthday'
            >
                Ваша дата рождения
            </label>
            <div className='flex'>
                <input
                    className='px-4 py-3 w-full border my-2 mr-4'
                    id='signup-birthday'
                    type='number'
                    min={1}
                    max={31}
                    {...register('day', {
                        required: 'Please enter your birth day',
                        max: {
                            value: 31,
                            message: 'number should be not greater than 31'
                        },
                        onChange: (e) => {
                            if (e.target.value.length > 2 || !+e.target.value) {
                                e.target.value = e.target.value.replace(/.$/, '');
                            }
                        }
                    })}
                    placeholder='ДД'
                />
                <select
                    className='px-4 py-3 w-full border my-2 mr-4'
                    defaultValue={''}
                    {...register('month', {
                        required: 'Please select your birth month'
                    })}
                >
                    <option disabled={true} value=''>
                        Месяц
                    </option>
                    <option value='JAN'>Январь</option>
                    <option value='FEB'>Февраль</option>
                    <option value='MAR'>Март</option>
                    <option value='APR'>Апрель</option>
                    <option value='MAY'>Май</option>
                    <option value='JUN'>Июнь</option>
                    <option value='JUL'>Июль</option>
                    <option value='AUG'>Август</option>
                    <option value='SEP'>Сентябрь</option>
                    <option value='OCT'>Октябрь</option>
                    <option value='NOV'>Ноябрь</option>
                    <option value='DEC'>Декабрь</option>
                </select>
                <input
                    className='px-4 py-3 w-full border my-2 appearance-none'
                    type='number'
                    min={1900}
                    max={2022}
                    {...register('year', {
                        required: 'Please enter your birth year',
                        max: {
                            value: 2022,
                            message: 'Year cannot be greater than current year(2022)'
                        },
                        min: {
                            value: 1900,
                            message: 'Year cannot be lower than 1900'
                        },
                        onChange: (e) => {
                            if (e.target.value.length > 4 || !+e.target.value) {
                                e.target.value = e.target.value.replace(/.$/, '');
                            }
                        }
                    })}
                    placeholder='ГГГГ'
                />
            </div>
            {errors.day && <ErrorMessage message={errors.day.message!} />}
            {errors.month && <ErrorMessage message={errors.month.message!} />}
            {errors.year && <ErrorMessage message={errors.year.message!} />}

            <label className='flex flex-col w-full mb-1 text-[14px] font-bold'>
                Укажите свой пол
            </label>
            <div className='flex flex-col mb-8'>
                <div className='flex items-center'>
                    <input
                        className='mr-3'
                        id='man'
                        type='radio'
                        value='man'
                        {...register('sex', {
                            required: 'Please choose your sex'
                        })}
                    />
                    <label className='text-[14px] mr-6' htmlFor='man'>
                        Мужчина
                    </label>

                    <input
                        className='mr-3'
                        id='woman'
                        type='radio'
                        value='woman'
                        {...register('sex', {
                            required: 'Please choose your sex'
                        })}
                    />
                    <label className='text-[14px]' htmlFor='woman'>
                        Женщина
                    </label>
                </div>
                {errors.sex && <ErrorMessage message={errors.sex.message!} />}
            </div>

            <div className='flex items-start mb-4'>
                <input className='mt-1 mr-2' type='checkbox' id='signup-ads' />
                <label htmlFor='signup-ads'>
                    Я не хочу получать рекламные сообщения от Spotify.
                </label>
            </div>

            <div className='flex items-start mb-4'>
                <input className='mt-1 mr-2' type='checkbox' id='signup-info' />
                <label htmlFor='signup-info'>
                    Я разрешаю сообщить мои регистрационные данные партнерам Spotify в целях
                    рекламы.
                </label>
            </div>

            <div className='flex flex-col mb-8'>
                <div className='flex items-start'>
                    <input
                        className='mt-1 mr-2'
                        id='signup-policy'
                        type='checkbox'
                        {...register('policy', {
                            required: 'Please agree with our policy to continue your registration'
                        })}
                    />
                    <label htmlFor='signup-policy'>
                        Я принимаю Условия использования и Политику конфиденциальности Spotify.
                    </label>
                </div>
                {errors.policy && <ErrorMessage message={errors.policy.message!} />}
            </div>
            <button
                className='flex items-center self-center bg-green-500 px-8 py-3 rounded-3xl hover:bg-green-400 hover:scale-105 disabled:bg-green-300 disabled:text-gray-500'
                disabled={loading}
                type='submit'
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
                Зарегистрироваться
            </button>
        </form>
    );
};
