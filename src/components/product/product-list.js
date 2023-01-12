// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './product-card';
import { useState } from 'react';

import listProduct from './../../__mocks__/products';

// ----------------------------------------------------------------------

export default function ProductList({ ...other }) {
    const [products, setProducts] = useState(listProduct);

    return (
        <Grid container spacing={3} {...other}>
            {
                products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={3}>
                        <ShopProductCard product={product} />
                    </Grid>
                ))
            }
        </Grid>
    );
}