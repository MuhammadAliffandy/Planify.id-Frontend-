import React from 'react';

const  AppCheckBox = (props) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        const status = event.target.checked;
        setChecked(status);
        props.onChange( status ? props.value : '' ,props.label)
    };
    

    const valueInitiate = (check) => {
        return check ? props.value : ''
    }

    React.useEffect(()=>{
        if(props.status === 'reset'){
            setChecked(false)
        }else if (props.status === 'added') {
            setChecked(true)   
            valueInitiate(true)         
        }
    },[props.status])

    return (
        <div className="flex items-center">
            <input
                value = {props.value || ''}
                disabled={props.disabled || false}
                type="checkbox"
                className={`h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded-[50%] ${props.isCircle ? 'border-[2px] border-gray-300 rounded-full appearance-none checked:bg-blue-500 checked:border-transparent' : ''}`}
                checked={props.checked || checked}
                onChange={(event)=>{
                    props.customHandle ? 
                    props.onChange() :
                    handleChange(event)
                }}
            />
            <label className="ml-2 text-sm text-gray-700 font-poppins text-[10px] font-medium">{props.label.charAt(0).toUpperCase() + props.label.slice(1)}</label>
        </div>
    );
}

export default AppCheckBox;