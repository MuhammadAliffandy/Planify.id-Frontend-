'use client'

import { useEffect, useState } from "react";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import AppLayout from "../component/AppLayout";
import AppContent from '@/app/components/appContent/appContent'
import AppModal from '@/app/components/appModal/appModal'
import AppContentFilter from "../component/appContentFilter"
import AppModalGenerateAI from "./component/appModalGenerateAI";
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import AppModalDetailContent from '../component/modal/appModalDetailContent';
import AppModalEditContent from '../component/modal/appModalEditContent';
import AppPopupFilter from '../component/popup/appPopupFilter'
import { updateGenerateAI, updateGenerateAIList} from '@/app/redux/slices/generateAISlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import { deleteContent, generateAI, getContentByHistory, getContentById, refreshAI } from '@/app/api/repository/contentRepository';
import { getProductByUser } from '@/app/api/repository/productRepository';
import { filterContentHistory } from '@/app/redux/slices/generateAIContentHistorySlice';
import { useDispatch } from "react-redux";
import { setGenerateAI } from "@/app/redux/slices/generateAIByOneSlice";
import { useMediaQuery } from "react-responsive";
import {  ToastContainer,toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import AppAnimationButton from "@/app/components/appAnimation/appAnimationButton";
import AppToastPending from "@/app/components/AppToastPending/appToastPending";
import images from "@/public/images/images";


const GenerateAIPage = () => {

    // state responsive
    const sm = useMediaQuery({ maxWidth: 640 });
    const md = useMediaQuery({ maxWidth: 768 });
    const lg = useMediaQuery({ maxWidth: 1024 });
    const xl = useMediaQuery({ maxWidth: 1280 });
    // external state 
    const arr = [1,2,3,4,5,6]
    const { push } = useRouter()
    const dispatch = useDispatch()
    const userSubscription = useSelector( state => state.userSubscription.value )
    const generateAIContentHistory = useSelector( state => state.generateAIContentHistory.value )
    const generateListContent = useSelector(state => state.generateAI.value)
    // state loading
    const [contentAILoading  , setContentAILoading ] = useState(true)
    const [contentAIHistoryLoading  , setContentAIHistoryLoading ] = useState(true)
    const [openModalLoading , setOpenModalLoading ] = useState(false)
    // state modal
    const [openModalAI , setOpenModalAI ] = useState(false)
    const [openModalDetail , setOpenModalDetail ] = useState(false)
    const [openModalEdit , setOpenModalEdit ] = useState(false)
    // state data
    const [prev , setPrev ] = useState(true)
    const [currentContentAI , setCurrentContentAI ] = useState([])
    const [contentAI , setContentAI ] = useState([])
    const [contentAIHistory , setContentAIHistory ] = useState([])
    const [currentContentAIHistory , setCurrentContentAIHistory ] = useState([])
    const [contentDetail , setContentDetail ] = useState()
    const [productList , setProductList] = useState([])
    const [productCheckBoxFilter , setProductCheckboxFilter] = useState('')
    const [platformCheckBoxFilter , setPlatformCheckboxFilter] = useState('')

    const pagination = () => {
        
        if(generateListContent){
            const filterData = generateListContent.filter((data, index) => index + 1 < 7);
            setContentAI(filterData);
        }else{
            setContentAI(generateListContent);
            
        }
    }

    const getUserProduct = async () => {
        const res = await getProductByUser();
        
        if(res.status == 'OK'){
            const currentData = res.data.filter((data , index) => {
                if(userSubscription <= 2){
                    return index === 0
                }else{
                    return data
                }
            })   
            
            const data = currentData.map(item => {
                return {value: item.idProduct , text : item.nameProduct}
            })
            setProductList(data)
        }
    }

    const mappingGenerateAIValue = (data) => {
        const currentData = data;

        const generateValue = { 
            caption : data.caption ,
            hashtag : data.hashtag,
            image : data.imageUrl, 
        }
        
        const lengthData = generateValue.caption || generateValue.hashtag || generateValue.image
        
        const mappingArray = lengthData.map((data,index)=>{
            return { 
                image : !generateValue.image ? null : generateValue.image[index] , 
                caption :!generateValue.caption ? null : generateValue.caption[index]?.content ,
                hashtag : !generateValue.hashtag ? null : generateValue.hashtag[index]?.content,
                productName : productList[currentData.idProduct - 1].text,
                platform : currentData.platform,
                idContent: currentData.idContent,
                idProduct: currentData.idProduct,
            }
        }) 
        return mappingArray;
    }

    const mappingGenerateCurrentAIValue = (data) => {
        const currentData = data;

        const generateValue = { 
            caption : data.archives.caption ,
            hashtag : data.archives.hashtag,
            image : data.archives.imageUrl, 
        }
        

        const lengthData = generateValue.caption || generateValue.hashtag || generateValue.image
        
        const mappingArray = lengthData.map((data,index)=>{
            return { 
                image : !generateValue.image ? null : generateValue.image[index] , 
                caption :!generateValue.caption ? null : generateValue.caption[index]?.content ,
                hashtag : !generateValue.hashtag ? null : generateValue.hashtag[index]?.content,
                productName : productList[currentData.idProduct - 1]?.text,
                platform : currentData.platform,
                idContent: currentData.idContent,
                idProduct: currentData.idProduct,
                contentTitle:currentData.contentTitle,
                style: currentData.style,
                postedId: currentData.postedId,
            }
        }) 

        return mappingArray;
    }
    
    const refreshGenerateAI = async () => {

        try {
            const data = {
                idContent : contentAI[0].idContent,
                nameProduct :true,
                image: contentAI[0].image != null ? true : false, 
                caption :contentAI[0].caption != null ? true : false,
                hashtag: contentAI[0].hashtag != null ? true : false,
            }
            const res = await refreshAI(data)
            if(res.status == 'OK'){
                const newGenerate =  mappingGenerateAIValue(res.data) 
                setContentAI(newGenerate)
                dispatch(updateGenerateAIList(newGenerate))
                toast.success('Generate AI Refresh Berhasil')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.data.message)
        }
    }

    const fetchContentHistory = async () => {

        setContentAIHistoryLoading(true)
        
        const res = await getContentByHistory();
        if(res.status == 'OK'){
            if(res.data.length !== 0){
                const dataFiltered = res.data.filter((data , index ) => {
                    if(userSubscription <= 2){
                        return data.idProduct == 1
                    }else{
                        return data
                    }
                })
                const currentData = dataFiltered.filter(data => {
                    return data.archives.caption != null || data.archives.hashtag != null || data.archives.imageUrl != null
                } )

                setCurrentContentAIHistory(currentData)
                setContentAIHistory(currentData)
                setContentAIHistoryLoading(false)
            }else{
                setContentAIHistoryLoading(false)
            }
        }else{
            toast.error('Content History Gagal Generate')
            setContentAIHistoryLoading(false)
        }
    }

    const fetchCurrentContentAI = async () => {

        setContentAILoading(true)
        if(contentAIHistory[0]?.idContent != null){
            const res = await getContentById(contentAIHistory[0].idContent);
    
            if(res.status == 'OK'){
                const contentAIConvert = await mappingGenerateCurrentAIValue(res.data);
                setOpenModalLoading(false)
                setCurrentContentAI(contentAIConvert)
                setContentAI(contentAIConvert)
                setContentAILoading(false)
            }else{
                setContentAI(contentAIConvert)
                setContentAILoading(false)
            }
        }else{
            setContentAILoading(false)
        }
        setContentAILoading(false)
    }

    const handleDeleteContentHistory = async (contentId) => {
        try {
            const res = await deleteContent(contentId);
            if(res.status == 'OK'){
                toast.success('Content History Berhasil Dihapus',)
                fetchContentHistory()
            }else{
                toast.error('Content History Gagal Dihapus')
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const notifyHandleDeleteContentHistory = (contentId) => {
        AppToastPending(handleDeleteContentHistory(contentId))
    }

    const handleFilterContentHistory = (target) => {
        
        if(currentContentAIHistory.length > 0 ){
            const filteredData = currentContentAIHistory.filter(data => {
                if(target.product.indexOf(productList[data.idProduct - 1].text) > -1 || target.platform.indexOf(data.platform) > -1 ){
                    return data
                }
            })
        
            setContentAIHistory(filteredData)
        }

        if(target.product.length == 0 && target.platform.length == 0 ){
            setContentAIHistory(currentContentAIHistory)
        }
    }

    const paginationMax  = () => {
        // setPrev(!prev)
        AppToastPending(refreshGenerateAI)
        setContentAI(generateListContent)

    }
    const paginationMin  = () => {
        setPrev(!prev)
    }

    useEffect(()=>{
        getUserProduct() 
    },[])

    useEffect(()=>{
        if(productList.length > 0){
            fetchContentHistory()
        }
    },[
        productList
    ])

    useEffect(()=> {
        if(contentAIHistory.length > 0){
            fetchCurrentContentAI()
        }else{
            setContentAILoading(false)
        }
    },[contentAIHistory])


    return (
        <AppLayout title='Generate AI'>
            {/*  */}
            <AppModalGenerateAI open={openModalAI} onCloseButton={(value)=>{setOpenModalAI(value)}} 
                onClick = { ( value ) => {  
                    setContentAI(value) 
                }}
                onLoad = {
                    (load)=>{
                        setOpenModalLoading(load)
                        setOpenModalAI(false)
                        fetchContentHistory()
                    }
                }

                />
            <AppModalEditContent
                open={openModalEdit}
                onCloseButton = {(value)=> {
                    setOpenModalEdit(value)
                }}
                onDone = {()=>{
                    fetchContentHistory()
                }}
            />
            <AppModalDetailContent
                open= {openModalDetail}
                contentTitle = {contentDetail ? productList.filter( data => data.value == contentDetail.idProduct )[0].text : ''}  
                image = {contentDetail ? contentDetail.image : ''}
                caption = {contentDetail ? contentDetail.caption : ''}
                hashtag = {contentDetail ? contentDetail.hashtag : ""}
                platform = {contentDetail ? contentDetail.platform : ""}
                productName = {contentDetail ? contentDetail.productName : ""}
                idProduct={contentDetail ? contentDetail.idProduct : ""}
                idContent={contentDetail ? contentDetail.idContent : ""}
                data = { contentDetail ? contentDetail : "" }
                postedId = { contentDetail ? contentDetail.postedId : "" }
                isGenerate = { true}
                deleteButton = {false}
                onClick = {()=> {}}
                onEditButton = {()=> {
                    setOpenModalDetail(false)
                    setOpenModalEdit(true)
                    dispatch(setGenerateAI(contentDetail)) 

                }}
                onCloseButton = {(value)=> {setOpenModalDetail(value)}}
                onDone={()=>{}}
            />
            <AppModal
                    withClose = {false}
                    open = {openModalLoading}
                    width={'w-[35%]'}
                >
                    <Box className ='flex flex-col items-center gap-[40px]'>
                        <CircularProgress style={{color : '#F45B69'}}  />
                        <Box className='flex flex-col items-center text-center'>
                            <p className="text-SECONDARY-500 text-[20px] font-bold font-poppins">Generate...</p>
                            <p className="text-TEXT-1 text-[14px] font-poppins">Mohon tunggu sebentar</p>
                        </Box>
                    </Box>
            </AppModal>
            <Box className={`grow  flex  ${ sm || lg || md  ? 'flex-col' : 'flex-row'  } h-[86%]`}>
                {/* */}
                <Box className={`${ sm || lg || md ? 'w-[100%] px-[20px]' : xl ?  'w-[60%] pl-[20px]'  : 'w-[65%] pl-[20px]'  } py-[20px] h-[100%] `}>
                    <Box className='h-[100%] rounded-[20px] p-[20px]  flex flex-col gap-[15px] bg-NEUTRAL-100 hover:shadow-md  '>
                        <Box className='flex items-center justify-between'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Hasil Penelusuran</p>
                            <AppAnimationButton className='w-auto'>
                                <AppCustomButton className='flex gap-[10px] items-center bg-CUSTOM-RED hover:bg-SECONDARY-600 rounded-[10px] px-[15px] py-[5px] '
                                    onClick={()=>{setOpenModalAI(!openModalAI)}}
                                >
                                    <img src={images.icon.sparklingWhite} />
                                    <p className="text-TEXT-5 font-bold text-[14px] ">Generate AI</p>
                                </AppCustomButton>
                            </AppAnimationButton>
                        </Box>
                        <Box  className='h-[100%]  overflow-x-hidden overflow-y-scroll scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                            <Grid container direction={ sm  ? 'column' : 'row' }  justifyContent="flex-start" alignItems="flex-start" spacing={2} className=" p-[8px]" >
                                {
                                    contentAILoading ?

                                    <>
                                        <div className="w-[100%] h-[100%] flex flex-col gap-[20px]">
                                            {
                                                arr.map(data => {
                                                    return(
                                                        <div className="w-[100%] h-[100px] flex flex-col xl:flex-row items-center gap-[20px]">
                                                            <div className="w-[100%] h-[80%] flex items-center gap-[10px]">
                                                                <div className="w-[40%] h-[100%]">
                                                                    <Skeleton className="h-[100%] w-[100%] "/>
                                                                </div>
                                                                <div className="flex flex-col gap-[10px] h-[100%] w-[100%]">
                                                                    <div className="w-[100%] h-[100%]">
                                                                        <Skeleton className="h-[100%] w-[100%] "/>
                                                                    </div>
                                                                    <div className="w-[100%] h-[20%]">
                                                                        <Skeleton className="h-[100%] w-[100%] "/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="w-[100%] h-[80%] flex items-center gap-[10px]">
                                                                <div className="w-[40%] h-[100%]">
                                                                    <Skeleton className="h-[100%] w-[100%] "/>
                                                                </div>
                                                                <div className="flex flex-col gap-[10px] h-[100%] w-[100%]">
                                                                    <div className="w-[100%] h-[100%]">
                                                                        <Skeleton className="h-[100%] w-[100%] "/>
                                                                    </div>
                                                                    <div className="w-[100%] h-[20%]">
                                                                        <Skeleton className="h-[100%] w-[100%] "/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </> :

                                    contentAI.length > 0 ? 
                                        contentAI.map((data,index) => {
                                            return ( 
                                                <Grid key = {index} item 
                                                    xs={ data.image == null  ? 4 : data.image != null && data.caption == null && data.hashtag == null ? 3 : 12} 
                                                    md={ data.image == null  ? 4 : data.image != null && data.caption == null && data.hashtag == null ? 3 : 12} 
                                                    xl={ data.image == null  ? 4 : data.image != null && data.caption == null && data.hashtag == null ? 3 : 6} 
                                                    className = ' w-[100%]'>
                                                        <AppContent
                                                            key={index}
                                                            image={data.image}
                                                            caption = {data.caption}
                                                            hashtag = {data.hashtag}
                                                            onClick={()=>{
                                                                setOpenModalDetail(!openModalDetail)
                                                                setContentDetail(data)
                                                            }}
                                                        />
                                                </Grid>
                                            )
                                        }) 
                                    :

                                    <Box className="w-[100%]">
                                        <p className="text-TEXT-1 p-[10px] text-center">Belum Melakukan Aktivitas Generate</p> 
                                    </Box>

                                }
                            </Grid>
                        </Box>
                        <Box className = 'w-[100%] flex items-center justify-center'>
                            <AppCustomButton className='flex gap-[10px] items-center bg-white rounded-[20px] px-[15px] py-[5px] border-[1px] border-TEXT-4  '
                                    onClick={()=>{paginationMax()}}
                                >
                                    <p className="text-TEXT-1 font-bold text-[14px]">{'Selanjutnya'}</p>
                                    <FontAwesomeIcon icon={prev ? faChevronDown : faChevronUp} color={'black'} ></FontAwesomeIcon>
                            </AppCustomButton>
                        </Box>
                    </Box>

                </Box>
                {/* */}
                <Box className={`${ sm || lg || md ? 'w-[100%]' : xl ? 'w-[40%]' : ' w-[35%]' } h-[100%] p-[20px]`}>
                    {/* filter bar  */}
                    <Box className= 'h-[100%] rounded-[20px] p-[20px] flex flex-col gap-[15px] bg-NEUTRAL-100  hover:shadow-md '>
                        <Box className=' flex items-center justify-between w-[100%]'>
                            <p className="text-TEXT-1 font-bold text-[16px]">Riwayat Penelusuran</p>
                            <AppPopupFilter
                                isResponsive = { xl ? true : false  }
                                product = { productList}
                                listProductCheckbox={productCheckBoxFilter}
                                listPlatformCheckbox={platformCheckBoxFilter}
                                onCheckProduct = {(value)=>{ 
                                    setProductCheckboxFilter(value.product)
                                    handleFilterContentHistory(value)
                                }}
                                onCheckPlatform = {(value)=>{ 
                                    setPlatformCheckboxFilter(value.platform)
                                    handleFilterContentHistory(value)

                                }}
                            />
                        </Box>
                        <Box className='h-[100%] py-[10px]  pl-[4px] pr-[5px] flex flex-col gap-[15px] overflow-x-hidden scrollbar scrollbar-w-[4px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        {
                                contentAIHistoryLoading ? 

                                <>
                                    <div className="w-[100%] h-[100px] flex flex-col items-center gap-[20px]">
                                        {
                                            arr.map(data => {
                                                return(
                                                    <div className="w-[100%] h-[60%] flex items-center gap-[10px]">
                                                        <div className="w-[30%] h-[100%]">
                                                            <Skeleton className="h-[100%] w-[100%] "/>
                                                        </div>
                                                        <div className="flex flex-col gap-[10px] h-[100%] w-[100%]">
                                                            <div className="w-[80%] h-[20%]">
                                                                <Skeleton className="h-[100%] w-[100%] "/>
                                                            </div>
                                                            <div className="w-[60%] h-[20%]">
                                                                <Skeleton className="h-[100%] w-[100%] "/>
                                                            </div>
                                                            <div className="w-[100%] h-[20%]">
                                                                <Skeleton className="h-[100%] w-[100%] "/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </> :

                                contentAIHistory.length > 0 ? 
                                contentAIHistory.map((data,index) => {
                                    
                                    const contentTypes = [  
                                        data.archives.caption ? 'Caption' : null,  
                                        data.archives.hashtag ? 'Hashtag' : null,  
                                        data.archives.imageUrl ? 'Gambar' : null,  
                                    ]

                                    return(
                                        <AppContentFilter
                                            key={index}
                                            title = {data.contentTitle}
                                            subtitle = {productList[data.idProduct - 1 ]?.text}
                                            contentTypes = {contentTypes.join(' ')}
                                            platform = {data.platform}
                                            onClick= {()=>{
                                                const contentAIConvert = mappingGenerateCurrentAIValue(data);
                                                setContentAI(contentAIConvert)
                                            }}
                                            onDeleteButton={()=>{
                                                notifyHandleDeleteContentHistory(data.idContent)
                                            }}
                                        />
                                    )
                                })
                                :
                                <p className="text-TEXT-1 p-[10px] text-center">Belum Melakukan Aktivitas Generate</p> 

                            }
                        </Box>
                    </Box>
                </Box>
            </Box>    
        </AppLayout>
    ) 
}

export default GenerateAIPage;