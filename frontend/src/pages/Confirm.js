import React, { useState } from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import {Link} from "react-router-dom";



  const Confirm = ({comp}) => {
    return <Wrapper className="page-thank">
        <section>
            <h1>Thanks!</h1>
            <h3>Your {comp} has been successfully uploaded!</h3>
            <Link to="/" className="btn">
                back home
            </Link>
        </section>
    </Wrapper>
}

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`
export default Confirm;