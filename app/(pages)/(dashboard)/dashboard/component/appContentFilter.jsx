import Box from '@mui/material/Box'
import AppAnimationContent from "@/app/components/appAnimation/appAnimationContent";
import { listPlatform } from '@/app/utils/model';
import { useState } from 'react';
import images from '@/public/images/images';


const AppContentFilter = (props) => {

    const [ isHover , setIsHover ] = useState(false)

    return(
        <AppAnimationContent>
            <Box onMouseEnter={()=>{  props.isDashboard ? setIsHover(false) :  setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}} className={`${isHover ? 'border-[1px] border-PRIMARY-500' : ''} flex px-[20px] py-[10px] items-center justify-between bg-TEXT-5 rounded-[20px] shadow-CUSTOM-2`}   >
                <Box className= 'flex gap-[10px] items-center cursor-pointer'  onClick={props.onClick}>
                    <img className='w-[40px] h-[40px] rounded-[100%]' src={ props.platform == 'facebook'? listPlatform.facebook : props.platform == 'instagram'? listPlatform.instagram : props.platform == 'twitter'? listPlatform.twitter : null  }/>
                    <Box className='flex flex-col gap-[2px'>
                        <p className={`${isHover ? 'text-PRIMARY-300' : 'text-TEXT-4'} text-[12px]`}>{ props.subtitle || 'Bakso aci mantap'}</p>
                        <p className={`${isHover ? 'text-PRIMARY-500' : 'text-TEXT-1'}  text-[16px] font-semibold`}>{ props.title || 'Khasiat Bakso Aci' }</p>
                        <p className={`${isHover ? 'text-PRIMARY-300' : 'text-TEXT-4'} text-[12px]`}>{ props.contentTypes || 'Gambar, caption, hasgtag'  }</p>
                    </Box>
                </Box>
                {
                    props.isDashboard ? 
                    null :    
                    <button type={'button'} onClick={props.onDeleteButton} className={`bg-transparent px-[10px]`}>
                        <img className='w-[22px] h-[22px] ' src={isHover? images.icon.trashBlue : images.icon.trash}/>
                    </button>
                }
            </Box>
        </AppAnimationContent>
    )
}

export default AppContentFilter;