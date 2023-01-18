import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

import { Income } from '../components/dashboard/income';
import { NumberOfSale } from '../components/dashboard/number-of-sales';
import { Profits } from '../components/dashboard/profits';
import { Losses } from '../components/dashboard/iosses';


import { Sales } from '../components/dashboard/sales';
import { TrafficByOrders } from '../components/dashboard/traffic-by-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { useEffect, useState } from 'react';

import { getInformationForBudget } from './../__mocks__/dashboard';

const Page = () => {
    const [infoBudget, setInfoBudget] = useState({});

    useEffect(() => {
        getInformationForBudget().then(a => setInfoBudget(a));
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
                            <Profits profits={infoBudget.profits}/>
                        </Grid>

                        <Grid item xl={3} lg={3} sm={6} xs={12}>
                            <Losses sx={{ height: '100%' }} />
                        </Grid>





                        <Grid item lg={8} md={12} xl={9} xs={12}>
                            <Sales />
                        </Grid>

                        <Grid item lg={4} md={6} xl={3} xs={12}>
                            <TrafficByOrders sx={{ height: '100%' }} />
                        </Grid>

                        <Grid item lg={4} md={6} xl={3} xs={12}>
                            <LatestProducts sx={{ height: '100%' }} />
                        </Grid>

                        <Grid item lg={8} md={12} xl={9} xs={12}>
                            <LatestOrders />
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
