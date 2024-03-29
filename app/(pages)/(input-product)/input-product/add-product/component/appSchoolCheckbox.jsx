import Stack from '@mui/material/Stack';
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox';

const AppSchoolCheckbox = (props) => {
    let data = [];
    let listValue = props.listValue;

    const arrPop = (array, valueToDelete) => {
        let index = array.indexOf(valueToDelete);
        if (index !== -1) {
            array.splice(index, 1);
        }
        return array
    }

    const handleChange = (value ,label)=>{
        if(listValue != ''){
            if(value === ''){
                listValue = arrPop( data ,label)
            }else{
                listValue.push(value);
            }
            localStorage.setItem('school',listValue)
        }else {
            if(value === ''){
                data = arrPop( data ,label)
            }else{
                data.push(value);
            }
            localStorage.setItem('school',data)
        }
    }

    return (
        <>
            <Stack direction={'row'} spacing={1}>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'SD'
                        value= 'SD'
                        status = {listValue.indexOf('SD') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        value= 'SMA'
                        label = 'SMA'
                        status = {listValue.indexOf('SMA') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        value= 'SMP'
                        label = 'SMP'
                        status = {listValue.indexOf('SMP') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        value= 'kuliah'
                        label = 'Kuliah'
                        status = {listValue.indexOf('kuliah') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                        
                    />
                </Stack>
            </Stack>
        </>
    )
}

export default AppSchoolCheckbox;