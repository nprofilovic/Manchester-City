import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AdminLayout from '../../../Hoc/AdminLayout'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import {firebasePlayers, firebase} from '../../../firebase';
import { firebaseLooper, reverseArray} from '../../ui/misc';
import { Promise } from 'core-js'




class AdminPlayers extends Component {

    state = {
        isLoading: true,
        players: []
    }
    componentDidMount() {
        firebasePlayers.once('value').then(snapshot=>{
            const players = firebaseLooper(snapshot);

            let promises = [];
            for(let key in players){
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref('players')
                        .child(players[key].image).getDownloadURL()
                        .then(url => {
                            players[key].url = url;
                            resolve();
                        })
                    })
                )
            }
            Promise.all(promises).then(() => {
                this.setState({ isLoading: false, players: reverseArray(players) });
            })
           
            
            
        })
    }
    
    render() {
        console.log(this.state.players);
        
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>First name</TableCell>
                                    <TableCell>Last name</TableCell>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Position</TableCell>
                                    <TableCell>Change</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.state.players ? 
                                    this.state.players.map((player,i) => (
                                        <TableRow key={i}>
                                            <TableCell style={{width: '100px', height: '70px', background: `#ffffff url(${player.url})`}}>
                                                
                                            </TableCell>
                                            <TableCell>
                                                {player.name}
                                            </TableCell>
                                            <TableCell>
                                                {player.lastname}
                                            </TableCell>
                                            <TableCell>
                                                {player.number}
                                            </TableCell>
                                            <TableCell>
                                                {player.position}
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/admin_players/add_player/${player.id}`}>
                                                    <button style={{background:'#98c5e9', color: '#ffffff'}} >Edit</button>
                                                 </Link>
                                            </TableCell>
                                            
                                        </TableRow>
                                    ))

                                 :null   
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                    <div className="admin_progress">
                        {this.state.isLoading ?
                            <CircularProgress thickness={7} style={{color: '#98c5e9'}} />
                        : ''     
                        }
                    </div>
                </div>
            </AdminLayout>
        )
    }
}

export default AdminPlayers
