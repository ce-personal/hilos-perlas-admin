import { useEffect, useState } from 'react';
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

import NextLink from 'next/link';


import { getListCategory, postDeleteCategory } from './../../__mocks__/category';

export const CateogoryListResults = () => {
    const [cateogorys, setcateogorys] = useState([]);

    const removeCategory = async (categoryId) => {
        const codeResponse = await postDeleteCategory(categoryId);
        if (codeResponse != 200) return;


        const listCategory = cateogorys.filter(a => a.id != categoryId);
        setcateogorys(listCategory);
    };

    useEffect(() => {
        getListCategory()
            .then(a => setcateogorys(a));
    }, [])

    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Nombre </TableCell>
                                <TableCell> Descripción </TableCell>
                                <TableCell> Fecha de registro </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cateogorys.map((category) => (
                                <TableRow
                                    key={category.id}
                                >
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {category.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    
                                    <TableCell>
                                        {category.description}
                                    </TableCell>

                                    <TableCell>
                                        {format(new Date(category.date), 'dd/MM/yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        <NextLink href={`/Category/Edit?categoryId=${category.id}`}>
                                            <Button color="primary" variant="contained">
                                                Editar
                                            </Button>

                                        </NextLink>
                                        
                                        <Button
                                            color="warning"
                                            variant="contained"
                                            sx={{ marginLeft: '12px' }}

                                            onClick={() => removeCategory(category.id)}
                                        >
                                            Borrar
                                        </Button>
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

// CateogoryListResults.propTypes = {
//     cateogorys: PropTypes.array.isRequired
// };
