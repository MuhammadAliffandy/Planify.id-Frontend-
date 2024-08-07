import Box from '@mui/material/Box'
import images from '@/public/images/images';

const AppNotificationButton = (props) => {
    return(
        <Box className='cursor-pointer w-[22px] h-[22px] relative' onClick={props.onClick} onMouseEnter={props.onMouseEnter}>
            <img className='w-[22px] h-[22px] ' alt='notification-icon' src={`${images.icon.notificationIcon}`}/>
            {props.available ? <div className='absolute w-[6px] h-[6px] bg-SECONDARY-500 right-0 top-0 p-[4px] rounded-[100%]'></div> : null }
        </Box>
    )
}

export default AppNotificationButton;