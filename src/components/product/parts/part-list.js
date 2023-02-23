// @mui
import { Box, Tabs, Tab, Typography, ImageList, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';


import { deletePartByPartId, getListPartByStep } from '../../../__mocks__/parts';

// ----------------------------------------------------------------------


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ListImage = (props) => {

    return (
        <Box sx={{ width: "90%", maxWidth: '600px', margin: 'auto' }}>
            <ImageList variant="masonry" cols={3} gap={8}>
                {(props.listImage || []).map((item) => (
                    <ImageListItem key={item.id}>
                        <img
                            src={`${item.fileMain.stringFile}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.fileMain.stringFile}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            loading="lazy"
                            style={{ borderRadius: '8px', cursor: 'pointer' }}

                            onDoubleClick={() => props.dbClick(item.id)}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
};


export default function PartList({ ...other }) {
    const [partList, setPartList] = useState([]);
    const [value, setValue] = useState(0);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const loadPartList = async () => {
        if (partList.length > 0) return;


        const response0 = await getListPartByStep(0);
        const response1 = await getListPartByStep(1);
        const response2 = await getListPartByStep(2);

        setPartList([response0.data, response1.data, response2.data]);
    };



    const deletePart = async (partId) => {
        const response = await deletePartByPartId(partId);
        if (!response) return alert("No se puede borrar ya que esta asignados a productos");
        
        alert("Parte borrada exitosamente");
        
        const response0 = await getListPartByStep(0);
        const response1 = await getListPartByStep(1);
        const response2 = await getListPartByStep(2);

        setPartList([response0.data, response1.data, response2.data]);
    };

    useEffect(() => {
        loadPartList();
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Selección de hilo" {...a11yProps(0)} />
                    <Tab label="Selección de perlas" {...a11yProps(1)} />
                    <Tab label="Selección de decoración" {...a11yProps(2)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <ListImage dbClick={deletePart} listImage={partList[0]} />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <ListImage dbClick={deletePart} listImage={partList[1]} />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <ListImage dbClick={deletePart} listImage={partList[2]} />
            </TabPanel>
        </Box>
    );
}







const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Bed',
    },
    {
        img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
        title: 'Books',
    },
    {
        img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
        title: 'Sink',
    },
    {
        img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
        title: 'Kitchen',
    },
    {
        img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
        title: 'Blinds',
    },
    {
        img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
        title: 'Chairs',
    },
    {
        img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
        title: 'Laptop',
    },
    {
        img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
        title: 'Doors',
    },
    {
        img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
        title: 'Storage',
    },
    {
        img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
        title: 'Candle',
    },
    {
        img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
        title: 'Coffee table',
    },
];