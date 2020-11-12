

export const SET_USER = ' SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCESS = 'SET_SUCCESS';


//// Defining user ==>

export interface User {
    firstName: string;
    email:string;
    id: string;
    createdAt:any;
}

/// ==> State Total

export interface AuthState {
    user: User | null; /// <===  defined Top
    authenticated: boolean;
    loading:boolean;
    error:string;
    needVerification:boolean;   
    success:string;
}

/// signUp

export interface SignUpData {
    firstName:string;
    email:string;
    password:string;
}

//Signin

export interface SigninData {
    email:string;
    password:string;
}





