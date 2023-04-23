import React from 'react'
import styled from 'styled-components'
// import { services } from '../utils/constants'
import ApiRoundedIcon from '@mui/icons-material/ApiRounded';
import SatelliteAltRoundedIcon from '@mui/icons-material/SatelliteAltRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <ApiRoundedIcon/>,
      title: 'mission',
      text:
        "33% of employees say that the main reason they stay at Shopper is because of the Shopper company mission. Comparably data clearly shows that a focused mission statement and cohesive core company values are vital to maintaining employee alignment.",
    },
    {
      id: 2,
      icon: <SatelliteAltRoundedIcon/>,
      title: 'vision',
      text:
      "Our vision is to be earth's most customer-centric company to build a place where people can come to find and discover anything they might want to buy online."
  },
    {
      id: 3,
      icon: <HistoryEduRoundedIcon/>,
      title: 'history',
      text:
      "Shopper slowly grew in prominence and was receiving 100 orders per day by 2008. In 2010, Shopper acquired the Bangalore-based social book discovery service WeRead from Lulu.com."
     },
  ]
  
  return <Wrapper>
    <div className="section-center">
      <article className="header">
        <h3>Ensuring the best<br/> welfare of the buyers
        </h3>
        <p>The company itself is a very successful company. Conveniently, those right services are important to but easy indeed further flattery as if!</p></article>
      <div className="services-center">

        {services.map((service) => {
          const { id, icon, title, text } = service;
          return <article key={id} className="service">
            <span className="icon">{icon}</span>
            <h4>{title}</h4>
            <p>{text}</p>
          </article>

        })}
      </div>
    </div>
  </Wrapper>
}


const Wrapper = styled.section`
  h3,
  h4 {
    color: var(--clr-primary-1);
  }
  padding: 5rem 0;

  background: var(--clr-primary-10);

  .header h3 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 0;
    line-height: 1.8;
    color: var(--clr-primary-3);
  }
  .services-center {
    margin-top: 4rem;
    display: grid;
    gap: 2.5rem;
  }
  .service {
    background: var(--clr-primary-7);
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    p {
      color: var(--clr-primary-2);
    }
  }
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: var(--clr-primary-10);
    color: var(--clr-primary-1);
    svg {
      font-size: 2rem;
    }
  }
  @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 576px) {
    .services-center {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`
export default Services
