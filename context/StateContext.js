import React , { createContext , useContext, useState, useEffect} from 'react'
import { toast } from 'react-hot-toast'


const Context = createContext()

const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
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
        console.log(product)
        const checkProductInCart = cartItems.find((item) => item._id === product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + (product.price * quantity))
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity)

        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                   ...cartProduct , quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems)
        }else {
            product.quantity = quantity
            const UpdatedNewItem = [...cartItems , {...product}]

            setCartItems(UpdatedNewItem)
        }

        toast.success(`${qty} ${product.name} added to the cart.`)
    }

    const toggleCartItemQuantity = (id , value) => {
        const findProduct = cartItems.find((item) => item._id === id)
        const ProdIndex = cartItems.findIndex((prod) => prod._id === id)
        //? delete old product below JUST delete not append yet (params 3)
        const newCartItems = cartItems.filter((item) => item._id !== id)
        //? Copy [returns spliced items]
        const UpdateProd = newCartItems.splice(0) //* output []
        //* This for fix the order of product (correct position problem)

        if(value === 'plus'){
            UpdateProd.splice(ProdIndex , 0 ,{...findProduct , quantity: findProduct.quantity + 1})
            // const UpdateProd = newCartItems.splice(ProdIndex , 0 ,{...findProduct , quantity: findProduct.quantity + 1})
            // const UpdateQuantP = [...newCartItems , {...findProduct , quantity: findProduct.quantity + 1}]
            setCartItems(UpdateProd)
            setTotalPrice(prevPrice => prevPrice + findProduct.price)
            setTotalQuantities(prevQuan => prevQuan + 1)

        } else if(value === 'minus'){
            // * Check minus quant min 1 or cancel (0 item)
            if(findProduct.quantity > 1){
                // const UpdateQuantM = [...newCartItems , {...findProduct , quantity: findProduct.quantity - 1}]
                UpdateProd.splice(ProdIndex , 0 ,{...findProduct , quantity: findProduct.quantity - 1})
                setCartItems(UpdateProd)
                setTotalPrice(prevPrice => prevPrice - findProduct.price)
                setTotalQuantities(prevQuan => prevQuan - 1)
            }
        }
    }


  return (
    <Context.Provider value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
    }}
    >
        {children}
    </Context.Provider>
  )
}

export default StateContext

export const useStateContext = () => useContext(Context)

