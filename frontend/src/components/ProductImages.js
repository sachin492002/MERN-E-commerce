import React, { useState } from 'react';
import styled from 'styled-components';

const ProductImages = ({ image}) => {

  console.log(image);
  return (
      <Wrapper>
          <img src={(image !=null && image[0]==='u')? 'http://localhost:3001/'+image:image} alt='main' className='main' />
      </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 100%;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: contain;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
