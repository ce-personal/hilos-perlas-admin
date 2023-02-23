import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { format } from 'date-fns';
import {
    Button,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import NextLink from 'next/link';



import { getListButtonByOrder, getListOrder, orderStatus, postNextStepOrderByOrderId } from '../../__mocks__/order';
import { SeverityPill } from '../severity-pill';
import axios from 'axios';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TableOrderByStatus(props) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell> Nombre </TableCell>
                    <TableCell> Fecha de registro </TableCell>
                    <TableCell> Estado </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.orders?.filter(a => a.status == props.status).map((order) => (
                    <TableRow
                        key={order.id}
                    >
                        <TableCell>
                            {order.name}
                        </TableCell>

                        <TableCell>
                            {format(new Date(order.date), 'dd/MM/yyyy')}
                        </TableCell>

                        <TableCell>
                            <SeverityPill
                                color="success"
                                sx={{ textTransform: 'capitalize' }}
                            >
                                {orderStatus[order.status]}
                            </SeverityPill>
                        </TableCell>

                        <TableCell align='right'>
                            <NextLink href={`/Order/Details?orderId=${order.id}`}>
                                <Button sx={{ marginRight: '8px' }} variant='outlined'>Detalle</Button>
                            </NextLink>

                            {
                                getListButtonByOrder(order) != null 
                                ?
                                    <Button variant='outlined' onClick={() => getListButtonByOrder(order).callback()}>
                                        {getListButtonByOrder(order).text}
                                    </Button>
                                : 
                                    null
                            }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}





export const OrderListResults = () => {
    const [orders, setorders] = useState([]);
    const [value, setValue] = useState(0);

    useEffect(() => {
        getListOrder().then(a => setorders(a));
    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const updateOrderLine = async(orderId) => {
        const response = await postNextStepOrderByOrderId(orderId);
        if (response != 200) return;

        getListOrder().then(a => setorders(a));

        alert("Cambio de estado realizado de forma correcta")
    };

    window.updateOrderLine = updateOrderLine;


    return (
        <React.Fragment>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {
                        orderStatus.map((a) => (
                            <Tab key={a} label={a} {...a11yProps(a)} />
                        ))
                    }
                </Tabs>
            </Box>
            
            {
                [0, 1, 2, 3].map(a => (
                    <TabPanel key={a} value={value} index={a}>
                        <Card>
                            <PerfectScrollbar>
                                <Box sx={{ minWidth: 1050 }}>
                                    <TableOrderByStatus orders={orders} status={a}/>
                                </Box>
                            </PerfectScrollbar>
                        </Card>
                    </TabPanel>
                ))
            }
        </React.Fragment>
    );
};