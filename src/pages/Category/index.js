import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CateogoryListResults } from '../../components/category/category-list-results';
import { CategoryListToolbar } from '../../components/category/category-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';

const Page = () => (
    <>
        <Head>
            <title>
                Categoria | De hilos y perlas
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
                <CategoryListToolbar />
                <Box sx={{ mt: 3 }}>
                    <CateogoryListResults customers={[]} />
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
