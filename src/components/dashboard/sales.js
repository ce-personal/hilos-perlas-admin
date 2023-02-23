import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';

import moment from 'moment';

export const Sales = (props) => {
    const theme = useTheme();


    const labels = [];


    // load labels 
    const date = new Date();
    date.setDate(date.getDate() - 6);

    for (let index = 0; index < 7; index++) {
        labels.push(moment(date).format("DD MMM", 'es'));
        date.setDate(date.getDate() + 1);
    }


    const data = {
        datasets: [
            {
                backgroundColor: '#3F51B5',
                barPercentage: 0.5,
                barThickness: 12,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: props.countOrder,
                label: 'Ventas por días',
                maxBarThickness: 7
            },
        ],
        labels
    };

    const options = {
        animation: false,
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        xAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary,
                    beginAtZero: true,
                    min: 0
                },
                gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: theme.palette.divider,
                    drawBorder: false,
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                    zeroLineColor: theme.palette.divider
                }
            }
        ],
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
            <CardHeader
                action={(
                    <Button
                        size="small"
                    >
                        Ultimos 7 dias
                    </Button>
                )}
                title="Últimas ventas"
            />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 400,
                        position: 'relative'
                    }}
                >
                    <Bar
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>
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
                >
                    Vista parcial
                </Button>
            </Box>
        </Card>
    );
};
