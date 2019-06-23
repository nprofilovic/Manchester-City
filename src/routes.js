import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/signin';
import Dashboard from './Components/admin/Dashboard';
import PrivateRoutes from './Components/authRoutes/privateRoutes';
import PublicRoutes from './Components/authRoutes/publicRoutes';



const Routes = (props) => {
    return (
        <Layout>
            <Switch>
                <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
                <PublicRoutes {...props } restricted={false} exact component={Home} path="/" />
                <PublicRoutes {...props } restricted={true} exact component={SignIn} path="/sign_in" />
            </Switch>
        </Layout>
    )
}

export default Routes;
