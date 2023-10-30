import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import vinay from '../assets/vinay.jpeg';
import talwar from '../assets/talwar.jpeg';
import varun from '../assets/varun.jpeg';
import sachin from '../assets/sachin.jpeg';
import himanshu from '../assets/himanshu2.jpg';
const team = [
  {
    name: 'Himanshu Kataria',
    position: 'SPOC',
    github: 'https://github.com/sachin492002',
    photo: himanshu,
  },
  {
    name: 'Varun Giri',
    position: 'Member 2',
    github: 'https://github.com/sachin492002',
    photo: varun,
  },
  {
    name: 'Vinay Rao',
    position: 'Member 3',
    github: 'https://github.com/sachin492002',
    photo: vinay,
  },
  {
    name: 'Sachin Meena',
    position: 'Member 4',
    github: 'https://github.com/sachin492002',
    photo: sachin,
  },
  {
    name: 'Veera Shekhar',
    position: 'Member 5',
    github: 'https://github.com/sachin492002',
    photo: talwar,
  },
];
const AboutPage = () => {
  return (
    <main>
      <PageHero title="About" />

      <Wrapper>
        <div className="about-page">
          <p className="text-blk section-head-text">Meet Our Team</p>
          <div className="about-page-map">
            {team.map((mem) => (
              <div className="responsive-cell-block  team-card-container">
                <div className="team-card">
                  <div className="img-wrapper">
                    <img src={mem.photo} className="team-img" />
                  </div>
                  <p className="text-blk name">{mem.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  .text-blk {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    line-height: 25px;
  }

  .responsive-cell-block {
    min-height: 75px;
  }

  .responsive-container-block {
    min-height: 75px;
    height: fit-content;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 50px 300px;

    justify-content: space-evenly;
  }

  .outer-container {
    padding-top: 10px;
    padding-right: 50px;
    padding-bottom: 10px;
    padding-left: 50px;
    background-color: rgb(244, 252, 255);
  }

  .inner-container {
    max-width: 1320px;
    flex-direction: column;

    align-items: center;
    margin-top: 50px;
    margin-right: auto;
    margin-bottom: 50px;
    margin-left: auto;
  }

  .section-head-text {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 5px;
    margin-left: 0px;
    font-size: 35px;
    font-weight: 700;
    line-height: 48px;
    color: rgb(0, 135, 177);
    margin: 0 0 10px 0;
  }

  .section-subhead-text {
    font-size: 25px;
    color: rgb(153, 153, 153);
    line-height: 35px;
    max-width: 470px;
    text-align: center;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 60px;
    margin-left: 0px;
  }

  .img-wrapper {
    border: none;
    border-radius: 50%;
    overflow: hidden;
    width: 200px;
    height: 200px;
  }

  .team-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .social-media-links {
    display: flex;
    justify-content: space-between;
  }

  .name {
    font-size: 25px;
    font-weight: 700;
    color: rgb(102, 102, 102);
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 5px;
    margin-left: 0px;
  }

  .position {
    font-size: 25px;
    font-weight: 700;
    color: rgb(0, 135, 177);
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 50px;
    margin-left: 0px;
  }

  .team-img {
    width: 100%;
    height: 100%;
  }

  .team-card-container {
    width: 280px;
    margin: 0 0 40px 0;
  }
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 500px) {
    .outer-container {
      padding: 10px 20px 10px 20px;
    }

    .section-head-text {
      text-align: center;
    }
  }
`;
export default AboutPage;
