import React, { Component } from 'react'
import Fade from 'react-reveal'
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';


class Enroll extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formdata: {
            email: {
                element:'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            }
        }
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
            console.log(dataToSubmit);
        } else {
            this.setState({ formError: true });
            
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


    render() {
        return (
            <Fade> 
                <div className="enroll_wrapper">
                    <form onSubmit={(e)=>this.submitForm(e)}>
                        <div className="enroll_title">
                            Enter your email   
                        </div>
                        <div className="enroll_input">
                            <FormField
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element)=> this.updateForm(element)}
                                
                            />
                            {this.state.formError ? 
                                <div className="error_label">Something is wrong, try again.</div>
                                :null
                            }
                            <button onClick={(e) => this.submitForm(e)}>Enroll</button>
                        </div>
                    </form>
                </div>
            </Fade>
        )
    }
}

export default Enroll

