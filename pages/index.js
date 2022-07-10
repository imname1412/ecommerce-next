import React from 'react'
import {
  Cart ,
  Footer ,
  FooterBanner ,
  HeroBanner ,
  Layout ,
  Navbar ,
  Product ,
} from '../components'

const Home = () => {

  const products = ['Product1','Product2',]

  return (
    <>
      <HeroBanner />


      <div className='products-heading'>
        <h2>Best Selling Product</h2>
        <p>Lorem ipsum dolor sit.</p>
      </div>


      <div className='products-container'>
        {products.map((product, index) => (
          <div key={index}>
            {product}
          </div>
        ))}
      </div>

    </>
  )
}

export default Home