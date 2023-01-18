import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';

export const TrafficByOrders = (props) => {
    const theme = useTheme();

    const data = {
        datasets: [
            {
                data: [12, 15, 22, 10],
                backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', '#000'],
                borderWidth: 8,
                borderColor: '#FFFFFF',
                hoverBorderColor: '#FFFFFF'
            }
        ],
        labels: ['Solicitados', 'Enviado', 'Entregados', 'Rechazado']
    };

    const options = {
        animation: false,
        cutoutPercentage: 80,
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

    const devices = [
        {
            title: 'Solicitados',
            value: 12,
            color: '#3F51B5'
        },
        {
            title: 'Enviado',
            value: 15,
            color: '#E53935'
        },
        {
            title: 'Entregados',
            value: 23,
            color: '#FB8C00'
        },
        {
            title: 'Rechazado',
            value: 12,
            color: '#FB8C00'
        }
    ];

    return (
        <Card {...props}>
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
                    {devices.map(({
                        color,
                        title,
                        value
                    }) => (
                        <Box
                            key={title}
                            sx={{
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                {title}
                            </Typography>
                            <Typography
                                style={{ color }}
                                variant="h4"
                            >
                                {value}
                                %
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};
