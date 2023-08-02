import React from 'react';
import Product from './Product';

const GridView = ({ products }) => {
  return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
    </div>
      </div>
  );
};

export default GridView;
