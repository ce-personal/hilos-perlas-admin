import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { Users as UsersIcon } from '../icons/users';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { List } from '@mui/icons-material';

const items = [
    {
        href: '/',
        icon: (<ChartBarIcon fontSize="small" />),
        title: 'Tablero'
    },
    {
        href: '/Customers',
        icon: (<UsersIcon fontSize="small" />),
        title: 'Personal'
    },
    {
        href: '/Product',
        icon: (<ShoppingBagIcon fontSize="small" />),
        title: 'Productos'
    },
    {
        href: '/Product/Parts',
        icon: (<SelectorIcon fontSize='small'/>),
        title: 'Partes'
    },
    {
        href: '/Order',
        icon: (<ShoppingBagIcon  />),
        title: 'Pedidos'
    },
    // {
    //     href: '/Account',
    //     icon: (<UserIcon fontSize="small" />),
    //     title: 'Mi cuenta'
    // },
    // {
    //     href: '/Category',
    //     icon: (<CogIcon fontSize="small" />),
    //     title: 'Categoría'
    // },
    // {
    //     href: '/register',
    //     icon: (<UserAddIcon fontSize="small" />),
    //     title: 'Register'
    // },
    // {
    //     href: '/404',
    //     icon: (<XCircleIcon fontSize="small" />),
    //     title: 'Error'
    // }
];

export const DashboardSidebar = (props) => {
    const { open, onClose } = props;
    const router = useRouter();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false
    });

    useEffect(
        () => {
            if (!router.isReady) {
                return;
            }

            if (open) {
                onClose?.();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.asPath]
    );

    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <div>
                    <Box sx={{ p: 3 }}>
                        <NextLink
                            href="/"
                            passHref
                        >
                            <a>
                                <Logo
                                    sx={{
                                        height: 42,
                                        width: 42
                                    }}
                                />
                            </a>
                        </NextLink>
                    </Box>
                    <Box sx={{ px: 2 }}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                px: 3,
                                py: '11px',
                                borderRadius: 1
                            }}
                        >
                            <div>
                                <Typography
                                    color="inherit"
                                    variant="subtitle1"
                                >
                                    Versión beta
                                </Typography>
                                <Typography
                                    color="neutral.400"
                                    variant="body2"
                                >
                                    Su nivel
                                    {' '}
                                    : Premium
                                </Typography>
                            </div>
                            <SelectorIcon
                                sx={{
                                    color: 'neutral.500',
                                    width: 14,
                                    height: 14
                                }}
                            />
                        </Box>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                </Box>
            </Box>
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        color: '#FFFFFF',
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.900',
                    color: '#FFFFFF',
                    width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};
