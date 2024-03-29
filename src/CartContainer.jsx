import React from 'react'
import CartItem from './CartItem'
import { useGlobalContext } from './context'

const CartContainer = () => {
  const { state, dispatch } = useGlobalContext()
  
  if (state.cart.length === 0) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }

  return (
    <section className='cart'>
      <header>
        <h2>your bag</h2>
      </header>
      
      <div>
        { state.cart.map(item => 
            <CartItem key={item.id} {...item} />
          ) }
      </div>

      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${ state.totalPrice.toFixed(2) }</span>
          </h4>
        </div>
        <button
          className='btn clear-btn'
          onClick={() => dispatch({ type: 'CLEAR_CART' })}
        >
          clear cart
        </button>
      </footer>
    </section>
  )
}

export default CartContainer
