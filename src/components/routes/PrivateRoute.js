import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../services/login';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;