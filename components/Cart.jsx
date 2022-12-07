import React, {useRef} from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/StateContext'
import { Typography } from '@mui/material';

const Cart = () => {
  const [open, setOpen] = React.useState(false);

  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemsQuantity, onRemove} =useStateContext()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='cart-wrapper' ref= {cartRef}>
      <div className='cart-container'>
      <button
      type='button'
      className='cart-heading'
      onClick={() => setShowCart(false)}>
        <AiOutlineLeft />
        <span className='heading'>Your Cart</span>
        <span className='cart-um-items'>({totalQuantities} items)</span>
      </button>
      {cartItems.length < 1 && (
        <div className='empty-cart'>
          <AiOutlineShopping size={150} />
          <h3>Your Shopping Cart is empty</h3>
          <Link href="/">
            <button 
            type='button'
            onClick={() => setShowCart(false)}
            className='btn'>
              Continue Shopping

            </button>
            
          </Link>
          </div>
      )}
      <div className='product-container'>
        {cartItems.length >=1 && cartItems.map(
          (item, index) => ( 
          <div className='product' key={item.id}>
    
            <img src={'../'+ item.image+ '.jpeg'}
            className="cart-product-image"/>

            <div className='item-desc'>
              <div className='flex top'>
                <h5> {item.name}</h5>
                <h4>Rs. {item.price}</h4>
              </div>
            
              <div className='flex bottom'>
                <div>
                    <p className='quantity-desc'>                      
                              <span className='minus'
                              onClick= {() => {
                                toggleCartItemsQuantity(item.id, "dec")
                              }} >
                                  <AiOutlineMinus />
                              </span>
                              <span className='num'
                              onClick="" >{item.quantity}
                                </span>
                              <span className='plus'
                               onClick= {() => {
                                toggleCartItemsQuantity(item.id, "inc")
                              }}>
                                  <AiOutlinePlus/>
                              </span>
                    </p>
                </div>
                <button type='button' className='remove-item'
              onClick={() => {onRemove(item)}}><TiDeleteOutline/></button>
                </div>
            

            </div>


          </div>))}
      </div>
      {cartItems.length >= 1 && (
        <div className='cart-bottom'>
          <div className='total'>
            <h3>Subtotal: </h3>
            <h3>Rs. {totalPrice}</h3>
          </div>
          <div className='btn-container'> 
           <button type='button' className='btn'
           onClick={handleClickOpen}>
            Buy Now
           </button>
           </div>

        </div>
      )}
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Order details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {cartItems && cartItems.map(cartItem => (  <Typography> Name: {cartItem.name} - {cartItem.quantity} qty - Rs {cartItem.price} - Vendor: {cartItem.vendor}</Typography>))}
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cool!
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  )
}

export default Cart