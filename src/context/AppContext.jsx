// SleepNest Global App Context
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

const initialState = {
  cart: [],
  wishlist: [],
  toasts: [],
  user: null,
  selectedCity: 'Chennai',
  searchQuery: '',
  compareList: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_CITY':
      return { ...state, selectedCity: action.payload };
    case 'ADD_TO_CART': {
      const exists = state.cart.find(
        (i) => i.id === action.payload.id && i.selectedSize === action.payload.selectedSize
      );
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.payload.id && i.selectedSize === action.payload.selectedSize
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((i) => i.cartId !== action.payload) };
    case 'UPDATE_QTY':
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.cartId === action.payload.cartId ? { ...i, qty: action.payload.qty } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST': {
      const inWishlist = state.wishlist.find((i) => i.id === action.payload.id);
      return {
        ...state,
        wishlist: inWishlist
          ? state.wishlist.filter((i) => i.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      };
    }
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, { ...action.payload, id: Date.now() }] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CITY':
      return { ...state, selectedCity: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('sleepnest_store');
      return saved ? { ...init, ...JSON.parse(saved) } : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    const { toasts, ...toSave } = state;
    localStorage.setItem('sleepnest_store', JSON.stringify(toSave));
  }, [state]);

  const addToCart = useCallback((product, selectedSize) => {
    const cartId = `${product.id}-${selectedSize}-${Date.now()}`;
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, selectedSize, cartId } });
    showToast('Added to cart!', 'success');
  }, []);

  const removeFromCart = useCallback((cartId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: cartId });
  }, []);

  const updateQty = useCallback((cartId, qty) => {
    if (qty < 1) return;
    dispatch({ type: 'UPDATE_QTY', payload: { cartId, qty } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const toggleWishlist = useCallback((product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    dispatch({ type: 'ADD_TOAST', payload: { message, type, id } });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), 3500);
  }, []);

  const isInWishlist = useCallback(
    (id) => state.wishlist.some((i) => i.id === id),
    [state.wishlist]
  );

  const cartCount = state.cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <AppContext.Provider
      value={{
        ...state,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        showToast,
        isInWishlist,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
