import React, { useState } from 'react';
import styled from 'styled-components';
import { Filters, ProductList, Sort, PageHero } from '../components';
import { useFilterContext } from '../context/filter_context';
import {AiFillFilter} from 'react-icons/ai';
const ProductsPage = () => {
  const { filters } = useFilterContext();
  const [showFilters, setShowFilters] = useState(window.innerWidth > 720);

  return (
    <main>
      <PageHero title="products" />
      <Wrapper className="page">
        <div className="flex flex-col flex-1">
          <div className="inline-flex">
            {showFilters && <Filters />}
            <div className="flex flex-col">
              <div className="inline-flex items-center" >
                <AiFillFilter className="bloack md:hidden mr-2 text-[var(--clr-primary-5)] text-lg" onClick={() => setShowFilters(!showFilters)}>
                  Filters
                </AiFillFilter>
                <Sort />
              </div>

              <div className="px-6 h-[100vh] overflow-y-scroll hide-scrollbar flex xl:flex-row">
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

const FilterButton = styled.button`
  /* Style your filter button here */
  margin-right: 1rem;
  padding: 0.5rem 1rem;
 
  color: white;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

export default ProductsPage;
