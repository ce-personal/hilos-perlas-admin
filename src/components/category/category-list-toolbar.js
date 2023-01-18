import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';

import NextLink from 'next/link';


export const CategoryListToolbar = (props) => (
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
                Categoría de productos
            </Typography>
            <Box sx={{ m: 1 }}>
                <Button
                    startIcon={(<UploadIcon fontSize="small" />)}
                    sx={{ mr: 1 }}
                    disabled
                >
                    Importar
                </Button>
                <Button
                    startIcon={(<DownloadIcon fontSize="small" />)}
                    sx={{ mr: 1 }}
                    disabled
                >
                    Exportar
                </Button>
                <NextLink
                    href="/Category/Create"
                    passHref
                >
                    <Button
                        color="primary"
                        variant="contained"
                    >
                        Agregar categoría
                    </Button>
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
                                            color="action"
                                            fontSize="small"
                                        >
                                            <SearchIcon />
                                        </SvgIcon>
                                    </InputAdornment>
                                )
                            }}
                            placeholder="Buscar una categoría"
                            variant="outlined"
                            disabled
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    </Box>
);
