import React from 'react'
import { Typography, Box, Container } from '@mui/material';
import FormSignup from '@/components/FormSignup';

const Signup = () => {
  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>Signup</Typography>
        <FormSignup />
      </Box>
    </Container>
  )
}

export default Signup