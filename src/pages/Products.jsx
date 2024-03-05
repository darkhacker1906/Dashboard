import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddProductsModal from '../components/LogoutModal'

function Products() {
  return (
   <Box>
    <Typography variant='h5'sx={{textAlign:"center"}}>Products Page</Typography>
    <Box sx={{float:"right"}}><Button variant='contained'sx={{background:"#65659D"}}>Add Products</Button></Box>
 
   </Box>
  )
}

export default Products