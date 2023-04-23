import React from 'react'
import styled from 'styled-components'
import {PageHero} from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'
import vinay from '../assets/vinay.jpeg'
import talwar from '../assets/talwar.jpeg'
import varun from '../assets/varun.jpeg'
import sachin from '../assets/sachin.jpeg'
import himanshu from "../assets/himanshu2.jpg"
const team = [
  {
    name: "Himanshu Kataria",
    position: "SPOC",
    github: "https://github.com/sachin492002",
    photo: himanshu
  },
  {
    name: "Varun Giri",
    position: "Member 2",
    github: "https://github.com/sachin492002",
    photo: varun
  },
  {
    name: "Vinay Rao",
    position: "Member 3",
    github: "https://github.com/sachin492002",
    photo: vinay
  },
  {
    name: "Sachin Meena",
    position: "Member 4",
    github: "https://github.com/sachin492002",
    photo:sachin
  },
  {
    name: "Veera Shekhar",
    position: "Member 5",
    github: "https://github.com/sachin492002",
    photo: talwar
  }
]
const AboutPage = () => {
  return <main>
    
    <PageHero title="About" />
    {/* <Wrapper className="page section section-center">
      <img src={aboutImg} alt="nice desk" />
      <article>
        <div className="title">
          <h2>our story</h2>
          <div className="underline"></div>
        </div>
        <p>Thank you very much. They are to follow the pleasures, the flight of some lives! For the pain is not to be taken from the just, it is great to follow the resilience of the life of a great free life, ours indeed, so that, from a to! If there is any consequence for refusing to do so, it is a free choice to blame. The least of those present was softened.The story of Shopper started back in 2021 in Himanshu kataria's Room.  The marketplace grew rapidly, and in 2022, Shopper capitalization grew to $1 trillion making the company the second most profitable after Apple.

Today, Shopper is considered to be the world’s largest online retailer with more than 300 million monthly active users, and more than 2 million sellers. In 2019, Shopper's annual net revenue reached $280 billion.</p> </article>
    </Wrapper> */}
  <Wrapper>
      <div className="responsive-container-block inner-container">
        <p className="text-blk section-head-text">Meet Our Team
        </p>

        <div className="responsive-container-block">
          {(

              team.map((mem) => (
                  <div
                      className="responsive-cell-block  team-card-container">
                    <div className="team-card">
                      <div className="img-wrapper">
                        <img
                            src={mem.photo}
                            className="team-img"/>
                      </div>
                      <p className="text-blk name">{mem.name}
                      </p>
                      <p className="text-blk position">{mem.position}
                      </p>
                      {/* <div className="social-media-links">
                        <a href="http://www.twitter.com/" target="_blank"><img
                            src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-twitter.svg"/></a>
                        <a href="http://www.facebook.com/" target="_blank"><img
                            src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg"/></a>
                        <a href="http://www.instagram.com/" target="_blank"><img
                            src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg"/></a>
                        <a href="http://www.gmail.com/" target="_blank"><img
                            src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-mail.svg"/></a>
                      </div> */}
                    </div>
                  </div>
              )))}
        </div>
      </div>
      </Wrapper>
  </main>
}

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
    margin:50px 300px ;
    
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
    height: 200px
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

`
export default AboutPage
