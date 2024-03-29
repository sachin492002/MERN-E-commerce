import React,{useState} from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';

const Filters = () => {
    const {
        filters: {
            category,
            company,
            min_price,
            price,
            max_price,
            shipping,
        },
        updateFilters,
        clearFilters,
        all_products,
    } = useFilterContext();

    const categories = getUniqueValues(all_products, 'category');
    const companies = getUniqueValues(all_products, 'company');
    
    
    
    return (
        <Wrapper>
          
            <div className="form-control">
                <h5>category</h5>
                <div>
                    {categories.map((c, index) => {
                        return (
                            <button
                                key={index}
                                onClick={updateFilters}
                                type="button"
                                name="category"
                                className={`${category === c.toLowerCase() ? 'active' : null}`}
                            >
                                {c}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="form-control">
                <h5>company</h5>
                <select
                    name="company"
                    value={company}
                    onChange={updateFilters}
                    className="company"
                >
                    {companies.map((c, index) => {
                        return (
                            <option key={index} value={c}>
                                {c}
                            </option>
                        );
                    })}
                </select>
            </div>



            <div className="form-control slider">
                <h5>price</h5>
                <p className="text-grey-800">{formatPrice(price)}</p>
                <input
                    type="range"
                    name="price"
                    onChange={updateFilters}
                    // className='w-full h-1 mb-6 rounded-lg cursor-pointer range-sm'
                    min={min_price}
                    max={max_price}
                    value={price}
                />
            </div>

            <div className="form-control">
                <label htmlFor="shipping">free shipping</label>
                <input
                    type="checkbox"
                    name="shipping"
                    id="shipping"

                    onChange={updateFilters}
                    checked={shipping}
                />
            </div>


            <button type="button" className="clear-btn" onClick={clearFilters}>
                clear filters
            </button>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  max-width: 30%;
  padding-left: 2rem;
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    overflow-clip: 20%;
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
