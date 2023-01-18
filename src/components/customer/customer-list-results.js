import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { getCustomers } from '../../__mocks__/customers';

export const CustomerListResults = ({ ...rest }) => {
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        getCustomers()
            .then(a => setCustomers(a));
    }, [])

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Nombre </TableCell>
                                <TableCell> Email </TableCell>
                                <TableCell>
                                    Fecha de registro
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow
                                    key={customer.id}
                                >
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar
                                                src={customer.avatarUrl}
                                                sx={{ mr: 2 }}
                                            >
                                                {getInitials(customer.firstName + ' ' + customer.lastName)}
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {customer.firstName + ' ' + customer.lastName}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {customer.email}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(customer.date), 'dd/MM/yyyy')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    );
};

CustomerListResults.propTypes = {
    customers: PropTypes.array.isRequired
};
