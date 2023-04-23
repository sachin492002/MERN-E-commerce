import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import { SignIn, Loading, Error, ProductImages, AddToCart, Stars, PageHero } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  const { id } = useParams();
  const { single_product_loading: loading, single_product_error: error, single_product: product, fetchSingleProduct } = useProductsContext();

  
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    console.log(id);
  }, [id]);

  const history = useHistory();
  function removeItem(event) {
    event.preventDefault();
    // console.log(sku);
    fetch("http://localhost:3001/remove-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: sku }),
    })
      .then((response) => response.json())
      .then((resData) => {
        if(resData.message === "Product has been deleted"){
          alert("Product removed successfully");
          history.push('/products');
        }
      })
      .catch((err) => console.log(err));
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error type='single-product' />;
  }

  const { name, price, description, stock, stars, reviews, _id: sku, company, image } = product;

  return (
      <Wrapper>
        <PageHero title={name} product />
        <div className='section section-center page'>
          <Link to='/products' className='btn'>
            back to products
          </Link>
          <div className='product-center'>
            <ProductImages image={image} />
            <section className='content'>
              <h2>{name}</h2>
              <Stars stars={(Math.random() * 5)+1} reviews={Math.floor(Math.random()*200)+1} />
              
              <h5 className='price'>{formatPrice(price)}</h5>
              <p className='desc display-linebreak'>{description}</p>
              <p className='info'>
                <span>Availability : </span>
                {stock > 0 ? `In Stock (${stock})` : 'out of stock'}
              </p>
              <p className='info'>
                <span>SKU : </span>
                {sku}
              </p>

              <p className='info'>
                <span>Brand : </span>
                {company}
              </p>
              <hr />
              
              { localStorage.getItem("loggedIn") === "true" && localStorage.getItem("Type")==="Buyer" ?  
                stock > 0 && <AddToCart product={product} />
                :
                <button className="submit-btn">
                  <Link to="/login"> Login to Buy </Link>
                </button>
                 
                }
                { localStorage.getItem("loggedIn") === "true" && localStorage.getItem("Type")==="Admin"   
                 && (<button onClick={removeItem} className="submit-btn">
                  Remove Product 
                </button>)
                }
            </section>
          </div>
        </div>
      </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .display-linebreak {
    white-space: pre-line;
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      width:100%;
      font-weight: 700;
    }
  }

  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .submit-btn {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background: var(--clr-primary-5);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
  .submit-btn:hover {
    color: var(--clr-white);
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
