import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box'
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import { listPlatform } from '@/app/utils/model';
import Skeleton from "react-loading-skeleton";

const AppTableProduct = (props) =>  {
    return (
        <>{
            props.data.length > 0 ?
            <TableContainer className='scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full' >
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center"><p className='font-bold text-TEXT-3'>No.</p></TableCell>
                        <TableCell align="center"><p className='font-bold text-TEXT-3'>Jam</p></TableCell>
                        <TableCell align="center"><p className='font-bold text-TEXT-3'>Tanggal</p></TableCell>
                        <TableCell align="center"><p className='font-bold text-TEXT-3'>Produk</p></TableCell>
                        <TableCell align="center"><p className='font-bold text-TEXT-3'>Status Konektivitas</p></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.data.length <= 0 ?
                    
                        <>
                            <TableRow className="w-[100%] h-auto">
                                <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                                <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                                <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                                <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                                <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                            </TableRow>
                        </> 

                        :

                        props.data.map((data , index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center"><p className='text-[12px]' >{index + 1}.</p></TableCell>
                            <TableCell align="center"><p className='text-[12px]'>{data.time}</p></TableCell>
                            <TableCell align="center"><p className='text-[12px]'>{data.date}</p></TableCell>
                            <TableCell align="center">
                                <div className='flex items-center gap-[10px] justify-center'>
                                    <img className='w-[20px] h-[20px] rounded-[100%]' src={ data.platform == 'facebook'? listPlatform.facebook : data.platform == 'instagram'? listPlatform.instagram : data.platform == 'twitter'? listPlatform.twitter : null  }/>
                                    <p className='text-[12px]' >{data.productName}</p>
                                </div>
                            </TableCell>

                            <TableCell align="center">
                                <div className='flex items-center gap-[8px] justify-center'>
                                    <img className='w-[20px] h-[20px] rounded-[100%]' src={`/images/icon/connect-status/${data.status == 'disconnected' ? 'info-circle' : data.status  == 'deleted' ? 'minus-cirlce'  : 'add-circle' }.svg`}/>
                                    <p className={`text-[12px] ${data.status == 'disconnected' ? 'text-STATE-BLUE-BASE' : data.status == 'deleted' ? 'text-STATE-RED-BASE' : 'text-STATE-GREEN-BASE'}`} >{data.status == 'disconnected' ? 'Konektivitas Terputus' : data.status == 'deleted' ? 'Akun dihapus' : 'Akun ditambahkan'}</p>
                                </div>
                            </TableCell>
        
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            :
            <Box className = 'w-[100%]'>
                <p className="text-TEXT-1 p-[10px] text-center">Belum Ada Koneksi Platform</p> 
            </Box> 
        }</>
    );
}

export default AppTableProduct;