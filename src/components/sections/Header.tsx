import React,{ FC } from 'react';
import  {useHistory, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';


import Button from '../UI/Button';
import { RootState } from '../../store/index';
import { signout } from '../../store/actions/authActions';

const Header : FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state : RootState) => state.auth);

    const logoutClickHandler = () => {
        dispatch(signout());
    }

    return(
        <nav className='navbar is-spaced has-shadow'>
            <div className="container">
                <div className="navbar-brand">
                    <Link className='navbar-time' to={!authenticated ? '/' : '/dashboard'}>
                        AppName
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="navbar-items">
                        {!authenticated ? <div className='buttons'> 
                            <Button text='Sign up' onClick={() => history.push('/signup')} className='is-primary'/>
                            <Button text='Sign in' onClick={() => history.push('/signin')} className='is-primary'/>
                        </div>
                        :
                    <Button text='sign out' onClick={logoutClickHandler}/>
                    }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
