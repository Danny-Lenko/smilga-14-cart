const reducer = (state, action) => {

   const removeItem = (id) => {
     const cartFiltered = state.cart.filter(item => item.id !== id)
     return { ...state, cart: cartFiltered }
   }
 
   if (action.type === 'DATA_FETCH') {
     return {
       ...state,
       cart: action.payload,
       loading: false
     }
   }
 
   if (action.type === 'CALC_AMOUNT') {
     const itemsNum = state.cart.map(item => item.amount)
       .reduce((a,b) => a+b, 0)
     const itemsSum = state.cart.map(item => item.price * item.amount)
       .reduce((a,b) => a+b, 0)
     
     return {
       ...state,
       totalItems: itemsNum,
       totalPrice: itemsSum
     }
   }
 
   if (action.type === 'REMOVE_ITEM') {
     return removeItem(action.payload)
   }
 
   if (action.type === 'CLEAR_CART') {
     return { ...state, cart: [] }
   }
 
   if (action.type === 'INCREASE') {
     const newValue = state.cart.map(item => (
       item.id === action.payload
       ? {...item, amount: item.amount + 1}
       : item
     ))
     return { ...state, cart: newValue }
   }
 
   if (action.type === 'DECREASE') {
     const currentItem = state.cart.find(item => item.id === action.payload)
     if (currentItem.amount < 2) return removeItem(action.payload)
 
     const newValue = state.cart.map(item => (
       item.id === action.payload
       ? {...item, amount: item.amount - 1}
       : item
     ))
     return { ...state, cart: newValue }
   }
 
   throw new Error('no matching action type')
 }

 export default reducer