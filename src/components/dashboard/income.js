import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';

export const Income = (props) => (
    <Card
        sx={{ height: '100%' }}
        {...props}
    >
        <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                        Ingresos
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        C$ {props.income || "--"}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: 'error.main',
                            height: 56,
                            width: 56
                        }}
                    >
                        <MoneyIcon />
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
