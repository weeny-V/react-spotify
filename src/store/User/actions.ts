import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    fetchSignInMethodsForEmail,
    linkWithCredential,
    unlink
} from 'firebase/auth';
import { auth } from '../../firebase';
import { setLoadingOff, setLoadingOn } from '../Main/actions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface UserSignup {
    email: string;
    password: string;
    fullName: string;
}

interface UserLogin {
    email: string;
    password: string;
    remember: boolean;
}

interface AuthProvider {
    provider: GoogleAuthProvider | FacebookAuthProvider;
    provider_name: string;
}

interface AuthError {
    code: string;
}

export const thunkSignupUser = createAsyncThunk(
    'user/signupUser',
    async (user: UserSignup, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoadingOn());

            const response = await createUserWithEmailAndPassword(auth, user.email, user.password);

            if (response.user) {
                await updateProfile(auth.currentUser!, {
                    displayName: user.fullName
                });
            }
        } catch (e) {
            const error = e as AuthError;

            return thunkAPI.rejectWithValue(error.code);
        } finally {
            thunkAPI.dispatch(setLoadingOff());
        }
    }
);

export const thunkLoginUser = createAsyncThunk(
    'user/loginUser',
    async (user: UserLogin, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoadingOn());

            const response = await signInWithEmailAndPassword(auth, user.email, user.password);

            if (response.user) {
                const userInfo = response.user;
                const token = await userInfo.getIdToken();

                localStorage.setItem('token', token);

                return {
                    email: userInfo.email,
                    fullName: userInfo.displayName
                };
            }
        } catch (e) {
            const error = e as AuthError;

            return thunkAPI.rejectWithValue(error.code);
        } finally {
            thunkAPI.dispatch(setLoadingOff());
        }
    }
);

export const thunkSignupByGoogleOrFacebook = createAsyncThunk(
    'user/signupBySocialMedia',
    async (provider: GoogleAuthProvider | FacebookAuthProvider, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoadingOn());

            const response = await signInWithPopup(auth, provider);

            if (response.user) {
                const user = response.user;
                console.log(user);
                const { creationTime, lastSignInTime } = response.user.metadata;

                if (creationTime !== lastSignInTime) {
                    return thunkAPI.fulfillWithValue('1');
                } else {
                    await user.delete();

                    return thunkAPI.fulfillWithValue({
                        email: user.email,
                        displayName: user.displayName
                    });
                }
            }
        } catch (e) {
            console.log(e);

            return thunkAPI.rejectWithValue('Something went wrong. Try again later!');
        } finally {
            thunkAPI.dispatch(setLoadingOff());
        }
    }
);

export const thunkLoginUserByGoogleOrFacebook = createAsyncThunk(
    'user/loginBySocialMedia',
    async (method: AuthProvider, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoadingOn());
            method.provider.addScope('email');

            const response = await signInWithPopup(auth, method.provider);
            await unlink(auth.currentUser!, response.providerId!);

            if (response.user) {
                const credential =
                    method.provider_name === 'GOOGLE'
                        ? GoogleAuthProvider.credentialFromResult(response)
                        : FacebookAuthProvider.credentialFromResult(response);
                const user = response.user;
                const token = credential?.idToken;
                const { creationTime, lastSignInTime } = response.user.metadata;
                console.log(user, 'sfsdfsdfsdfdsfsd');

                if (creationTime === lastSignInTime && user) {
                    await user.delete();

                    return thunkAPI.rejectWithValue(
                        "Account with this email doesn't exist. Please sign up."
                    );
                }

                localStorage.setItem('token', token!);

                return {
                    email: user.email,
                    fullName: user.displayName
                };
            }
        } catch (e) {
            const error = e as any;

            if (error.code === 'auth/account-exists-with-different-credential') {
                const pendingCard = error.credential;
                console.log(pendingCard);
            }

            return thunkAPI.rejectWithValue(error.code);
        } finally {
            thunkAPI.dispatch(setLoadingOff());
        }
    }
);
