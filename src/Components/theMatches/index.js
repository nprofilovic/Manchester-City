import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebaseLooper, reverseArray } from '../ui/misc';
import {firtebaseMatches, firebaseMatches } from '../../firebase';
import LeagueTable from './table';
import MatchesList from './matchesList';

class TheMatches extends Component {


    state = {
        loading: true,
        matches: [],
        filterMatches: [],
        playerFilter: 'All',
        resultFilter: 'All'
    }

    componentDidMount() {
        firebaseMatches.once('value').then(snapshot => {
            const matches = firebaseLooper(snapshot);

            this.setState({ 
                loading: false, 
                matches: reverseArray(matches), 
                filterMatches: reverseArray(matches)
            });
        })
    }
    render() {
        const state = this.state;
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                            
                        </div>
                        <MatchesList matches={state.filterMatches} />
                    </div>
                    <div className="right">
                        <LeagueTable />
                    </div>

                </div>
            </div>
        )
    }
}

export default TheMatches
