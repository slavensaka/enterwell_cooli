'use client';

import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductsViewModel } from '@/view-models/ProductsViewModel';
import LoadingContainer from '@/components/LoadingContainer/LoadingContainer';
import styles from './ProductsView.module.scss';

const ProductsView = observer(() => {
  const [viewModel] = useState(() => new ProductsViewModel());

  useEffect(() => {
    viewModel.loadProducts();
  }, [viewModel]);

  if (viewModel.error) {
    return (
      <div className={styles.container}>
        <h1>Products</h1>
        <p className={styles.error}>{viewModel.error}</p>
      </div>
    );
  }

  return (
    <LoadingContainer isLoading={viewModel.isLoading}>
      <div className={styles.container}>
        <h1>Products</h1>
        <div className={styles.grid}>
          {viewModel.products.map(product => (
            <div key={product.id} className={styles.card}>
              <h2>{product.name}</h2>
              <p className={styles.price}>${product.price.toFixed(2)}</p>
              <p className={styles.description}>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </LoadingContainer>
  );
});

export default ProductsView;
