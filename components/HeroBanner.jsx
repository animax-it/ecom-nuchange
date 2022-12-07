import React from 'react'
const HeroBanner = () => {
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='beats-solo'> Grab your groceries at 30% off!</p>
            <h3> Handpicked fresh vegetables</h3>
            <h1> GROCERY</h1>
            <img src='./herobanner.jpeg' alt={'grocery'}
            className='hero-banner-image' />
            <div>
                <div className='desc'>
                    <p> 10K happy customers :)</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner