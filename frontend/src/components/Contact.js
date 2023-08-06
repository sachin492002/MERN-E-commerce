import React from 'react'
import styled from 'styled-components'

const Contact = () => {
return (
    <section className="bg-white mt-10 ">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center ">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-[var(--clr-dark-1)] sm:text-4xl">Sign up for our newsletter</h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-[var(--clr-primary-1)] md:mb-12 sm:text-xl">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
            <form action="#">
                <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                    <div className="relative w-full">
                        <label for="email" className="hidden mb-2 text-sm font-medium text-gray-900">Email address</label>
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-[var(--clr-primary-1)] " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                        </div>
                        <input className="block p-3 pl-10 w-full text-sm text-[var(--clr-dark-1)] bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required=""/>
                    </div>
                    <div>
                        <button type="" className="py-3 px-5 w-full text-sm font-medium text-center text-[var(--clr-white)] rounded-lg border cursor-pointer bg-[var(--clr-primary-1)] border-[var(--clr-primary-1)] sm:rounded-none sm:rounded-r-lg hover:bg-[var(--clr-primary-3)] focus:ring-4 focus:ring-[var(--clr-primary-1)]">Subscribe</button>
                    </div>
                </div>
                <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer">We care about the protection of your data.</div>
            </form>
        </div>
    </div>
  </section>
)
}

const Wrapper = styled.section`
  h3 {
    text-transform: capitalize;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--clr-grey-5);
  }
  .contact-form {
    width: 100vw;
    justify-content:space-between;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
    color:black;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
  }
  .form-input {
    border-right: none;
    color: var(--clr-grey-3);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .form-input::placeholder {
    color: var(--clr-black);
    text-transform: capitalize;
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
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`

export default Contact
