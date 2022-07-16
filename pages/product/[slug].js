import React , { useState } from 'react'
import { client , urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar  } from 'react-icons/ai'
import Product from '../../components/Product'
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({ product , products }) => {
    const { image, name, details, price } = product[0]
    const [index, setIndex] = useState(0)


    const { decQty , incQty, qty } = useStateContext()

  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img 
                        src={urlFor(image && image[index])}
                        alt='img'
                        className='product-detail-image'
                    />
                </div>
                <div className='small-images-container'>
                  {image.map((img , i) => (
                    <img
                      key={i}
                      src={urlFor(img)}
                      alt='img'
                      className={i === index ? 'small-image selected-image':'small-image'}
                      onMouseEnter={() => setIndex(i)}
                    />
                  ))}
                </div>
            </div>

            <div className='product-detail-desc'>
              <h1>{name}</h1>
              <div className='reviews'>
                <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
                <p>
                  (20)
                </p>
              </div>
              <h4>Details: </h4>
              <p>{details}</p>
              <p className='price'>${price}</p>
              <div className='quantity'>
                <h3>Quantity:</h3>
                <p className='quantity-desc'>
                  <span 
                    className='minus'
                    onClick={() => {decQty()}}
                  >
                    <AiOutlineMinus />
                  </span>
                  <span 
                    className='num'
                    onClick={() => {}}
                  >
                    {qty}
                  </span>
                  <span 
                        className='plus'
                        onClick={() => {incQty()}}
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>

                <div className='buttons'>
                    <button 
                      type='button' 
                      className='add-to-cart'
                      onClick={() => {}}
                    >Add to Cart</button>
                    <button 
                      type='button' 
                      className='buy-now'
                      onClick={() => {}}
                    >Buy Now</button>
                </div>
            </div>

        </div>

        <div className='maylike-products-wrapper'>
          <h2>You may also like</h2>
          <div className='marquee'>
            <div className='maylike-products-container track'>
              {products.map((item) => (
                  <Product 
                    key={item._id} 
                    product={item} 
                  />
              ))}
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