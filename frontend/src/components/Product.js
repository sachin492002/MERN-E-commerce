import React, {useState} from 'react'
// import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import {FaSearch} from "react-icons/fa";

const Product = ({image, name, price, _id}) => {
  const [imageSrc,setImageSrc] = useState(image)
  const handleImageError = () => {
    console.log("error occured")
    setImageSrc('https://www.apanabajar.com/public/uploads/products/photos/no_image.png');
  };
  return <>
    <div className="mx-auto w-full flex flex-col justify-center items-center bg-white rounded-lg overflow-hidden rounded-[var(--radius)]">
      <div className='relative h-[70%] overflow-hidden p-5'>

      <img className="object-cover" src={imageSrc} alt={name} onError={handleImageError}
      />
        <Link to={`/products/${_id}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--clr-primary-5)] flex items-center justify-center w-10 h-10 opacity-0 rounded-full transition-all  hover:opacity-100 duration-300  hover:transition-all hover:duration-300 cursor-pointer">
      <FaSearch className='text-[var(--clr-white)]'/>
    </Link>
      </div>
      <div className="p-4 w-full flex flex-row grow-1 justify-between items-stretch">
        <h5 className='truncate text-xs md:text-base md:font-[300] mb-0 '>{name}</h5>
        <p className='text-[var(--clr-primary-5)] tracking-[var(--spacing)] text-xs md:text-base'>₹{price}</p>
      </div>
    </div>
    </>

}

export default Product
