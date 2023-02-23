import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const Profits = (props) => {
    const profits = parseFloat(props.profits?.replaceAll(',', '').replaceAll('.', ''));
    const income = parseFloat(props.income?.replaceAll(',', '').replaceAll('.', ''));

    const porc = parseInt((profits / income) * 100);

    return (
        <Card {...props}>
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
                            Ganancia
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            C$ {props.profits || "--"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'success.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <PeopleIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        pt: 2
                    }}
                >
                    <ArrowUpwardIcon color="success" />
                    <Typography
                        variant="body2"
                        sx={{
                            mr: 1
                        }}
                    > 
                        { porc || 0 }%
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        Según inversión
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
