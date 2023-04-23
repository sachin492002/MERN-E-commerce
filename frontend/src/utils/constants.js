import React from 'react'
import {GiCompass, GiDiamondHard, GiStabbedNote} from 'react-icons/gi'

export const links = [
    {
        id: 1,
        text: 'home',
        url: '/',
    },
    {
        id: 2,
        text: 'about',
        url: '/about',
    },
    {
        id: 3,
        text: 'products',
        url: '/products',
    },
    {
        id:4,
        text:'add product',
        url:'/addproduct',
    }
]

export const services = [
    {
        id: 1,
        icon: <GiCompass/>,
        title: 'mission',
        text:
            "Our vision is to be earth's most customer-centric company to build a place where people can come to find and discover anything they might want to buy online."
    },
    {
        id: 2,
        icon: <GiDiamondHard/>,
        title: 'vision',
        text:
            "Our vision is to be earth's most customer-centric company to build a place where people can come to find and discover anything they might want to buy online."
    },
    {
        id: 3,
        icon: <GiStabbedNote/>,
        title: 'history',
        text:
            "Our vision is to be earth's most customer-centric company to build a place where people can come to find and discover anything they might want to buy online."
    },
]

export const products_url = 'http://localhost:3001/products'

export const single_product_url = `http://localhost:3001/products/`
