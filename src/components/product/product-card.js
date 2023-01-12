// @mui
import { Box, Card, Link, Typography, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import Label from './../label';

// firebase
import { appFireBase } from './../../utils/register-firebase';
import { getDownloadURL, getStorage, ref as refFire, uploadBytes } from "firebase/storage";
import { Fragment, useState } from 'react';
import { Upload, UploadFile, UploadRounded } from '@mui/icons-material';




// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: '8px 8px 0px 0px'
});


const StyledHoverProduct = styled("div")({
    "&:not(.isEditable)": {
        position: 'relative',
        transition: '.5s',
        
        "&:hover": {
            "&:before": {
                content: '""',
                backgroundColor: '#00000085',
                position: 'absolute',
                height: '100%',
                width: '100%',
                zIndex: 1,
                cursor: 'pointer',
                borderRadius: '8px 8px 0px 0px',
            },
        
            "&:after": {
                content: '"Subir imagen"',
                position: 'absolute',
                zIndex: 3,
                top: '50%',
                color: 'white',
                padding: '8px 30px',
                border: '1px solid #fff',
                borderRadius: '8px',
                left: 'calc(50% - 80px)',
                top: 'calc(50% - 21px)',
                cursor: 'pointer'
            }
        }
    }
});


const StyledSecondaryFile = styled("div")({
    'display': 'none',

    "&:not(.isEditable)": {
        zIndex: 100,
        minHeight: '100%',
        position: 'absolute',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        left: '-25px',
    
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '4px',
    
        '& > *': {
            borderRadius: '8px',
            width: '50px',
            height: '50px',
            backgroundColor: '#6e717f94 !important',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
    
            'img': {
                borderRadius: '8px',
                objectPosition: 'center',
                objectFit: 'initial'
            }
        }
    },
});


// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
    const { name, price, status, isEditable } = product;
    
    const [cover, setCover] = useState(product.cover);
    const [secondaryFile, setSecondaryFile] = useState([]);
    
    const createInputForImage = () => {
        const input = document.createElement("input");
        input.type = 'file';
        input.click();

        input.onchange = (e) => uploadFile(e.target.files[0], setCover);  
    };

    const uploadFile = async (file, callback) => {
        const storage = getStorage(appFireBase);
        const storageRef = refFire(storage, 'images/' + file.name);

        await uploadBytes(storageRef, file);
        const responseDownLoad = await getDownloadURL(storageRef);     

        callback(responseDownLoad);
    };
    
    

    const createSecondImage = () => {
        const input = document.createElement("input");
        input.type = 'file';
        input.multiple = 'true'
        input.click();

        input.onchange = (e) => {
            const files = secondaryFile;

            Array.from(e.target.files).map((file) => {
                uploadFile(file, (cover) =>  { 
                    files.push({ cover })
                    setSecondaryFile([...files]); 
                });  
            });
        } 
    };


    return (
        <Card sx={{ overflow: 'initial' }}>
            <div style={{ position: 'relative' }}>
                <StyledHoverProduct onClick={createInputForImage} className={!isEditable ? 'isEditable' : ''}>
                    <Box sx={{ pt: '100%', position: 'relative' }}>
                        {status && (
                            <Label
                                variant="filled"
                                color={(status === 'sale' && 'error') || 'info'}
                                sx={{
                                    zIndex: 9,
                                    top: 16,
                                    right: 16,
                                    position: 'absolute',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {status}
                            </Label>
                        )}

                        <StyledProductImg alt={name} src={cover} className="principal-image" />
                    </Box>
                </StyledHoverProduct>

                <StyledSecondaryFile  className={(!isEditable ? 'isEditable' : '') + ' secondaryFile'}>
                    {
                        secondaryFile.map(a => <Paper elevation={3} key={a.cover} onClick={a.cover}> <StyledProductImg alt="Imagen secundaria" src={a.cover} className="cover secondary-image" /> </Paper>)
                    }

                    <Paper elevation={3} onClick={() => createSecondImage()}>
                        <Upload />
                    </Paper>
                </StyledSecondaryFile>
            </div>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover">
                    <Typography variant="subtitle2" noWrap>
                        {name}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        {price}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}