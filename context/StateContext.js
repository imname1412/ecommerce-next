import React , { createContext , useContext, useState, useEffect} from 'react'
import { toast } from 'react-hot-toast'


const Context = createContext()

const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [totalQuantities, setTotalQuantities] = useState()
    const [qty, setQty] = useState(1)

    const incQty = () => {
        setQty((prev) => prev + 1)
    }
    const decQty = () => {
        setQty((prev) => {
            if(prev - 1 < 0) return 1
            return prev - 1
        })
    }

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)

        if(checkProductInCart){
            setTotalPrice((prevTotalPrice) => prevTotalPrice + (product.price * quantity))
            setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity)


        }
    }


  return (
    <Context.Provider value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
    }}
    >
        {children}
    </Context.Provider>
  )
}

export default StateContext

export const useStateContext = () => useContext(Context)
