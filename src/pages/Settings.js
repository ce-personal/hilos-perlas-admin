import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SettingsNotifications } from '../components/settings/settings-notifications';
import { SettingsPassword } from '../components/settings/settings-password';

const Page = () => (
  <>
    <Head>
      <title>
        Configuración | De hilos y perlas
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
          Configuraciones
        </Typography>
        <SettingsNotifications />
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
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
