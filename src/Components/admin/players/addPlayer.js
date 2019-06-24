import React, { Component } from 'react'
import AdminLayout from '../../../Hoc/AdminLayout'

import FormField from '../../ui/formFields'
import {validate} from '../../ui/misc'
import {firebasePlayers, firebaseDB, firebaseMatches} from '../../../firebase'
import {firebaseLooper} from '../../ui/misc'


class AddPlayer extends Component {
    
    state = {
        playerId:'',
        formType:'',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        players:[],
        formdata: {
            name: {
                element:'input',
                value: '',
                config: {
                    label: 'First Name',
                    name: 'name_input',
                    type: 'text', 
                },
                validation: {
                    required: true,
                    
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            lastName: {
                element:'input',
                value: '',
                config: {
                    label: 'Last Name',
                    name: 'lastName_input',
                    type: 'text', 
                },
                validation: {
                    required: true,
                    
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            
            position: {
                element:'select',
                value: '',
                config: {
                    label: 'Select a position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        {key:'Keeper', value: 'Keeper'},
                        {key:'Defence', value: 'Defence'},
                        {key:'Midfield', value: 'Midfield'},
                        {key:'Striker', value: 'Striker'},
                    ] 
                },
                validation: {
                    required: true,
                    
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            number: {
                element:'input',
                value: '',
                config: {
                    label: 'Player Number',
                    name: 'number_input',
                    type: 'text', 
                },
                validation: {
                    required: true,
                    
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
        }
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;
        const getPlayers = (player, type) => {
            firebasePlayers.once('value').then(snapshot=>{
                const players = firebaseLooper(snapshot);
                
                
                
                this.updateFields(player, players, type, playerId);

            })
        }
        if(!playerId){
            getPlayers(false, 'Add Player')
        } else{
            firebaseDB.ref(`players/${playerId}`).once('value')
            .then((snapshot)=>{
                const player = snapshot.val();
                getPlayers(player, 'Edit Player')
            })
        }
        
        
    }
    updateForm(element) {
        const newFormdata = {...this.state.formdata}
        const newElement = {...newFormdata[element.id]}
        
        newElement.value = element.e.target.value;

        let valiData = validate(newElement)
        newElement.valid = valiData[0];
        newElement.validationMessage = valiData[1];
        

        newFormdata[element.id] = newElement;
        
        this.setState({ formError: false, formdata: newFormdata });
    }

    updateFields(player, players, type, playerId){
        const newFormdata = {
            ...this.state.formdata
        }
        for(let key in newFormdata){
            if(player){
                newFormdata[key].value = player[key];
                newFormdata[key].valid = true;
            } 
            
            
        }

        this.setState({ 
            playerId,
            formType: type,
            formdata: newFormdata,
            players
          });
    }

    successForm(message) {
        this.setState({ formSuccess: message });
        setTimeout(()=>{
            this.setState({ formSuccess: '' }); 
        }, 2000)
    }
    submitForm(e) {
        e.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }
        
        if(formIsValid) {
            
        
        }else {
            this.setState({ formError: true });

        }
        
        
    }
    
    
    render() {
        return (
            <AdminLayout>
               <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>

                    <div>
                        <form onSubmit={(e)=>this.submitForm(e)}>
                            
                            <div className="split_fields">
                                <FormField 
                                    id={'name'}
                                    formdata={this.state.formdata.name}
                                    change={(element)=> this.updateForm(element)}
                                />
                            
                                <FormField 
                                    id={'lastName'}
                                    formdata={this.state.formdata.lastName}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </div>

                            <div className="split_fields">
                                <FormField 
                                    id={'number'}
                                    formdata={this.state.formdata.number}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </div>
                            <div className="split_fields last">
                         
                                <FormField 
                                    id={'position'}
                                    formdata={this.state.formdata.position}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </div>

                            
                            <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ? 
                                <div className="error_label">Something is wrong</div>
                            : ''
                            }
                            <div className="admin_submit">
                                <button onClick={(e)=>this.submitForm(e)}>
                                    {this.state.formType}
                                </button>
                            </div>
                           

                        </form>
                    </div>
               </div>
            </AdminLayout>
        )
    }
}

export default AddPlayer
