import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';

import NextLink from 'next/link';

import { getProfileById } from "./../__mocks__/acount";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
    const { onSidebarOpen, ...other } = props;
    const settingsRef = useRef(null);

    const [userImage, setUserImage] = useState("");

    const loadInfoUser = async () => {
        const stringFile = JSON.parse(localStorage.getItem("userLogin")).stringFile;
        setUserImage(stringFile);
    };

    useEffect(() => {
        loadInfoUser();
    }, [])


    return (
        <>
            <DashboardNavbarRoot
                sx={{
                    left: {
                        lg: 280
                    },
                    width: {
                        lg: 'calc(100% - 280px)'
                    }
                }}
                {...other}>
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2
                    }}
                >
                    <IconButton
                        onClick={onSidebarOpen}
                        sx={{
                            display: {
                                xs: 'inline-flex',
                                lg: 'none'
                            }
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>


                    <Box sx={{ flexGrow: 1 }} />
                    
                    <NextLink href={"/Account"}>
                        <Avatar
                            ref={settingsRef}
                            sx={{
                                cursor: 'pointer',
                                height: 40,
                                width: 40,
                                ml: 1
                            }}
                            src={userImage}
                        >
                            <UserCircleIcon fontSize="small" />
                        </Avatar>
                    </NextLink>


                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onSidebarOpen: PropTypes.func
};
