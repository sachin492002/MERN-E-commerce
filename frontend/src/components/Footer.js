import React from 'react'
import styled from 'styled-components'
import CycloneIcon from '@mui/icons-material/Cyclone';

const Footer = () => {
  return <Wrapper>
  <CycloneIcon/>
    <h5>  
     {new Date().getFullYear()}
      <span> Shopper </span>
    </h5>   
    <h5> All Rights Reserved@Shopper-2022 </h5>
  </Wrapper>
}

const Wrapper = styled.footer`
  
  height: 4.5rem;
  display: flex;
  margin-top: 250px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  text-align: center;

  span {
    color: var(--clr-primary-5);
  }
  
  h5 {
    color: white;
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }

  @media (min-width: 776px) {
    flex-direction: row;
  }
`

export default Footer
