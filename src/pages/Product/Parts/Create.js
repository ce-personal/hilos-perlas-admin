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
    MenuItem,
    FormControlLabel,
    Switch,
    Drawer,
    Divider,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { postCreateFile, postCreateNewPart, postCreatePartFile } from '../../../__mocks__/parts';
import { Upload } from '@mui/icons-material';

import { appFireBase } from '../../../utils/register-firebase';
import { getDownloadURL, getStorage, ref as refFire, uploadBytes } from "firebase/storage";

import { useRouter } from "next/router";
import React, { useState } from 'react';



const CategoryCreate = () => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [naturalImage, setNaturalImage] = useState([]);

    
    
    const toggleDrawer = (open) => setOpen({ open });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            step: 0,
            stringFileMain: '',
            isMultiPart: false
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .min(3, "Mínimo 3 caracteres")
                .required('Se requiere un nombre'),
            stringFileMain: Yup
                .string()
                .required()
                .min(5)
        }),
        onSubmit: (value) => onSubmit(value)
    });


    const onSubmit = async (value) => {
        const response = await postCreateNewPart(value);

        for (const item of naturalImage) {
            const file = await postCreateFile(item);

            const modelPartFile = {
                fileId: file.id,
                partId: response.id,
                name: item.name
            };

            await postCreatePartFile(modelPartFile);
        }

        router.push("/Product/Parts");
    };

    const setFileMain = (value) => formik.setFieldValue("stringFileMain", value);

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




    const loadTableFile = () => {
        const input = document.createElement("input");
        input.type = 'file';
        input.multiple = formik.values.isMultiPart;
        input.accept = 'image/*';

        input.click();


        setNaturalImage([]);
        input.onchange = async (e) => {
            const listFile = [];
            
            for (const item of e.target.files) {
                await uploadFile(item, (stringFile) => {
                    const model = {
                        name: item.name.split(".")[0],
                        stringFile
                    };

                    listFile.push(model);
                });
            }
            
            setNaturalImage(listFile);


            if (formik.values.isMultiPart) {
                setOpen(true);
            }
        }
    };

    const changeNameFile = (event) => {
        const element = event.target;
        const listNewFile = naturalImage.filter(a => {
            if (a.stringFile.trim() == element.getAttribute("file")) a.name = element.value?.toUpperCase().trim();
            return a;
        });

        setNaturalImage(listNewFile);
    };

    const removeFile = (stringFile) => {
        const listNewFile = naturalImage.filter(a => {
            if (a.stringFile.trim() != stringFile) return a;
        });

        setNaturalImage(listNewFile);
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
                                id="step"
                                name="step"
                                value={formik.values.step}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={0}>Selección de hilo</MenuItem>
                                <MenuItem value={1}>Selección de perlas</MenuItem>
                                <MenuItem value={2}>Selección de decoración</MenuItem>
                            </Select>
                        </FormControl>


                        <FormControlLabel
                            value="false"
                            control={<Switch color="primary" />}
                            label="¿Permite múltiples opciones?"

                            sx={{ marginTop: '15px' }}
                            id="isMultiPart"
                            name="isMultiPart"
                            onChange={formik.handleChange}
                        />

                        <FormControl fullWidth sx={{ marginTop: '20px', display: 'flex', flexDirection: 'row', gap: '12px', justifyContent: 'center' }}>
                            <div className='file-main' style={{ width: '48%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '100%', height: '165px', overflow: 'hidden', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.10)' }}>
                                    <img src={formik.values.stringFileMain || "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3?w=248&fit=crop&auto=format"} style={{ width: '100%', objectFit: 'cover', height: '100%', objectPosition: 'center' }} />
                                </div>

                                <Button onClick={() => createInputForImage(setFileMain)} variant='outlined' color='secondary' sx={{ marginTop: '8px', width: 'fit-content' }}> <Upload /> Archivo principal </Button>
                            </div>


                            <div className='file-main' style={{ width: '48%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '100%', height: '165px', overflow: 'hidden', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.10)' }}>
                                    <img src={formik.values.stringFileSecondary || "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=248&fit=crop&auto=format"} style={{ width: '100%', objectFit: 'cover', height: '100%', objectPosition: 'center' }} />
                                </div>

                                <Button onClick={() => loadTableFile()} variant='outlined' color='secondary' sx={{ marginTop: '8px', width: 'fit-content' }}> 
                                {
                                        naturalImage.length > 0 
                                            ?
                                               <p> {naturalImage.length} archivo(s) agregados </p>
                                            :
                                                <React.Fragment><Upload /> Archivo base</React.Fragment> 
                                }
                            </Button>
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







                <Drawer
                    anchor="right"
                    open={open}
                    onClose={() => toggleDrawer(false)}
                    PaperProps={{
                        style: {
                            maxWidth: '768px',
                            width: '100%'
                        }
                    }}
                >
                    <Typography variant='h5' textAlign={'center'} marginTop={'12px'} marginBottom={'12px'}>Edita los nombres</Typography>
                    <Divider />

                    <TableContainer component={Paper} sx={{ maxWidth: '95%', margin: 'auto', marginTop: '30px', marginBottom: '30px' }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="left">Nombre</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {naturalImage.map((row) => (
                                    <TableRow
                                        key={row.stringFile}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={{ width: '100px' }}> <Avatar sx={{ margin: 'auto' }} src={row.stringFile}/> </TableCell>
                                        
                                        <TableCell align="left"> 
                                            <input type={'text'} onChange={changeNameFile} style={{ border: '0', outline: 'none', fontFamily: 'inherit', fontSize: 'inherit' }} value={row.name} file={row.stringFile}/>
                                        </TableCell>
                                        
                                        <TableCell align='right'>
                                            <Button variant='outlined' onClick={() => removeFile(row.stringFile)}>Borrar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <Button variant='contained' sx={{ maxWidth: '200px', margin: '0 auto' }} onClick={() => setOpen(false)}> Guardar imagenes </Button>
                </Drawer>
            </Box>
        </>
    );
};

export default CategoryCreate;
