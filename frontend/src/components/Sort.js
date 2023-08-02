import React from 'react';
import { useFilterContext } from '../context/filter_context';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import styled from 'styled-components';

const Sort = () => {
  const { filtered_products: products, grid_view, setGridView, setListView, sort, updateSort } = useFilterContext();

  return (
    // <Wrapper>
      <div className='flex w-full inline-flex inset-0 justify-between items-stretch'>
      <div className='flex flex-col md:flex-row justify-center items-center'>
          <div className='inline-flex '>
        <button type='button' className={`${grid_view ? 'active' : null}`} onClick={setGridView}>
          <BsFillGridFill className='mr-2 text-[var(--clr-primary-5)] text-lg'/>
        </button>

        <button type='button' className={`${!grid_view ? 'active' : null}`} onClick={setListView}>
          <BsList className='mr-2 text-[var(--clr-primary-5)] text-lg'/>
        </button>
          </div>
          <p className='md:ml-20 md:mt-4'>{products.length} products found</p>
      </div>

      <div className='absolute right-0'>
      <form>
        <label htmlFor='sort'>sort by</label>
        <select name='sort' id='sort' className='sort-input' value={sort} onChange={updateSort}>
          <option value='price-lowest'>price (lowest)</option>
          <option value='price-highest'>price (highest)</option>
          <option value='name-a'>name (a-z)</option>
          <option value='name-z'>name (z-a)</option>
        </select>
      </form>
      </div>
      </div>
    // </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;

  .clr {
    color: #ffb100;
    border: 1px solid #ffb100;
    border-radius: var(--radius);
  }

  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }

    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }

  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;

    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      svg {
        font-size: 1rem;
      }
    }

    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }

  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default Sort;
