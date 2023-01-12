import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import env from './../__mocks__/env';
import axios from 'axios';

const Register = () => {
    const sendRegister = async (name, lastName, email) => {
        const action = `${env.API_URL}/Account/Register`;
        const response = await axios.post(action + `?name=${name + ' ' + lastName}&email=${email}`);

        if (response.data.isSuccess) {
            return Router
                .push('/Customers')
                .catch(console.error);
        }


        switch (response.data.codeError) {
            case 4000: return formik.errors({ email: 'Correo ya usado' });
    
            default:
                break;
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            policy: false
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Debe ser un correo electrónico válido')
                .max(255)
                .required(
                    'Se requiere un email'),
            firstName: Yup
                .string()
                .max(255)
                .min(3, 'Debe contener más de 3 caracteres')
                .required('Se requiere un nombre valido'),
            lastName: Yup
                .string()
                .max(255)
                .min(3, 'Debe contener más de 3 caracteres')
                .required('Se requiere un apellido valido')
        }),
        onSubmit: (value) => sendRegister(value.firstName, value.lastName, value.email) 
    });

    return (
        <>
            <Head>
                <title>
                    Agregar personal | De hilos y perlas
                </title>
            </Head>

            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth="sm">
                    <NextLink
                        href="/Customers"
                        passHref
                    >
                        <Button
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                        >
                            Regresar
                        </Button>
                    </NextLink>

                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Generar un nuevo personal
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Ingresa los datos del personal a generar.
                            </Typography>
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            fullWidth
                            label="Nombre"
                            margin="normal"
                            name="firstName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                            fullWidth
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            label="Apellido"
                            margin="normal"
                            name="lastName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Dirección de email"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
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
                                Guardar información
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Register;
