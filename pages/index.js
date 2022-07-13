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
import { client } from '../lib/client'

const Home = ({products , banner}) => {


  return (
    <>
    {console.log(products)}
    {console.log(banner)}
      <HeroBanner heroBanner={banner.length && banner[0]} />

      <div className='products-heading'>
        <h2>Best Selling Product</h2>
        <p>Lorem ipsum dolor sit. Lorem, ipsum dolor.</p>
      </div>


      <div className='products-container'>
        {products.map((product, index) => (
          <Product key={product._id} product={product} />
        ))}
      </div>


      <FooterBanner footerBanner={banner && banner[0]} />

    </>
  )
}

export const getServerSideProps = async () => {
  const ProductQuery = '*[_type == "product"]'
  const products = await client.fetch(ProductQuery)

  const BannerQuery = '*[_type == "banner"]'
  const banner = await client.fetch(BannerQuery)


  return {
    props: {
      products,
      banner,
    }
  }
}



export default Home