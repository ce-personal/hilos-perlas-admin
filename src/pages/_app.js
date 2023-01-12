import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from '../contexts/auth-context';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';
import { theme } from '../theme';

import Login from './login';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { Fragment } from 'react';


registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	const getLayout = Component.getLayout ?? ((page) => page);


	return (
		<GoogleOAuthProvider clientId="325023130727-09031jf2g6p959lf47srnb2kgserk6an.apps.googleusercontent.com">
			<CacheProvider value={emotionCache}>
				<Head>
					<title>
						De hilos y perlas - Admin
					</title>
					<meta
						name="viewport"
						content="initial-scale=1, width=device-width"
					/>


					<link rel="shortcut icon" href="Logo.png" type="image/png" />

				</Head>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<AuthProvider>
							<AuthConsumer>
								{
									(auth) => auth.isAuthenticated
										? getLayout(<Component {...pageProps} {...auth} />)
										: auth.isLoading ? <Fragment /> : <Login {...pageProps} {...auth}/>
								}
							</AuthConsumer>
						</AuthProvider>
					</ThemeProvider>
				</LocalizationProvider>
			</CacheProvider>    
		</GoogleOAuthProvider>
	);
};

export default App;
