import React from 'react'

import { FeaturedProducts, Hero, Services, Contact } from '../components'
import Feed from "./feed";
import Feeds from "./Feeds";

const HomePage = () => {
  return <main>
    <Hero />
    <FeaturedProducts />
    <Services />
    <Contact />
    <Feeds/>
  </main>
}

export default HomePage
