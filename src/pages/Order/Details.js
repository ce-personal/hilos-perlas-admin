import Head from 'next/head';
import { Box, Container, Grid, Typography, Button, Drawer, Divider } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useEffect, useState } from 'react';


import ShopProductCard from './../../components/product/product-card';
import { getProductsByOrderId } from "./../../__mocks__/products";
import { getOrderByOrderId, getListButtonByOrder, postNextStepOrderByOrderId } from "./../../__mocks__/order";

import NextLink from 'next/link';


import { styled } from '@mui/material/styles';
import moment from 'moment';

const CustomizedDrawer = styled(Drawer)`
    .MuiPaper-root {
        max-width: 600px;
        width: 100%; 
    }


    .group-info {
        max-width: 500px;
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 30px;
        width: 100%;

        p:nth-child(1) {
            font-size: 15.5px;
            font-weight: 500;
            color: #10B981;
        }

        p:nth-child(2) {
            margin-left: 17px;
            margin-top: 5px;
        }

        @media screen and (max-width: 600px) {
            max-width: 95%;
        }
    }

    .drawer-footer {
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-top: 12px;
        margin-bottom: 12px;
    }
`;

const Page = () => {
    const orderId = window.location.search.split("orderId=")[1];
    const [listProduct, setListProduct] = useState([]);
    const [order, setOrder] = useState({});

    const [buttonByOrder, setButtonByOrder] = useState(getListButtonByOrder(order));

    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        getProductsByOrderId(orderId).then(a => setListProduct(a));
        getOrderByOrderId(orderId).then(a => {
            setOrder(a);
            setButtonByOrder(getListButtonByOrder(a));
        });        
    }, [])


    const updateOrderLine = async(orderId) => {
        const response = await postNextStepOrderByOrderId(orderId);
        if (response != 200) return;

        getOrderByOrderId(orderId).then(a => {
            setOrder(a);
            setButtonByOrder(getListButtonByOrder(a));
        });   
        alert("Cambio de estado realizado de forma correcta")
    };

    window.updateOrderLine = updateOrderLine;


    const toggleDrawer = (value) => {
        setIsOpen(value);
    }

    return (
        <>
            <Head>
                <title>
                    Detalle de un pedido | De hilos y perlas
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={null} >
                    <Typography
                        sx={{ m: 1, marginBottom: '20px' }}
                        variant="h4"
                    >
                        Lista de productos dentro del pedido
                    </Typography>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '12px' }}>
                        <Button variant='contained' sx={{ marginRight: '8px' }} onClick={() => toggleDrawer(true)}>
                            Información
                        </Button>
                        {
                            buttonByOrder != null 
                                ?
                                    <Button variant='outlined' onClick={() => buttonByOrder.callback()}>
                                        {buttonByOrder.text}
                                    </Button>
                                : 
                                    null
                        }
                    </div>

                    <Grid container spacing={3} sx={{ paddingRight: '24px' }} >
                        {
                            listProduct.map((product) => {
                                product.product.isEditable = false;
                                return (
                                    <Grid key={product.product.id} item xs={12} sm={6} md={3}>
                                        <ShopProductCard 
                                            buttonInfo={
                                                <NextLink href={`/Product/Edit?ProductId=${product.product.id}`}>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                    >
                                                        Detalle
                                                    </Button>
                                                </NextLink>
                                            } 
                                            quantityBuy={`Cantidad pedida: ${product.quantity}`} 
                                            product={product} 
                                            />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>


                <CustomizedDrawer
                    anchor={"right"}
                    open={isOpen}
                    onClose={() => toggleDrawer(false)}
                >
                    <Typography sx={{ m: 2, textAlign: 'center' }} variant="h5">
                        Información del pedido
                    </Typography>

                    <Divider sx={{ maxWidth: '95%', marginLeft: '2.5%' }}/>
                
                    <main>
                        <div className='group-info'>
                            <p>Nombre: </p>
                            <p>{order.name}</p>
                        </div>

                        <div className='group-info'>
                            <p>Realizado él: </p>
                            <p>{moment(order.date).format("DD/MM/yyyy")}</p>
                        </div>
                        
                        <div className='group-info'>
                            <p>Se debe entregar él: </p>
                            <p>{moment(order.deliveryDate).format("DD/MM/yyyy")}</p>
                        </div>

                        <div className='group-info'>
                            <p>Ubicación: </p>
                            <p>{order.ubication}</p>
                        </div>
                    </main>

                    <Divider sx={{ maxWidth: '95%', marginLeft: '2.5%' }}/>
                    <Typography sx={{ m: 2, textAlign: 'center' }} variant="h6">
                        Información del cliente
                    </Typography>
                    <Divider sx={{ maxWidth: '95%', marginLeft: '2.5%' }}/>
                    
                                    
                    <main>
                        <div className='group-info'>
                            <p>Nombre completo: </p>
                            <p>{order.client?.name} {order.client?.lastName}</p>
                        </div>

                        <div className='group-info'>
                            <p>Número telefónico: </p>
                            <p>{order.client?.phoneNumber}</p>
                        </div>
                        
                        <div className='group-info'>
                            <p>Correo electrónico: </p>
                            <p>{order.client?.email}</p>
                        </div>
                    </main>



                    <div className='drawer-footer' onClick={() => toggleDrawer(false)}>
                        <Button variant='outlined'> Cerrar información </Button>
                    </div>
                    
                </CustomizedDrawer>
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
