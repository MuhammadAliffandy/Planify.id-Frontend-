'use client'

import Box from '@mui/material/Box';
import AppTextField from '@/app/components/appTextField'
import Stack from '@mui/material/Stack'
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { validateEmail, validateName, validatePassword, validatePhoneNumber } from '../component/validation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createAuth } from '@/app/api/repository/authRepository';
import AppButton from '@/app/components/appButton';
import AppHeadline from '@/app/components/appHeadline';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';


const SignUpPage  = () => {

    const { push } = useRouter();
    const [loadingProgress,setLoadingProgress] = useState(0);
    const { register, watch ,handleSubmit, formState: { errors } } = useForm();

    const password = watch('password', '');
    
    const notify = () => {
        toast.success('Pendaftaran Berhasil',{
            onClose : () => {
                push('/auth/otp-verified')
                setLoadingProgress(100)
            }
        })
    }

    const onSubmit= async (data ) => {

        try {
            setLoadingProgress(50)
            sessionStorage.setItem('email' ,data.email)
            const res = await createAuth(data)

            if(res.status = 'OK'){
                notify();
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server');
        }


    };

    return(
        <Box className = 'bg-white flex flex-col items-center rounded-sm p-[10px]'>
                <LoadingBar 
                    color={'blue'} 
                    progress={loadingProgress} 
                    onLoaderFinished={() => setLoadingProgress(0)
                } />
                    <AppHeadline 
                        title = {'Selamat Datang!'}
                        subtitle = {'Daftarkan akun dan mulai manajemen kontenmu!' }
                    />
                    <CustomSpacing height = {20} />
                    <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%]'>
                        <label className='text-black font-semibold'>Nama</label>
                        <AppTextField
                                id="name"
                                placeholder='Masukkan nama lengkap di sini'
                                validationConfig = {register('name', 
                                    {
                                        validate: validateName
                                    })}
                                error={Boolean(errors.name)}
                                helperText={errors.name && errors.name.message}
                            />
                        <Stack direction="row" spacing={2}>   
                            <Box className='flex flex-col gap-[10px]'>
                                <label className='text-black font-semibold'>Email</label>
                                <AppTextField
                                        id="email"
                                        type='email'
                                        placeholder='Masukkan email di sini'
                                        validationConfig = {register('email', {
                                            validate : validateEmail
                                        })}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email && errors.email.message}
                                    />
                            </Box>
                            <Box className='flex flex-col gap-[10px]'>
                                <label className='text-black font-semibold'>Nomor Telepon</label>
                                <AppTextField            
                                        id="phoneNumber"
                                        placeholder='Masukkan no telepon di sini'
                                        validationConfig = {register('phoneNumber', { 
                                            validate: validatePhoneNumber 
                                        })}
                                        error={Boolean(errors.phoneNumber)}
                                    />
                            </Box>
                        </Stack> 
                        <label className='text-black font-semibold'>Kata Sandi</label>
                        <AppTextField
                                id="password"
                                placeholder='Masukkan kata sandi di sini'
                                type={"password"} 
                                validationConfig = {register('password', {
                                    validate : validatePassword
                                })}
                                error={Boolean(errors.password)}
                                helperText={errors.password && errors.password.message}
                            
                            />
                        <label className='text-black font-semibold'>Konfirmasi Kata Sandi</label>
                        <AppTextField
                
                                id="confirmPassword"
                                placeholder='Masukkan konfirmasi kata sandi di sini'
                                type={"password"  } 
                                validationConfig = {register('confirmPassword', {
                                required: 'Password harus sama',
                                    validate: value => value === password || 'Password tidak cocok'
                                })}
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword && errors.confirmPassword.message}
                            />
                        <AppButton
                                text={'Daftar Sekarang'} 
                                type = {'Submit'}
                                fontSize = {'12px'}
                                onClick = {()=>{}}
                        />
                    </form>
                    <CustomSpacing height={'10px'}/>
                    <Box className = 'w-[100%] flex justify-center'>
                            <p  onClick = {()=>{push('/auth/signin')}}  className='text-black cursor-pointer text-[14px] text-opacity-[25%]'>Sudah punya akun?</p>
                            <CustomSpacing width = {5}/>
                            <p  onClick = {()=>{push('/auth/signin')}}  className='text-black cursor-pointer text-[14px] font-bold'>Masuk</p>
                    </Box>
                    <ToastContainer
                        autoClose={800}
                    />
                </Box>

    )
}

export default SignUpPage ;