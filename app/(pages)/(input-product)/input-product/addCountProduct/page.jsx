'use client'

import Box from '@mui/material/Box';
import CustomSpacing from '@/app/components/customSpacing';
import { useRouter } from 'next/navigation';
import { setCountInputProduct } from '@/app/redux/slices/countInputProductSlice';
import AppButton from '@/app/components/appButton';
import AppHeadline from '@/app/components/appHeadline';
import AppCloseButton from '@/app/components/appCloseButton';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AppDropDown from '../../../../components/appDropDown';


const AddCountProductPage = () => {

    const { push } = useRouter();
    const dispatch = useDispatch();

    const [countProduct, setCountProduct] = useState('');

    const listDropItem = [
        {value : 1 , text : 'Satu'},
        {value : 2 , text : 'Dua'},
        {value : 3 , text : 'Tiga'},
    ]

    const handleChange = (event) => {
        setCountProduct(event.target.value);
    };

    
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const count = dispatch(setCountInputProduct(countProduct))
            push('/input-product/addProduct')
        } catch (error) {
            toast.error('Ada Kesalahan Server')
        }
    };

    return(
        <Box className = 'flex flex-col items-center justify-center rounded-sm p-[10px] h-[100vh] relative'>
            <Box className='  flex justify-end  top-0 mt-[40px]  w-[100%] absolute z-[12]'> 
                <AppCloseButton
                    onClick = {()=>{
                        push('/')
                    }}
                />
            </Box>
            <AppHeadline 
                    title = {'Input Jumlah Produk'}
                    subtitle = {'Masukkan jumlah produk yang akan dikelola!' }
            />
            <CustomSpacing height = {20} />
            <form  onSubmit={onSubmit} className='flex flex-col gap-[20px] w-[100%]'>
                <label className='text-black font-semibold'>Jumlah Produk</label>
                <AppDropDown
                    value={countProduct}
                    placeholder={'Pilih Jumlah Produk'}
                    listItem = {listDropItem}
                    onChange={handleChange}
                />
                <AppButton
                    text={'Selanjutnya'} 
                    type = {'Submit'}
                    fontSize = {'12px'}
                    onClick = {()=>{}}
                />
            </form>
            <ToastContainer autoClose={800} />
        </Box>
    )
}

export default AddCountProductPage;