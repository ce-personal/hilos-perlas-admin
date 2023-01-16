import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
};

import { appFireBase } from './../../utils/register-firebase';
import { getDownloadURL, getStorage, ref as refFire, uploadBytes } from "firebase/storage";
import { useEffect, useState } from 'react';


export const AccountProfile = (props) => {
    const [cover, setCover] = useState("");

    const createInputToImage = () => {
        const input = document.createElement("input");
        input.type = 'file';
        input.click();

        
        input.onchange = (e) => uploadFile(e.target.files[0]);  
    };
    
    const uploadFile = async (file) => {
        const storage = getStorage(appFireBase);
        const storageRef = refFire(storage, 'images/' + file.name);
        
        await uploadBytes(storageRef, file);
        const responseDownLoad = await getDownloadURL(storageRef);     
        
        setCover(responseDownLoad);
    };

    const init = () => {
        setCover(props.form.values.stringFile || user.avatar)
    };
    
    useEffect(() => {
        init();
    })
    
    return (
        <Card {...props}>
        <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Avatar
                    src={cover}
                    sx={{
                        height: 64,
                        mb: 2,
                        width: 64
                    }}

                    className="image-avatar"
                />
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {`${props.form.values.firstName} ${props.form.values.lastName}`}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {props.form.values.phoneNumber}
                </Typography>
            </Box>
        </CardContent>
        <Divider />
        <CardActions>
            <Button
                color="primary"
                fullWidth
                variant="text"

                onClick={createInputToImage}
            >
                Actualizar imagen
            </Button>
        </CardActions>
    </Card>
    )
}