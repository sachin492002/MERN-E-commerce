import React, {useState} from 'react';
import styled from 'styled-components';
// import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';

const ListView = ({ products }) => {
    const [imageSources, setImageSources] = useState(products.map((product) => product.image));

    const handleImageError = (index) => {
        const updatedSources = [...imageSources];
        updatedSources[index] = 'https://www.apanabajar.com/public/uploads/products/photos/no_image.png';
        setImageSources(updatedSources);
    };
  return (
          <div>
        {products.map((product,index) => {
          const { _id:id, image, name, price, description } = product;
          return (
              <div className='flex flex-col md:flex-row' key={id}>
                  <img className='w-60' src={imageSources[index]} alt={name} onError={()=>handleImageError(index)} />
                  <div className='mt-4'>
                    <div className='flex flex-inline justify-between items-stretch'>
                  <h4 className='text-gray-900 '>{name}</h4>
                  <h5 className='text-[var(--clr-primary-5)] tracking-[var(--spacing)] text-xs md:text-base'>₹{price}</h5>
                    </div>
                    <p className='line-clamp-3'> {description}</p>

                  <Link to={`/products/${id}`} className='btn'>
                    Details
                  </Link>
                </div>
              </div>
          );
        })}
          </div>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
 .des{
   white-space:nowrap;
   overflow:hidden;
 }
  img {
    
    display: block;
    width: 300px;
    height: 200px;
    object-fit: contain;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
