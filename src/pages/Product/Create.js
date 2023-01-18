import Head from 'next/head';
import { Container, Typography } from '@mui/material';
import { NewProductDetails } from '../../components/new-product/new-product-details';
import { DashboardLayout } from '../../components/dashboard-layout';

import ShopProductCard from '../../components/product/product-card';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import axios from 'axios';

import env from '../../__mocks__/env';
import Router from 'next/router';


const saveProduct = async (value) => {
    const formData = new FormData();

    for (const key in value) {
        formData.append(key, value[key]);
    }

    const response = await axios.post(`${env.API_URL}/Product/Create`, formData);
    await saveImageProduct(response.data.id);

    Router.push("/Product");
};


const saveImageProduct = async (productId) => {
    const formDataPrincipalImage = new FormData();

    const principalImage = document.querySelector("img.principal-image");
    const secondaryImage = document.querySelectorAll("img.secondary-image");

    formDataPrincipalImage.append("isItMainFile", 'true');
    formDataPrincipalImage.append("stringFile", principalImage.src);
    formDataPrincipalImage.append("productId", productId);

    await axios.post(`${env.API_URL}/File/Create`, formDataPrincipalImage);


    for (const item of Array.from(secondaryImage)) {
        const formDataSecondaryImage = new FormData();

        formDataSecondaryImage.append("isItMainFile", 'false');
        formDataSecondaryImage.append("stringFile", item.src);
        formDataSecondaryImage.append("productId", productId);

        await axios.post(`${env.API_URL}/File/Create`, formDataSecondaryImage);
    }
};

const Page = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            price: 0,
            equityPrice: 0,
            quantity: 0,
            isCustomProduct: false,
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required('Nombre es un campo requerido')
                .min(3),
            price: Yup
                .number()
                .min(1, "Debe costar cierto valor."),
            quantity: Yup
                .number()
                .min(1, "Debe tener mas de 0 valor")
        }),

        onSubmit: saveProduct
    });

    const product = {
        product: { name: formik.values.name, price: formik.values.price, status: 'Nuevo',  isEditable: true },
        files: [ { stringFile: '/static/images/products/product_1.jpg', isItMainFile: true, isDefault: true  } ]
    };

    return (
        <>
            <Head>
                <title>
                    Nuevo producto | De hilos y perlas
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Agregar nuevo producto
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <ShopProductCard product={product} />
                        </Grid>


                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <form
                                onSubmit={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <Card>
                                    <CardHeader
                                        subheader="Agregue la información correcta y concisa."
                                        title="Producto"
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            <Grid
                                                item
                                                md={12}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="Nombre"
                                                    name="name"

                                                    error={Boolean(formik.touched.name && formik.errors.name)}
                                                    helperText={formik.touched.name && formik.errors.name}
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}

                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md={12}
                                                xs={12}
                                            >
                                                <TextField
                                                    multiline
                                                    rows={3}
                                                    fullWidth
                                                    label="Descripción"
                                                    name="description"

                                                    error={Boolean(formik.touched.description && formik.errors.description)}
                                                    helperText={formik.touched.description && formik.errors.description}
                                                    value={formik.values.description}
                                                    onChange={formik.handleChange}

                                                    variant="outlined"
                                                />
                                            </Grid>
                                            
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="Precio"
                                                    name="price"
                                                    type={'number'}

                                                    error={Boolean(formik.touched.price && formik.errors.price)}
                                                    helperText={formik.touched.price && formik.errors.price}
                                                    value={formik.values.price}
                                                    onChange={formik.handleChange}


                                                    variant="outlined"
                                                />
                                            </Grid>
                                            
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="Precio de capital"
                                                    name="equityPrice"
                                                    type={'number'}

                                                    error={Boolean(formik.touched.equityPrice && formik.errors.equityPrice)}
                                                    helperText={formik.touched.equityPrice && formik.errors.equityPrice}
                                                    value={formik.values.equityPrice}
                                                    onChange={formik.handleChange}

                                                    variant="outlined"
                                                />
                                            </Grid>


                                            <Grid
                                                item
                                                md={12}
                                                xs={12}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label="Cantidad"
                                                    name="quantity"
                                                    type={'number'}

                                                    error={Boolean(formik.touched.quantity && formik.errors.quantity)}
                                                    helperText={formik.touched.quantity && formik.errors.quantity}
                                                    value={formik.values.quantity}
                                                    onChange={formik.handleChange}


                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            p: 2
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            variant="contained"

                                            onClick={formik.handleSubmit}
                                        >
                                            Guardar información
                                        </Button>
                                    </Box>
                                </Card>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};



Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
