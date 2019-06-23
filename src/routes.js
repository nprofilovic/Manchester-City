import React from 'react';
import Layout from './Hoc/Layout';
import { Switch } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/signin';
import Dashboard from './Components/admin/Dashboard';
import PrivateRoutes from './Components/authRoutes/privateRoutes';
import PublicRoutes from './Components/authRoutes/publicRoutes';
import AdminMatches from './Components/admin/matches';


const Routes = (props) => {
    return (
        <Layout>
            <Switch>
                <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
                <PrivateRoutes {...props} path="/admin_matches" exact component={AdminMatches} />
                <PublicRoutes {...props } restricted={false} exact component={Home} path="/" />
                <PublicRoutes {...props } restricted={true} exact component={SignIn} path="/sign_in" />
            </Switch>
        </Layout>
    )
}

export default Routes;
