import React from 'react'

import { FeaturedProducts, Hero, Services, Contact } from '../components'
import Feeds from "./Feeds";

const HomePage = () => {

  return <main className=''>
    <Hero />
    <FeaturedProducts />
    <Services />
    <Contact />
    <Feeds/>
  </main>
}

export default HomePage
