import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import heroBcg from '../assets/banner.ivef'
// import heroBcg2 from '../assets/hero-bcg-2.jpeg'

const Hero = () => {
  return <Wrapper className="section-center">
    <article className="content">
      <h1>
      Amazing things will happen when you listen to the consumers
      </h1>
      <p>Communication is a two-way street. We spend a lot of time strategizing what we say to our customers, but we need to spend just as much time listening to understand our customers.</p>
      <Link to="/products" className="btn hero-btn">shop now</Link>
    </article>
    
    <article className="img-container">
      <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGUlMjBzaG9wcGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" alt="nice table" className="main-img" />
      {/* <img src="https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGUlMjBzaG9wcGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" alt="person working" className="accent-img" /> */}
    </article>
  </Wrapper>
}

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.5rem 1.5rem 2.0rem 1.5rem;
      font-size: 1rem;

    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`

export default Hero
