import React from 'react';
import {Link} from 'react-router-dom';

export const Tag = (props) => {
    const template =<div
        style={{
            background: props.bck,
            fontSize: props.size,
            color: props.color,
            padding: '5px 10px',
            display: 'inline-block',
            fontFamily: 'Righteous',
            
        }}
    >{props.children}</div>

    if (props.link){
        return(
            <Link to={props.linkTo}>
                {template}
            </Link>
        )
    } else {
        return template
    }

}

export const firebaseLooper = (snapshot) => {
    let data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })
    return data
}

export const reverseArray = (actualArray) => {
    let reverseArray = [];
    for(let i= actualArray.length-1; i>0; i--){
        reverseArray.push(actualArray[i])
    }
    return reverseArray
}