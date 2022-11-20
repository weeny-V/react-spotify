import facebook from '../../../assets/facebook.png';
import apple from '../../../assets/apple.png';
import google from '../../../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../store/store';
import { thunkLoginUserByGoogleOrFacebook } from '../../../store/User/actions';

export const LoginButtons = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    async function signInByGoogleOrFacebook(
        provider: GoogleAuthProvider | FacebookAuthProvider,
        provider_name: string
    ) {
        try {
            await dispatch(thunkLoginUserByGoogleOrFacebook({ provider_name, provider }));

            navigate('/home');
        } catch (e) {
            const error = e as Error;

            toast.error(error.message);
        }
    }

    return (
        <div className='flex flex-col max-w-[28rem] w-full'>
            <button
                className='flex justify-center items-center bg-sky-700 border border-transparent text-white py-3 rounded-[40px] mb-2 hover:border-black'
                onClick={() => signInByGoogleOrFacebook(new FacebookAuthProvider(), 'FACEBOOK')}
            >
                <img className='w-6 mr-4' src={facebook} alt='facebook' />
                ВОЙТИ ЧЕРЕЗ FACEBOOK
            </button>
            {/* <button className='flex justify-center items-center bg-gray-800 border border-transparent text-white py-3 rounded-[40px] mb-2 hover:border-black'> */}
            {/*     <img className='w-6 mr-4' src={apple} alt='facebook' /> */}
            {/*     ВОЙТИ ЧЕРЕЗ APPLE */}
            {/* </button> */}
            <button
                className='flex justify-center items-center border-gray-500 border text-gray-600 py-3 rounded-[40px] hover:border-black'
                onClick={() => signInByGoogleOrFacebook(new GoogleAuthProvider(), 'GOOGLE')}
            >
                <img className='w-6 mr-4' src={google} alt='facebook' />
                ВОЙТИ ЧЕРЕЗ GOOGLE
            </button>
        </div>
    );
};
