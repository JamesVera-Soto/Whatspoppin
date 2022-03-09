import React, { Children, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthApi, useAuthApiUpdate } from './AuthApi';
    

function PrivateRoute({children}) {
    const authUser = useAuthApi()
    const authUserUpdate = useAuthApiUpdate()

    return(
        authUser.auth ? children : <Navigate to="/login" />
    )
}

export default PrivateRoute;
