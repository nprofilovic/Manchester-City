import React from 'react';
import Layout from './Hoc/Layout';
import { Switch } from 'react-router-dom';
import Home from './Components/Home';
import TheTeam from './Components/theTeam';
import SignIn from './Components/signin';
import Dashboard from './Components/admin/Dashboard';
import PrivateRoutes from './Components/authRoutes/privateRoutes';
import PublicRoutes from './Components/authRoutes/publicRoutes';
import AdminMatches from './Components/admin/matches';
import AddEditMatch from './Components/admin/matches/addEditMatch';
import AdminPlayers from './Components/admin/players';
import AddPlayer from './Components/admin/players/addPlayer';

const Routes = (props) => {
    return (
        <Layout>
            <Switch>
                <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
                <PrivateRoutes {...props} path="/admin_matches" exact component={AdminMatches} />
                <PrivateRoutes {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch} />
                <PrivateRoutes {...props} path="/admin_matches/edit_match/" exact component={AddEditMatch} />
                <PrivateRoutes {...props} path="/admin_players" exact component={AdminPlayers} />
                <PrivateRoutes {...props} path="/admin_players/add_player/:id" exact component={AddPlayer} />
                <PrivateRoutes {...props} path="/admin_players/add_player" exact component={AddPlayer} />
                <PublicRoutes {...props } restricted={false} exact component={Home} path="/" />
                <PublicRoutes {...props } restricted={false} exact component={TheTeam} path="/the_team" />
                <PublicRoutes {...props } restricted={true} exact component={SignIn} path="/sign_in" />
            </Switch>
        </Layout>
    )
}

export default Routes;
