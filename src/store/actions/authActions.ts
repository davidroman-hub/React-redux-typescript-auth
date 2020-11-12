
import {ThunkAction} from 'redux-thunk';
import {

    SignUpData,
    AuthAction, // Remember this action have inside this :== SetUserAction | SetLoadingAction | SetErrorAction | NeedVerificationAction | SignOutAction  | SetSuccessAction;
    User,
    SigninData,

    SET_USER,
    SET_LOADING,
    SET_ERROR,
    NEED_VERIFICATION,
    SET_SUCCESS,
    SIGN_OUT

} from '../types'; /// we need to bring the types for the actions 

import { RootState} from '../index';
import firebase from '../../firebase/config';


/// Create User 

export const signup = (data: SignUpData, onError: () => void) : ThunkAction<void, RootState, null,AuthAction> => {
    return async dispatch => {
        try{                                        // Remember the promise         ======>
            const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
            if(response.user){
                const userData : User = {
                    email:data.email,
                    firstName:data.firstName,
                    id:response.user.uid,
                    createdAt:firebase.firestore.FieldValue.serverTimestamp()
                };
                await firebase.firestore().collection('/users').doc(response.user.uid).set(userData);
                await response.user.sendEmailVerification();
                dispatch({
                    type:NEED_VERIFICATION
                });
                dispatch({
                    type:SET_USER,
                    payload:userData
                })
            }
        }catch(err){
            console.log(err);
            onError();
            dispatch({
                type:SET_ERROR,
                payload:err.message
            })
        }
    }
}

// Get user by Id

export const getUserById = (id:string ): ThunkAction<void, RootState, null,AuthAction> => {
    return async dispatch => { 
        try {                                        // find user by Id in the DB 
            const user = await firebase.firestore().collection('users').doc(id).get();
            if(user.exists){
                const userData = user.data() as User; 
                dispatch({
                    type:SET_USER,
                    payload:userData
                });
            }
        } catch (err) {
            console.log(err)
        }
    }
}


/// Loading
    /// Remember LoadingAction is Boolean => 
    export const setLoading  = (value:boolean):  ThunkAction<void, RootState, null,AuthAction> => {
        return dispatch => {
            dispatch({
                type:SET_LOADING,
                payload:value
            })
        }
    }



    //// LOGIN!!!
                // we gonna bring the data 
    export const signin = ( data: SigninData , onError: () => void): ThunkAction<void, RootState, null,AuthAction> => {
        return async dispatch => {
            try {
                await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
            } catch (err) {
                console.log(err);
                onError();
                dispatch(setError(err.message))
            }
        }
    }


    /// Log out

    export const signout = () :  ThunkAction<void, RootState, null,AuthAction> => {
        return async dispatch => { 
            try {
                dispatch(setLoading(true));
                await firebase.auth().signOut();
                dispatch({
                    type:SIGN_OUT
                })
            } catch (err) {
                console.log(err);
                dispatch(setLoading(false));
            }
        }
    }

    //SetError
export const setError = (msg : string):  ThunkAction<void, RootState, null,AuthAction> => {
    return dispatch => {
            dispatch({
                type:SET_ERROR,
                payload:msg
            })
        }   
    }

/// Set need verification 

export const setNeedVerification = () :  ThunkAction<void, RootState, null,AuthAction> => {
    return dispatch => {
        dispatch({
            type:NEED_VERIFICATION
        });
    }
}

// Set Success

export const setSuccess = (msg: string):   ThunkAction<void, RootState, null,AuthAction> => {
    return dispatch => {
        dispatch({
            type:SET_SUCCESS,
            payload:msg
        })
    }
}

// send password reset email

export const sendPasswordReset = (email:string, successMsg:string):  ThunkAction<void, RootState, null,AuthAction> =>  {
    return async dispatch => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            dispatch(setSuccess(successMsg));
        } catch (err) {
            console.error(err)
            dispatch(setError(err.message))
        }
    }
}