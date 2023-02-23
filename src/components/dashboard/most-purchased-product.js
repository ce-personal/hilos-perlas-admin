import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

import ArrowRightRounded from '@mui/icons-material/ArrowRightRounded';

export const MostPurchasedProduct = (props) => {
    return (
        <Card>
            <CardHeader
                subtitle="Productos en total"
                title="Productos mas venvidos"
            />
            <Divider />
            <List>
                {props.bestSellers.map((product, i) => (
                    <ListItem
                        divider={i < props.bestSellers.length - 1}
                        key={product.id}
                    >
                        <ListItemText
                            primary={product.name}
                            secondary={`Número de ventas: ${product.totalSales}`}
                        />
                        <IconButton
                            edge="end"
                            size="small"
                        >
                            <ArrowRightRounded />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    size="small"
                    variant="text"
                >
                    Vista parcial
                </Button>
            </Box>
        </Card>
    );
};