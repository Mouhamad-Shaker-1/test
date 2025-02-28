import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import FormLogin from '@/components/FormLogin';

const LoginPage = () => {

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <FormLogin />
      </Box>
    </Container>
  );
};

export default LoginPage;
