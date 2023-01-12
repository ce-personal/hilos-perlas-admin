import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import ProductList from '../components/product/product-list';
import { maxWidth } from '@mui/system';

const Page = () => (
    <>
        <Head>
            <title>
                Products | De hilos y perlas
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
                <ProductListToolbar />

                <Box sx={{ pt: 3 }}>
                    <Grid
                        container
                        spacing={3}
                        sx={{ maxWidth: '1400px', margin: 'auto' }}
                    >
                        <ProductList />
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 3
                    }}
                >
                    <Pagination
                        color="primary"
                        count={3}
                        size="small"
                    />
                </Box>
            </Container>
        </Box>
    </>
);

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
