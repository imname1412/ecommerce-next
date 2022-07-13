import React from 'react'
import { client , urlFor } from '../../lib/client'

const ProductDetails = ({ product , products }) => {
    const { image, name, details, price } = product[0]
  return (
    <div>
        {console.log(product)}
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img 
                        src={urlFor(image && image[0])}
                    />
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default ProductDetails


export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug{
            current
        }
    }`
    // const query = `*[_type == "product"]`
    

    const products = await client.fetch(query)
    const paths = products.map((product) => (
        {
            params: { 
                slug: product.slug.current
            }  
        }
    ))

    return {
      paths,
      fallback: 'blocking', 
    }
  }


export const getStaticProps = async ({ params: { slug } }) => {
    const specQuery = `*[_type == "product" && slug.current == '${slug}']`
    const product = await client.fetch(specQuery)
    //* this return array [{...}] we want obj so sel index 0

    const ProductQuery = `*[_type == "product"]`
    const products = await client.fetch(ProductQuery)
  
  
    return {
      props: {
        product,
        products,
      }
    }
  }