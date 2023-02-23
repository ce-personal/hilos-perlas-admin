import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

import { Income } from '../components/dashboard/income';
import { NumberOfSale } from '../components/dashboard/number-of-sales';
import { Profits } from '../components/dashboard/profits';
import { Losses } from '../components/dashboard/iosses';


import { Sales } from '../components/dashboard/sales';
import { TrafficByOrders } from '../components/dashboard/traffic-by-orders';
import { MostPurchasedProduct } from '../components/dashboard/most-purchased-product';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { useEffect, useState } from 'react';

import { getInformationForBudget, getCountOrderByWeek, getPorcentageByOrder, getListOfBestSellers, getLastestOrder } from './../__mocks__/dashboard';

const Page = () => {
    const [infoBudget, setInfoBudget] = useState({});
    const [countOrder, setCountOrder] = useState([]);
    const [porcentageOrder, setPorcentageOrder] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [lastestOrder, setLastestOrder] = useState([]);

    useEffect(() => {
        getInformationForBudget().then(a => setInfoBudget(a));
        getCountOrderByWeek().then(a => setCountOrder(a));
        getPorcentageByOrder().then(a => setPorcentageOrder(a));
        getListOfBestSellers().then(a => setBestSellers(a));
    }, []);

    return (
        <>
            <Head>
                <title>
                    Dashboard
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid item lg={3} sm={6} xl={3} xs={12}>
                            <NumberOfSale numberOfSale={infoBudget.numberOfSales} />
                        </Grid>

                        <Grid item xl={3} lg={3} sm={6} xs={12}>
                            <Income income={infoBudget.income} />
                        </Grid>

                        <Grid item xl={3} lg={3} sm={6} xs={12}>
                            <Profits profits={infoBudget.profits} income={infoBudget.income}/>
                        </Grid>

                        <Grid item xl={3} lg={3} sm={6} xs={12}>
                            <Losses sx={{ height: '100%' }} />
                        </Grid>





                        <Grid item lg={8} md={12} xl={9} xs={12}>
                            <Sales countOrder={countOrder}/>
                        </Grid>

                        <Grid item lg={4} md={6} xl={3} xs={12}>
                            <TrafficByOrders porcentageOrder={porcentageOrder} sx={{ height: '100%' }} />
                        </Grid>

                        <Grid item lg={4} md={6} xl={3} xs={12}>
                            <MostPurchasedProduct bestSellers={bestSellers} sx={{ height: '100%' }} />
                        </Grid>

                        <Grid item lg={8} md={12} xl={9} xs={12}>
                            <LatestOrders lastestOrder={lastestOrder}/>
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
