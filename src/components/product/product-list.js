// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './product-card';
import { useEffect, useState } from 'react';


import axios from 'axios';
import { getProducts } from './../../__mocks__/products';
import env from './../../__mocks__/env';

// ----------------------------------------------------------------------

export default function ProductList({ ...other }) {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        if (products.length > 0) return;
        
        const response = await getProducts();
        setProducts(response);
    };

    useEffect(() => {
        loadProducts();
    });

    return (
        <Grid container spacing={3} sx={{ paddingRight: '24px' }} {...other}>
            {
                products.map((product) => (
                    <Grid key={product.product.id} item xs={12} sm={6} md={3}>
                        <ShopProductCard product={product} />
                    </Grid>
                ))
            }
        </Grid>
    );
}