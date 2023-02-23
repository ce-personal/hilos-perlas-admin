import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    FormControl,
    Select,
    MenuItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { postCreateNewPart } from '../../../__mocks__/parts';
import { Upload } from '@mui/icons-material';

import { appFireBase } from '../../../utils/register-firebase';
import { getDownloadURL, getStorage, ref as refFire, uploadBytes } from "firebase/storage";

import { useRouter } from "next/router"


const CategoryCreate = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            stepPart: 0,
            stringFileMain: '',
            stringFileSecondary: ''
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .min(3, "Mínimo 3 caracteres")
                .required('Se requiere un nombre'),
            stringFileMain: Yup
                .string()
                .min(5),
            stringFileSecondary: Yup
                .string()
                .min(5)
        }),
        onSubmit: (value) => onSubmit(value)
    });

    
    const onSubmit = async (value) => {
        await postCreateNewPart(value);
        router.push("/Product/Parts");
    };

    const setFileMain = (value) => formik.setFieldValue("stringFileMain", value)
    const setFileSecondary = (value) => formik.setFieldValue("stringFileSecondary", value);

    const createInputForImage = (callback) => {
        const input = document.createElement("input");
        input.type = 'file';
        input.click();

        input.onchange = (e) => uploadFile(e.target.files[0], callback);  
    };

    const uploadFile = async (file, callback) => {
    const storage = getStorage(appFireBase);
        const storageRef = refFire(storage, 'images/' + file.name);

        await uploadBytes(storageRef, file);
        const responseDownLoad = await getDownloadURL(storageRef);     

        callback(responseDownLoad);
    };


    return (
        <>
            <Head>
                <title>
                    Agregar categoría | De hilos y perlas
                </title>
            </Head>

            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth="sm">
                    <NextLink
                        href="/Product/Parts"
                        passHref
                    >
                        <Button
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                        >
                            Regresar
                        </Button>
                    </NextLink>

                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Generar una parte
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Ingresa los datos correctos para la categoría.
                            </Typography>
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            fullWidth
                            label="Nombre"
                            margin="normal"
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.description && formik.errors.description)}
                            fullWidth
                            helperText={formik.touched.description && formik.errors.description}
                            label="Descripción"
                            margin="normal"
                            name="description"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            variant="outlined"

                            multiline
                            rows={3}
                        />

                        <TextField
                            error={Boolean(formik.touched.price && formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                            fullWidth
                            label="Precio"
                            margin="normal"
                            name="price"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            variant="outlined"
                        />

                        <FormControl fullWidth sx={{ marginTop: '20px' }}>
                            <Select
                                labelId="select-pace"
                                id="stepPart"
                                name="stepPart"
                                value={formik.values.stepPart}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={0}>Selección de hilo</MenuItem>
                                <MenuItem value={1}>Selección de perlas</MenuItem>
                                <MenuItem value={2}>Selección de decoración</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ marginTop: '20px', display: 'flex', flexDirection: 'row', gap: '12px', justifyContent: 'center'  }}>
                            <div className='file-main' style={{ width: '48%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '100%', height: '165px', overflow: 'hidden', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.10)' }}>
                                    <img src={formik.values.stringFileMain || "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3?w=248&fit=crop&auto=format"} style={{ width: '100%', objectFit: 'cover', height: '100%', objectPosition: 'center' }}/>
                                </div>

                                <Button onClick={() => createInputForImage(setFileMain)} variant='outlined' color='secondary' sx={{ marginTop: '8px', width: 'fit-content' }}> <Upload /> Archivo principal </Button>
                            </div>
                            

                            <div className='file-main' style={{ width: '48%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '100%', height: '165px', overflow: 'hidden', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.10)' }}>
                                    <img src={formik.values.stringFileSecondary || "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=248&fit=crop&auto=format"} style={{ width: '100%', objectFit: 'cover', height: '100%', objectPosition: 'center' }}/>
                                </div>

                                <Button onClick={() => createInputForImage(setFileSecondary)} variant='outlined' color='secondary' sx={{ marginTop: '8px', width: 'fit-content' }}> <Upload /> Archivo base </Button>
                            </div>
                        </FormControl>
                        

                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"

                                onClick={formik.handleSubmit}
                            >
                                Guardar información
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default CategoryCreate;
