import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

import RedeemIcon from '@mui/icons-material/Redeem';

import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';
export const SideData = [
    {
        title:"Profile",
        icon:<PersonIcon/>,
        link:"/profile"
    },
    
    {
        title:"Orders",
        icon:<CategoryIcon/>,
        link:"/orders"
    },
    {
        title:"Support",
        icon:<ReceiptIcon/>,
        link:"/support"
    }
]

export const sellerSideData = [
    {
        title:"Profile",
        icon:<PersonIcon/>,
        link:"/profile"
    },
    
    {
        title:"Orders",
        icon:<CategoryIcon/>,
        link:"/ordersAll"
    },
    {
        title:"My Products",
        icon:<CategoryIcon/>,
        link:"/myProducts"
    },
    {
        title:"Support",
        icon:<ReceiptIcon/>,
        link:"/support"
    }
]




export const SideDataAdmin = [
    {
        title:"Home",
        icon:<PersonIcon/>,
        link:"/admin"
    },
    {
        title:"Users",
        icon:<RedeemIcon/>,
        link:"/users"
    },{
        title:"Blocked Users",
        icon:<RedeemIcon/>,
        link:"/blockedUsers"
    }
    ,
    {
        title:"Support",
        icon:<ReceiptIcon/>,
        link:"/supportAdmin"
    }
]