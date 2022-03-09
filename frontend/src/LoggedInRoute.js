import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthApi } from './AuthApi';
    

function LoggedInRoute({children}) {
    const authUser = useAuthApi()

    return(
        (!authUser.auth) ? children : <Navigate to="/account" />
    )
}

export default LoggedInRoute;
