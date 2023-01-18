import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export const NumberOfSale = (props) => (
    <Card
        sx={{ height: '100%' }}
    >
        <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        Numero de ventas
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        {props.numberOfSale || "--"}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: 'warning.main',
                            height: 56,
                            width: 56
                        }}
                    >
                        <InsertChartIcon />
                    </Avatar>
                </Grid>
            </Grid>


            <Box
                sx={{
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Typography
                    color="green"
                    sx={{
                        mr: 1
                    }}
                    variant="body2"
                >
                    100%
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="caption"
                >
                    Calculado automáticamente.
                </Typography>
            </Box>
        </CardContent>
    </Card>
);
