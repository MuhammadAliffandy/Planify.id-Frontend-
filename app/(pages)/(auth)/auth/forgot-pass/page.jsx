'use client'

import Box from '@mui/material/Box';
import CustomSpacing from '@/app/components/appCustomSpacing/appCustomSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { validateEmail } from '../component/validation';
import AppButton from '@/app/components/appButton/appButton';
import AppHeadline from '@/app/components/appHeadline/appHeadline';
import AppTextField from '@/app/components/appTextField/appTextField';
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton';
import { resetPasswordAuth } from '@/app/api/repository/authRepository';
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {

    const { push } = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm();

    
    const onSubmit = async (data ) => {
        try {
            const res = await resetPasswordAuth({email : data.email});

            if(res.status == 'OK'){
                toast.success('Email Berhasil dikirim')
                push('/auth/signin')
            }
        } catch (error) {
            if(error.status == 404){
                toast.error('Email tidak terdaftar')
            }else{
                toast.error(error.data.message)
            }
        }
    };

    return(
        <Box className = 'flex flex-col items-center justify-center rounded-sm p-[40px] xl:p-[10px] h-[100vh] relative'>
            <Box className='  flex justify-end  top-0 mt-[40px] right-[30px] lg:right-0 xl:right-0  w-[100%] absolute z-[12]'> 
                <AppCloseButton
                    onClick = {()=>{
                        push('/auth/signin')
                    }}
                />
            </Box>
            <AppHeadline 
                title = {'Lupa Kata Sandi?'}
                subtitle = {'Buat kata sandi baru dan masuk kembali ke akunmu!'}
            />
            <CustomSpacing height = {20} />
            <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                <label className='text-black font-semibold'>Email</label>
                <AppTextField
                    id="email"
                    type='email'
                    placeholder='Masukkkan email di sini'
                    validationConfig = {register('email', { 
                        validate : validateEmail
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                    />
                <AppButton
                    text={'Kirim'} 
                    type = {'Submit'}
                    fontSize = {'12px'}
                    onClick = {()=>{}}
                />
            </form>
        </Box>
    )
}

export default ForgotPasswordPage;