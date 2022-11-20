export interface ISignupForm {
    email: string,
    confirmEmail: string,
    password: string,
    name: string,
    day: string,
    month: string,
    year: string,
    policy: string[],
}

export interface IUser {
    email: string,
    displayName: string,
}

export interface SignupInputs {
    email: string,
    confirmEmail: string,
    password: string,
    name: string,
    day: string,
    month: string,
    year: string,
    sex: string,
    policy: boolean,
}

export interface LoginInputs {
    email: string;
    password: string;
    remember: boolean;
}

export interface UserState {
    email: string;
    fullName: string;
}

export interface MainState {
    loading: boolean;
}
