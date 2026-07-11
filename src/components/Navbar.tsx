"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { cart, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <a href="/" className="logo">
          El Nacional
        </a>
        <nav className="nav-links">
          <a href="/">Menú</a>
          <a href="/login">Mis Puntos</a>
          
          {/* Botón Carrito en Header */}
          <button 
            onClick={() => {
              if (totalItems > 0) setIsCartOpen(true);
            }}
            style={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: totalItems > 0 ? 'var(--color-primary)' : 'var(--color-text-muted)',
              cursor: totalItems > 0 ? 'pointer' : 'default',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'all var(--transition-fast)',
              backgroundColor: totalItems > 0 ? 'rgba(89, 154, 230, 0.1)' : 'transparent'
            }}
            title={totalItems > 0 ? "Ver mi pedido" : "El carrito está vacío"}
            disabled={totalItems === 0}
          >
            <ShoppingCart size={20} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Carrito</span>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: 'var(--color-secondary)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 800,
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {totalItems}
              </span>
            )}
          </button>

          <a href="/login" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Ingresar</a>
        </nav>
      </div>
    </header>
  );
}
