import Head from 'next/head';
import NextLink from 'next/link';
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

import { postNewCategory } from '../../__mocks__/category';

const CategoryCreate = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .min(3, "Mínimo  3 caracteres")
                .required('Se requiere un nombre')
        }),
        onSubmit: (value) => postNewCategory(value)
    });

    return (
        <>
            <Head>
                <title>
                    Agregar categoría | De hilos y perlas
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
                        href="/Category"
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
                                Generar una nueva categoría 
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Ingresa los datos correctos para la categoría.
                            </Typography>
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            fullWidth
                            label="Nombre"
                            margin="normal"
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.description && formik.errors.description)}
                            fullWidth
                            helperText={formik.touched.description && formik.errors.description}
                            label="Descripción"
                            margin="normal"
                            name="description"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            variant="outlined"

                            multiline
                            rows={3}
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

export default CategoryCreate;
