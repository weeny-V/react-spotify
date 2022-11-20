import facebook from '../../../assets/facebook.png';
import google from '../../../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../store/store';
import { thunkSignupByGoogleOrFacebook } from '../../../store/User/actions';
import { PayloadAction } from '@reduxjs/toolkit';

export const SignupButtons = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    async function signupBySocialMedia(provider: GoogleAuthProvider | FacebookAuthProvider) {
        try {
            const res: PayloadAction<any> = await dispatch(thunkSignupByGoogleOrFacebook(provider));

            if (res.payload === '1') {
                toast('Account with this email already exist. You can log in.');
                navigate('/login');
            } else {
                navigate(`/signup?email=${res.payload.email}&fullName=${res.payload.displayName}`);
            }
        } catch (e) {
            console.log(e);
            toast.error('Something went wrong try again later');
        }
    }

    return (
        <div className='flex flex-col max-w-[24rem] w-full'>
            <button
                className='flex justify-center items-center bg-sky-700 border border-transparent text-white w-full py-2.5 rounded-[40px] mb-8 hover:scale-105'
                onClick={() => signupBySocialMedia(new FacebookAuthProvider())}
            >
                <img className='w-6 mr-4' src={facebook} alt='facebook' />
                ЗАРЕГИСТРИРУЙТЕСЬ ЧЕРЕЗ FACEBOOK
            </button>
            <button
                className='flex justify-center items-center border-gray-500 border-2 text-gray-600 w-full py-2.5 rounded-[40px] hover:scale-105'
                onClick={() => signupBySocialMedia(new GoogleAuthProvider())}
            >
                <img className='w-6 mr-4' src={google} alt='facebook' />
                ЗАРЕГИСТРИРУЙТЕСЬ ЧЕРЕЗ GOOGLE
            </button>
        </div>
    );
};
