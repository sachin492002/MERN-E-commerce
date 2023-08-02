import React, {useState} from 'react'
// import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'

const Product = ({image, name, price, _id}) => {
  const [imageSrc,setImageSrc] = useState(image)
  const handleImageError = () => {
    console.log("error occured")
    setImageSrc('https://www.apanabajar.com/public/uploads/products/photos/no_image.png');
  };
  return <>
    <div className="mx-auto w-full flex flex-col justify-center items-center bg-white rounded-lg overflow-hidden rounded-[var(--radius)]">
      <div className='relative h-[70%] overflow-hidden p-5'>
        <Link to={`/products/${_id}`}>
      <img className="object-contain overflow-hidden transition-all duration-300 rounded-lg  hover:blur-sm" src={imageSrc} alt={name} onError={handleImageError}
      /></Link>
    {/*    <Link to={`/products/${_id}`} className="absolute top-1/2 left-1/2 bg-[var(--clr-primary-5)] flex items-center justify-center w-20 h-20 opacity-0 rounded-full transition-all  hover:opacity-100 duration-300  hover:transition-all hover:duration-300 cursor-pointer">*/}
    {/*  <FaSearch className='text-[var(--clr-white)]'/>*/}
    {/*</Link>*/}
      </div>
      <div className="p-4 w-full flex flex-row grow-1 justify-between items-stretch">
        <h5 className='truncate text-xs md:text-base md:font-[300] mb-0 '>{name}</h5>
        <p className='text-[var(--clr-primary-5)] tracking-[var(--spacing)] text-xs md:text-base'>₹{price}</p>
      </div>
    </div>
    </>

}

export default Product
