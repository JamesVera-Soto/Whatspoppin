import React, { Children, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthApi from './AuthApi';

function PrivateRoute({children}) {
    const authUser = useContext(AuthApi)

    return(
        authUser.auth ? children : <Navigate to="/login" />
    )
}

export default PrivateRoute;
