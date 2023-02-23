import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { OrderListResults } from '../../components/order/order-list-results';
import { OrderListToolbar } from '../../components/order/order-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';

const Page = () => {
    return (
        <>
            <Head>
                <title>
                    Pedidos | De hilos y perlas
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
                    <OrderListToolbar />
                    <Box sx={{ mt: 3 }}>
                        <OrderListResults customers={[]} />
                    </Box>
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
