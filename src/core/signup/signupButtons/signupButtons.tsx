import facebook from '../../../assets/facebook.png';
import google from '../../../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase';
import { toast } from 'react-toastify';

export const SignupButtons = () => {
    const navigate = useNavigate();

    function signupBySocialMedia(provider: any) {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const user = result.user;
          const { creationTime, lastSignInTime } = result.user.metadata;

          if (creationTime !== lastSignInTime) {
            toast('Account with this email already exist. You can log in.');
            navigate('/login');
          } else {
            navigate(`/signup?email=${user.email}&fullName=${user.displayName}`)
            await user.delete();
          }
        })
        .catch(() => {
          toast.error('Something went wrong. Try again later!');
        })
    }

    return (
        <div className='flex flex-col max-w-[24rem] w-full'>
            <button
                className='flex justify-center items-center bg-sky-700 border border-transparent text-white w-full py-2.5 rounded-[40px] mb-8 hover:scale-105'
                onClick={() => signupBySocialMedia(new FacebookAuthProvider())}>
                <img className='w-6 mr-4' src={facebook} alt='facebook'/>
                ЗАРЕГИСТРИРУЙТЕСЬ ЧЕРЕЗ FACEBOOK
            </button>
            <button
                className='flex justify-center items-center border-gray-500 border-2 text-gray-600 w-full py-2.5 rounded-[40px] hover:scale-105'
                onClick={() => signupBySocialMedia(new GoogleAuthProvider())}>
                <img className='w-6 mr-4' src={google} alt='facebook'/>
                ЗАРЕГИСТРИРУЙТЕСЬ ЧЕРЕЗ GOOGLE
            </button>
        </div>
    );
};
