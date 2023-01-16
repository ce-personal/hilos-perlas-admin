import Head from 'next/head';
import React from 'react';

import { Box, Container, Grid, Typography, Snackbar } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import env from './../__mocks__/env';
import { useEffect, useState } from 'react';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Page = () => {
    const [saved, setSaved] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: "",
            stringFile: ''
        },
        validationSchema: Yup.object({
            firstName: Yup
                .string()
                .max(255)
                .required('Nombre es un campo requerido')
                .min(3, "Debe tener un mínimo de 3 caracteres."),
            email: Yup  
                .string()
                .email("Debe ser un correo valido")
                .required("Email es un campo requerido")
        }),

        onSubmit: (value) => sendAccount(value)
    });

    const init = async () => {
        const userAdmin = JSON.parse(localStorage.getItem("userLogin"));
        const response = await axios.get(`${env.API_URL}/Account/GetProfileById?userAdminId=${userAdmin.id}`);

        if (response.data.userAdmin.phoneNumber == null) response.data.userAdmin.phoneNumber = ""; 
        if (response.data.file != null) response.data.userAdmin.stringFile = response.data.file.stringFile;
        
        formik.setValues(response.data.userAdmin);
    };

    const sendAccount = async (value) => {
        const formData = new FormData();
        const userAdminId = JSON.parse(localStorage.getItem("userLogin")).id;
        formData.append("id", userAdminId);
    
        for (const key in value) {
            formData.append(key, value[key]);
        }
        
        await axios.post(`${env.API_URL}/Account/PostProfileByEdit`, formData);
    
    
    
        const image = document.querySelector(".image-avatar img");
        const formDataPrincipalImage = new FormData();
    
        formDataPrincipalImage.append("isItMainFile", 'true');
        formDataPrincipalImage.append("stringFile", image.src);
        formDataPrincipalImage.append("userAdminId", userAdminId);
    
        await axios.post(`${env.API_URL}/File/Create`, formDataPrincipalImage);
    
        setSaved(true);
    
        setTimeout(() => {
            setSaved(false)
        }, 6000);
    };

    useEffect(() => {
        init();
    }, [])

    return (
        <>
            <Snackbar open={saved} onClose={() => setSaved(false)} anchorOrigin={{ horizontal: "center", vertical: "bottom" }}>
                <Alert severity="success">Los datos se actualizaron correctamente!</Alert>
            </Snackbar>

            <Head>
                <title>
                    Cuenta | De hilos y perlas
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
                        Cuenta
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
                            <AccountProfile form={formik} />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <AccountProfileDetails form={formik} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
