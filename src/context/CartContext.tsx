"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: any, quantity: number, addUpsell: boolean) => void;
  updateCartQuantity: (index: number, delta: number) => void;
  removeCartItem: (index: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartPoints: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Cargar carrito desde localStorage en el cliente
  useEffect(() => {
    const stored = localStorage.getItem("el_nacional_cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (e) {
        console.error("Error al parsear el carrito desde localStorage", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("el_nacional_cart", JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const addToCart = (product: any, quantity: number, addUpsell: boolean) => {
    const itemsToAdd: CartItem[] = [
      {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: quantity,
        imagen: product.imagen
      }
    ];

    if (addUpsell) {
      itemsToAdd.push({
        id: "b1-combo",
        nombre: "Gaseosa Línea Coca-Cola (Combo)",
        precio: 1000,
        cantidad: quantity,
        imagen: "🥤"
      });
    }

    setCart(prev => {
      const newCart = [...prev];
      itemsToAdd.forEach(newItem => {
        const existingIndex = newCart.findIndex(item => item.id === newItem.id);
        if (existingIndex >= 0) {
          newCart[existingIndex].cantidad += newItem.cantidad;
        } else {
          newCart.push(newItem);
        }
      });
      return newCart;
    });
  };

  const updateCartQuantity = (index: number, delta: number) => {
    setCart(prev => {
      const newCart = [...prev];
      if (newCart[index].cantidad + delta > 0) {
        newCart[index].cantidad += delta;
      }
      return newCart;
    });
  };

  const removeCartItem = (index: number) => {
    setCart(prev => {
      const filtered = prev.filter((_, i) => i !== index);
      if (filtered.length === 0) {
        setIsCartOpen(false);
      }
      return filtered;
    });
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  
  // Asumimos 1 punto por cada $100 pesos de compra
  const cartPoints = Math.round(cartSubtotal / 100);

  return (
    <CartContext.Provider value={{
      cart: isHydrated ? cart : [],
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateCartQuantity,
      removeCartItem,
      clearCart,
      cartSubtotal,
      cartPoints
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
}
