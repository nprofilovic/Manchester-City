import React, { Component } from 'react'

class MatchesList extends Component {


    state = {
        matcheslist: [],
    }

    static getDerivedStateFromProps(props, state){
        return state = {
            matcheslist: props.matches
        }
    }

    render() {
        console.log(this.state);
        
        return (
            <div>
              MatchesList  
            </div>
        )
    }
}

export default MatchesList;