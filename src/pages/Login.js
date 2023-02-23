import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import React from 'react';

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import Router from 'next/router';

import env from '../__mocks__/env';


const Login = (props) => {
    const sendLogin = async (email, password) => {
        const action = `${env.API_URL}/Account/LogIn`;
        const response = await axios.post(action + `?email=${email}&password=${password}`);
        const data = response.data;

        if (data.codeError == 404) {
            formik.setErrors({ email: 'Email no encontrado' });
        }

        else if (data.codeError == 401) {
            formik.setErrors({ password: 'Contraseña no valida' });
        }

        
        else if (data.isSuccess) {
            props.signIn(data.userAdmin);
            Router.push('/').catch(console.error);
        }
    };




    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Debe ser un correo electrónico válido')
                .max(255)
                .required('Correo electronico es requerido'),
            
            password: Yup
                .string()
                .max(255)
                .required('Se requiere contraseña')
        }),

        onSubmit: (value) => sendLogin(value.email, value.password),
    });


  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {

      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );
  
      sendLogin(userInfo.data.email, userInfo.data.sub);
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <React.Fragment>
        <Head>
            <title>Login | De hilos y perlas</title>
        </Head>




        <Box component="main" sx={{ alignItems: 'center', display: 'flex', flexGrow: 1, minHeight: '100%' }} >
            <Container maxWidth="sm">
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ my: 3 }}>
                        <Typography color="textPrimary" variant="h4"> 
                            Registrarse
                        </Typography>
                        <Typography color="textSecondary" gutterBottom variant="body2">
                            Regístrate en la plataforma interna
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Button
                                color="info"
                                fullWidth
                                startIcon={<FacebookIcon />}
                                // onClick={() => formik.handleSubmit()}
                                disabled={true}
                                size="large"
                                variant="contained"
                            >
                                Facebook
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Button
                                color="error"
                                fullWidth
                                onClick={() => googleLogin()}
                                size="large"
                                startIcon={<GoogleIcon />}
                                variant="contained"
                            >
                                Google
                            </Button>
                        </Grid>
                    </Grid>
                    
                    <Box sx={{ pb: 1, pt: 3 }}>
                        <Typography align="center" color="textSecondary" variant="body1">
                            O inicie sesión con un correo electronico
                        </Typography>
                    </Box>

                    <TextField
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label="Correo electronico"
                        margin="normal"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                        variant="outlined"
                        autoComplete='off'
                    />

                    <TextField
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="Contraseña"
                        margin="normal"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                        variant="outlined"
                    />

                    <Box sx={{ py: 2 }}>
                        <Button
                            color="primary"
                            disabled={formik.isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Iniciar sessión
                        </Button>
                    </Box>

            </form>
            </Container>
        </Box>
    </React.Fragment>
  );
};

export default Login;
