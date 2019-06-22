import React from 'react'

const FormField = ({formdata, id, change}) => {

    const renderTemplate = () => {
        let formTemplate = null;

        switch(formdata.element){
            case('input'):
                formTemplate = (
                    <div>
                        <input 
                            {...formdata.config}
                            value={formdata.value}
                            onChange={(e) => change({e, id}) }
                        />
                    </div>
                )
            break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }


    return ( 
        <div>
            {renderTemplate()}
        </div>
     );
}
 
export default FormField;