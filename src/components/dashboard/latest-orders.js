import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import moment from 'moment';

import NextLink from 'next/link';


import { getListButtonByOrder, orderStatus, postNextStepOrderByOrderId } from "./../../__mocks__/order";
import { getLastestOrder } from "./../../__mocks__/dashboard";

import { useEffect, useState } from 'react';


export const LatestOrders = (props) => {
    const [orders, setLastestOrder] = useState(props.lastestOrder || [])

    const updateOrderLine = async(orderId) => {
        const response = await postNextStepOrderByOrderId(orderId);
        if (response != 200) return;

        getLastestOrder().then(a => setLastestOrder(a));

        alert("Cambio de estado realizado de forma correcta")
    };

    window.updateOrderLine = updateOrderLine;


    useEffect(() => {
        getLastestOrder().then(a => setLastestOrder(a));
    }, [])


    return (
        <Card>
            <CardHeader title="Últimos pedidos" />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Cliente
                                </TableCell>
                                
                                <TableCell>
                                    Fecha de entrega
                                </TableCell>
                                
                                <TableCell>
                                    Estado
                                </TableCell>

                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    hover
                                    key={order.id}
                                >
                                    <TableCell>
                                        {order.name}
                                    </TableCell>
                                    <TableCell>
                                        {moment(order.date).format("DD/MM/yyyy")}
                                    </TableCell>
                                    <TableCell align='center'>
                                        <SeverityPill
                                            color="success"
                                            sx={{ textTransform: 'capitalize' }}
                                        >
                                            {orderStatus[order.status]}
                                        </SeverityPill>
                                    </TableCell>

                                    <TableCell align="right">
                                        <NextLink href={`/Order/Details?orderId=${order.id}`}>
                                            <Button variant='outlined' sx={{ marginRight: '5px' }}>Detalle</Button>
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
                </Box>
            </PerfectScrollbar>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <NextLink href="/Order">
                    <Button
                        color="primary"
                        endIcon={<ArrowRightIcon fontSize="small" />}
                        size="small"
                        variant="text"
                    >   
                        Ir a vista
                    </Button>
                </NextLink>
            </Box>
        </Card>
    );
}
