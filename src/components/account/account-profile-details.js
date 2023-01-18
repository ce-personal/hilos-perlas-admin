import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


export const AccountProfileDetails = (props) => {
    const form = props.form;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <form
            autoComplete="off"
            noValidate
            {...props}
        >
            <Card>
                <CardHeader
                    subheader="La información puede ser editada."
                    title="Perfil"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth

                                label="Nombre"
                                name="firstName"

                                error={Boolean(form.touched.firstName && form.errors.firstName)}
                                helperText={form.touched.firstName && form.errors.firstName}
                                value={form.values.firstName}
                                onChange={form.handleChange}

                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Apellido"
                                
                                name="lastName"

                                error={Boolean(form.touched.lastName && form.errors.lastName)}
                                helperText={form.touched.lastName && form.errors.lastName}
                                value={form.values.lastName}
                                onChange={form.handleChange}

                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                
                                label="Contraseña"
                                name="password"

                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    
                                    endAdornment: 
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                }}

                                error={Boolean(form.touched.password && form.errors.password)}
                                helperText={form.touched.password && form.errors.password}
                                value={form.values.password}
                                onChange={form.handleChange}

                                variant="outlined"
                            />
                        </Grid>


                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                
                                label="Correo"
                                name="email"

                                error={Boolean(form.touched.email && form.errors.email)}
                                helperText={form.touched.email && form.errors.email}
                                value={form.values.email}
                                onChange={form.handleChange}

                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                
                                label="Número telefónico"
                                name="phoneNumber"

                                error={Boolean(form.touched.phoneNumber && form.errors.phoneNumber)}
                                helperText={form.touched.phoneNumber && form.errors.phoneNumber}
                                value={form.values.phoneNumber}
                                onChange={form.handleChange}

                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
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
                        variant="contained"

                        onClick={form.handleSubmit}
                    >
                        Guardar información
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
