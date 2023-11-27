import React, {useState} from 'react'
import {Route} from 'react-router-dom';
import Login from "../login/login";
import {useSelectorIsUserLoggedInfo} from '../user/user.hooks';

interface Props {
    path: string;
    component: React.ComponentType | React.FunctionComponent<any> | React.NamedExoticComponent<any>,
    redirectToLogin?: boolean,
    [x: string]: any;
}

const PrivateRoute = (props: Props) => {
    const {path, component: Component, redirectToLogin, ...rest} = props;
    const userLogged = useSelectorIsUserLoggedInfo();
   


    return (<>{userLogged ? <Route {...rest} component={Component}/> : (<Login />)}</>
    )
};
export default PrivateRoute;
