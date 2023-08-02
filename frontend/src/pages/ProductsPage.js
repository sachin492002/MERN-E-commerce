import React from 'react';
import styled from 'styled-components';
import { Filters, ProductList, Sort, PageHero } from '../components';
import {useFilterContext} from "../context/filter_context";


const ProductsPage = () => {
    const {
        filters: {
            text,
            category,
            company,
            color,
            min_price,
            price,
            max_price,
            shipping,
        },
        updateFilters,
        clearFilters,
        all_products,
    } = useFilterContext();
    return (
        <main>
            <PageHero title='products' />
            <Wrapper className='page'>
                <div className='flex flex-col flex-1'>
                    <div className='flex inline-flex '>
                    <Filters/>
                        <div className="flex flex-col">
                        <Sort />
                    <div className='px-6 h-[100vh] overflow-y-scroll hide-scrollbar flex xl:flex-row'>
                        <ProductList />
                    </div>
                    </div>
                    </div>
                </div>
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
