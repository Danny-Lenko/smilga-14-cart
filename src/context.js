import React, { useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const defaultState = {
  cart: [],
  loading: true,
  totalItems: 0,
  totalPrice: 0
}

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => dispatch({ type:'DATA_FETCH', payload: data }))
      .catch(err => `RELOAD PAGE, ${err}`)
  }, [])

  useEffect(() => {
    dispatch({type: 'CALC_AMOUNT'})
  }, [state.cart])

  return (
    <AppContext.Provider value={{ state, dispatch }} >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
