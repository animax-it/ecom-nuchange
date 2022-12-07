import React from 'react'
import { AiOutlineMinus,AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import{useStateContext} from '../../context/StateContext'
import products1 from '../../products.json'
const ProductDetails = ({ product}) => {
    const {image, name, vendor, price}= product;
    const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext()
    const handleBuyNow = () => {
        onAdd(product, qty)
        setShowCart(true)
    }
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img className='product-detail-image' src={'../../' + image + '.jpeg'}/>
                </div >
            
                <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p> (20)</p>
                </div>
                <h4>Vendor: </h4>
                <p>{vendor}</p>
                <p className='price'>Rs.{price}</p>
                <div className='quantity'>
                    <h3>quantity:</h3>
                    <p className='quantity-desc'>
                        <span className='minus'
                        onClick= {decQty} >
                            <AiOutlineMinus />


                        </span>
                        <span className='num'
                        onClick="" >
                            {qty}
                            

                        </span>
                        <span className='plus'
                        onClick={incQty} >
                            <AiOutlinePlus/>
                            

                        </span>
                    </p>
                </div>
                <div className='buttons'>
                    <button type='button'
                    className='add-to-cart'
                    onClick={ () => onAdd(product,qty)}>
                        Add to Cart
                    </button>

                    <button type='button'
                    className='buy-now'
                    onClick={handleBuyNow}>
                        Buy now
                    </button>
                </div>

               
            </div>

        </div>
        </div>
          
        </div>
  )
}

export const getStaticPaths = async () => {
   
    const products = products1.products
    const paths = products.map((product) => ({
        params: {
            slug: product.slug
        }

    
    }))
    return {
        paths, fallback: 'blocking'
    }
}

export const getStaticProps = async ({params: {slug}}) => {
   const product = products1.products.filter(product => product.slug === slug)[0]
    const products = products1.products
  
    return {
      props: { products, product }
    }
    
  }

export default ProductDetails