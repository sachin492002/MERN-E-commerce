import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const CartTotals = () => {
    const { total_amount, shipping_fee, cart } = useCartContext();
    const { myUser, loinWithRedirect } = useUserContext();

    function onToken(token){
        console.log(token);
    }

      // console.log(cart);
      let userName={buyerEmail:localStorage.getItem("Email")}
      const inputs = [userName,...cart];
      // console.log();
      
      const setOrder = () => { 
        return fetch('http://localhost:3001/orders', {
          method: 'POST',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      };
    
    return (
        <Wrapper>
            <div>
                <article>
                    <h5>
                        subtotal : <span>{formatPrice(total_amount)}</span>
                    </h5>
                    <p>
                        shipping fee : <span>{formatPrice(shipping_fee)}</span>
                    </p>
                    <hr />
                    <h4>
                        order total : <span>{formatPrice(total_amount + shipping_fee)}</span>
                    </h4>
                </article>
           
                    <StripeCheckout
                    name="Shopper Locals Store"
                    amount={(total_amount + shipping_fee)*100}
                    currency="INR"
                      token={onToken}
                      stripeKey="pk_test_51MBdYtSHqt13bUHuSugZS2VbDFbNFwLdglHgpb7umqF0FyhhaQSbyGv3br0HqUz92W69HUof8eahVBPlhHfwgg4u00x21secuO"
                    >
                    <button onClick={setOrder} className='btn' type='button'>
                        <div>Proceed to Pay</div>
                    </button>

                    </StripeCheckout>
                
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .hk{
    color:white;
    background-color: #ff6f61;
    padding: 1rem 1rem 1rem 1rem;

  }
  .btn{
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    color:white;
    background-color:hsl(22, 31%, 52%) ;
  }
`;

export default CartTotals;
