import { useState } from 'react';
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

export const NewProductDetails = (props) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            quantity: 0,
            uniquePiece: false,
            isCustomProduct: false
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required()
                .min(3),
        }),

        onSubmit: (value) => console.log(value)
    });



    return (
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
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormControlLabel
                                control={(
                                    <Checkbox
                                    color="primary"
                                    defaultChecked
                                    />
                                )}
                                label="¿Es una pieza única?"
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
                    >
                        Guardar información
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
