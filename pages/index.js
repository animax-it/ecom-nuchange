import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import products1 from '../products.json'

const Home = ({products}) => {
  var filterCategory = 'All'

   const [searchval, setSearchval] = React.useState('');

  const [state, setState] = React.useState({
    vegetables: true,
    fruits: true,
    isAvailable: false
  });

  const handleInput = (e) => {
    setSearchval(e.target.value)

  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { vegetables, fruits, isAvailable } = state;

  const error = [vegetables, fruits].filter((v) => v).length !== 2;

  if(vegetables && fruits) {
    filterCategory = 'All'
  } else if (vegetables){
    filterCategory = 'Vegetables'
  } else if (fruits) {
    filterCategory = 'Fruits'
  } else {
    filterCategory = 'None'
  }

  const filteredProducts = products.filter(product => filterCategory === 'All'? product :  product.category === filterCategory)

  const availableProducts = filteredProducts.filter(product => isAvailable ? product.available === 1 : product)
  const searchProducts = availableProducts.filter(product => product.name.includes(searchval))
  return (
    <>
    <HeroBanner />

    <div className='products-heading'>
      <h2> Pick your veggies and fruits!!!</h2>
      <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Select Category</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={vegetables} onChange={handleChange} name="vegetables" />
            }
            label="vegetables"
          />
          <FormControlLabel
            control={
              <Checkbox checked={fruits} onChange={handleChange} name="fruits" />
            }
            label="fruits"
          />
         
        </FormGroup>
      </FormControl>
      </Box>

    <FormGroup>
      <FormControlLabel control={<Switch label={'a'} value="isAvailable" name="isAvailable" onChange={handleChange} inputProps={{ 'aria-label': 'Switch A' }} />} label="In stock" />
    </FormGroup>

    <input 
      onChange= {handleInput} value= {searchval} />
    </div>

    <div className='products-container'>
      {searchProducts && searchProducts?.map(
        (product) => <Product key={product._id} product={product} />)}
      
    </div>
    <FooterBanner />
    </>
  )
}
 

export const getServerSideProps = async () => {
  const products = products1.products

  return {
    props: { products}
  }
  
}
export default Home