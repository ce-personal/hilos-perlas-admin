import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import { orderStatus, orderColor } from '../../__mocks__/order';

export const TrafficByOrders = (props) => {
    const theme = useTheme();

    const data = {
        datasets: [
            {
                data: props.porcentageOrder.map(a => (a.cantidad / a.cantidadTotal) * 100),
                backgroundColor: orderColor,
                borderWidth: 8,
                borderColor: '#FFFFFF',
                hoverBorderColor: '#FFFFFF'
            }
        ],
        labels: orderStatus
    };

    const options = {
        animation: false,
        cutoutPercentage: 100,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    return (
        <Card>
            <CardHeader title="Estado de los pedidos" />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr'
                    }}
                >
                    {props.porcentageOrder.map(a => (
                        <Box
                            key={a.name}
                            sx={{
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                variant="body1"
                                style={{ textTransform: 'capitalize' }}
                            >
                                {a.name.split(/(?=[A-Z])/).join(" ")}
                            </Typography>
                            <Typography
                                variant="h4"
                            >
                                {(a.cantidad / (a.cantidadTotal || 1)) * 100}%
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};
