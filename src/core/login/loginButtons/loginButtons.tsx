import facebook from '../../../assets/facebook.png';
import apple from '../../../assets/apple.png';
import google from '../../../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase';
import { toast } from 'react-toastify';

export const LoginButtons = () => {
    const navigate = useNavigate();

    function signInByGoogle() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                const token = credential?.idToken;
                const { creationTime, lastSignInTime } = result.user.metadata;

                if (creationTime === lastSignInTime && user) {
                    await user.delete();
                    toast('Account with this email doesn\'t exist. Please sign up.');
                    return;
                }

                localStorage.setItem('token', token!);
                navigate('/');
            }).catch(() => {
            toast.error('Something went wrong. Try again later!');
        });
    }

    return (
        <div className='flex flex-col max-w-[28rem] w-full'>
            <button
                className='flex justify-center items-center bg-sky-700 border border-transparent text-white py-3 rounded-[40px] mb-2 hover:border-black'>
                <img className='w-6 mr-4' src={facebook} alt='facebook'/>
                ВОЙТИ ЧЕРЕЗ FACEBOOK
            </button>
            <button
                className='flex justify-center items-center bg-gray-800 border border-transparent text-white py-3 rounded-[40px] mb-2 hover:border-black'>
                <img className='w-6 mr-4' src={apple} alt='facebook'/>
                ВОЙТИ ЧЕРЕЗ APPLE
            </button>
            <button
                className='flex justify-center items-center border-gray-500 border text-gray-600 py-3 rounded-[40px] hover:border-black'
                onClick={signInByGoogle}>
                <img className='w-6 mr-4' src={google} alt='facebook'/>
                ВОЙТИ ЧЕРЕЗ GOOGLE
            </button>
        </div>
    )
}
