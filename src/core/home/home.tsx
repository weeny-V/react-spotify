import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    const onClick = async () => {
        try {
            await signOut(auth);
            toast('logout');
            navigate('/login');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <button onClick={onClick}>logout</button>
        </div>
    );
};
