import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    //if found , increment quality
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    }

    //return new array with modified cartItems
    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, productToRemove) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
    //if found , increment quality
    if(existingCartItem.quantity === 1){
       return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    }

    //return new array with modified cartItems
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
};

const clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    totalCart: 0,
    addItemQuantity: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalCart, setTotalCart] = useState(0);

    useEffect(() => {
       const newCartCount = cartItems.reduce((total,cartItem) => total + cartItem.quantity, 0);
       setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newTotalCart = cartItems.reduce((total,cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        setTotalCart(newTotalCart);
     }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems,productToRemove));
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems,productToClear));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, clearItemFromCart, cartCount,totalCart };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
    
};