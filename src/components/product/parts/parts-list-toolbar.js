import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography
} from '@mui/material';
import { Search as SearchIcon } from './../../../icons/search';

import NextLink from 'next/link';



export const ParstListToolbar = (props) => (
    <Box {...props}>
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
            }}
        >
            <Typography
                sx={{ m: 1 }}
                variant="h4"
            >
                Partes para personalizar
            </Typography>
            <Box sx={{ m: 1, gap: '5px', display: 'flex' }}>                
                <NextLink href={"/Product/Parts/Create"}>
                    <Button color="primary" variant="outlined"> Ingresar partes </Button>
                </NextLink>
            </Box>
        </Box>


        
        <Box sx={{ mt: 3 }}>
            <Card>
                <CardContent>
                    <Box sx={{ maxWidth: 500 }}>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SvgIcon
                                            fontSize="small"
                                            color="action"
                                        >
                                            <SearchIcon />
                                        </SvgIcon>
                                    </InputAdornment>
                                )
                            }}
                            placeholder="Buscar producto"
                            variant="outlined"
                            disabled
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    </Box>
);
