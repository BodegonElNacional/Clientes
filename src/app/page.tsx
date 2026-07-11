"use client";

import React, { useState, useEffect } from "react";
import { Clock, Utensils, Star, ShoppingBag, Plus, X, Minus, Sparkles, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabaseClient";

// Mock de productos para el catálogo interactivo (usado como fallback)
const PRODUCTOS = [
  { 
    id: "p1", 
    nombre: "Tapa de asado", 
    descripcion: "Porción abundante con papas rústicas al romero. Carne cocida lentamente.", 
    precio: 9500, 
    categoria: "carta",
    imagen: "🥩",
    puntos: 95
  },
  { 
    id: "p2", 
    nombre: "Bife de chorizo", 
    descripcion: "Bife de 400g con papas fritas o puré cremoso.", 
    precio: 12000, 
    categoria: "carta",
    imagen: "🥩",
    puntos: 120
  },
  { 
    id: "p3", 
    nombre: "Pechuga grille", 
    descripcion: "Pechuga de pollo deshuesada a la plancha con ensalada mixta.", 
    precio: 8500, 
    categoria: "carta",
    imagen: "🍗",
    puntos: 85
  },
  { 
    id: "p4", 
    nombre: "Milanesa Napolitana", 
    descripcion: "Milanesa de carne con salsa de tomate, jamón, queso mozzarella y orégano.", 
    precio: 9000, 
    categoria: "carta",
    imagen: "🥘",
    puntos: 90
  },
  // Platos del día
  { 
    id: "pd1", 
    nombre: "Bifes a la criolla", 
    descripcion: "Plato del día lunes. Cocidos en salsa criolla con papas españolas.", 
    precio: 8500, 
    categoria: "menu_dia",
    imagen: "🍲",
    puntos: 85
  },
  { 
    id: "pd2", 
    nombre: "Entraña al verdeo", 
    descripcion: "Plato del día martes. Entraña tierna con salsa suave de cebolla de verdeo y puré.", 
    precio: 9000, 
    categoria: "menu_dia",
    imagen: "🥩",
    puntos: 90
  },
  { 
    id: "pd3", 
    nombre: "Pescado Brótola", 
    descripcion: "Plato del día miércoles. Filete de brótola al limón con vegetales al vapor.", 
    precio: 8500, 
    categoria: "menu_dia",
    imagen: "🐟",
    puntos: 85
  },
  // Bebidas para upselling
  {
    id: "b1",
    nombre: "Gaseosa Línea Coca-Cola",
    descripcion: "Lata 354ml",
    precio: 1500,
    categoria: "bebida",
    imagen: "🥤",
    puntos: 15
  },
  {
    id: "b2",
    nombre: "Agua Saborizada",
    descripcion: "Botella 500ml",
    precio: 1200,
    categoria: "bebida",
    imagen: "🥤",
    puntos: 12
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<"menu_dia" | "carta" | "bebida">("menu_dia");
  
  // Producto actualmente seleccionado para abrir el modal
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Estado para la cantidad en el modal de detalle
  const [quantity, setQuantity] = useState(1);
  
  // Estado para saber si se le sumó el upselling de bebida en el detalle
  const [addUpsell, setAddUpsell] = useState(false);
  
  // Consumir el estado y las funciones del carrito compartido
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateCartQuantity,
    removeCartItem,
    cartSubtotal,
    cartPoints
  } = useCart();
  
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .eq('es_activo', true);
        if (!error && data && data.length > 0) {
          const mapped = data.map((p: any) => ({
            id: p.id,
            nombre: p.nombre,
            descripcion: p.descripcion,
            precio: Number(p.precio),
            categoria: p.categoria,
            imagen: p.imagen_url || "🍽️",
            puntos: p.puntos_ganados || 0,
            precio_puntos: p.precio_puntos
          }));
          setDbProducts(mapped);
        } else {
          setDbProducts(PRODUCTOS);
        }
      } catch (err) {
        console.error("Error fetching from supabase:", err);
        setDbProducts(PRODUCTOS);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = dbProducts.filter(p => p.categoria === activeCategory);

  const openProductDetail = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1);
    setAddUpsell(false);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    addToCart(selectedProduct, quantity, addUpsell);
    
    closeProductDetail();
    
    // Alerta visual de éxito al agregar
    setShowCartSuccess(true);
    setTimeout(() => {
      setShowCartSuccess(false);
    }, 2500);
  };

  return (
    <div style={{ paddingBottom: '6rem' }}>
      
      {/* Toast de éxito al agregar al carrito */}
      {showCartSuccess && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: 'var(--color-secondary)',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: 600,
          animation: 'slideIn 0.3s ease-out'
        }}>
          <div style={{ backgroundColor: 'var(--color-success)', color: 'white', borderRadius: '50%', padding: '0.2rem' }}>
            <Check size={16} />
          </div>
          <span>¡Producto agregado al pedido!</span>
        </div>
      )}

      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '3.5rem 1rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
            Bodegón El Nacional
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, margin: '0 auto 3.5rem auto', maxWidth: '600px' }}>
            Pedí online, sumá puntos y retirá rápido en nuestro mostrador.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => setActiveCategory("menu_dia")} className="btn-secondary" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-secondary)', padding: '0.9rem 2rem' }}>
              Ver Menú del Día
            </button>
            <a href="/login" className="btn-outline" style={{ borderColor: 'white', color: 'white', padding: '0.9rem 2rem' }}>
              <Star size={18} /> Mis Puntos
            </a>
          </div>
        </div>
      </section>

      {/* Banner de Combo destacado (Upselling directo en Home) */}
      <section className="container" style={{ marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
        <div 
          onClick={() => openProductDetail(PRODUCTOS[3])} // Abre milanesa napolitana
          className="card" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '1.5rem 2rem', 
            background: 'linear-gradient(to right, var(--color-secondary), #1e293b)',
            cursor: 'pointer',
            border: 'none'
          }}
        >
          <div style={{ color: 'white' }}>
            <div className="badge badge-accent" style={{ marginBottom: '0.5rem' }}>🔥 Combo del Día</div>
            <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Milanesa Napolitana + Bebida</h2>
            <p style={{ opacity: 0.8, marginTop: '0.25rem', fontSize: '0.95rem' }}>Ahorrá armando el combo y sumá doble puntaje.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: 'var(--color-accent)', fontSize: '2rem', fontWeight: 900, display: 'block' }}>$10.000</span>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>$10.500</span>
          </div>
        </div>
      </section>

      {/* Tabs de Selección de Menú */}
      <section className="container" style={{ marginTop: '4rem' }}>
        <div style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid rgb(0 0 0 / 0.05)', marginBottom: '2rem', overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '0.5rem' }}>
          <button 
            onClick={() => setActiveCategory("menu_dia")}
            style={{ 
              paddingBottom: '1rem', 
              fontWeight: 700, 
              color: activeCategory === "menu_dia" ? "var(--color-primary)" : "var(--color-text-muted)", 
              fontSize: '1.125rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottomWidth: '3px',
              borderBottomStyle: 'solid',
              borderBottomColor: activeCategory === "menu_dia" ? "var(--color-primary)" : "transparent"
            }}
          >
            Menú del Día
          </button>
          <button 
            onClick={() => setActiveCategory("carta")}
            style={{ 
              paddingBottom: '1rem', 
              fontWeight: 700, 
              color: activeCategory === "carta" ? "var(--color-primary)" : "var(--color-text-muted)", 
              fontSize: '1.125rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottomWidth: '3px',
              borderBottomStyle: 'solid',
              borderBottomColor: activeCategory === "carta" ? "var(--color-primary)" : "transparent"
            }}
          >
            Carta Tradicional
          </button>
          <button 
            onClick={() => setActiveCategory("bebida")}
            style={{ 
              paddingBottom: '1rem', 
              fontWeight: 700, 
              color: activeCategory === "bebida" ? "var(--color-primary)" : "var(--color-text-muted)", 
              fontSize: '1.125rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottomWidth: '3px',
              borderBottomStyle: 'solid',
              borderBottomColor: activeCategory === "bebida" ? "var(--color-primary)" : "transparent"
            }}
          >
            Bebidas
          </button>
        </div>

        {/* Grilla del Catálogo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="card" 
              onClick={() => openProductDetail(product)}
              style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'block' }}>{product.imagen}</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{product.nombre}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.4' }}>{product.descripcion}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-secondary)' }}>${product.precio.toLocaleString()}</span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-primary)', marginTop: '0.25rem', fontWeight: 600 }}>
                    +{product.puntos} pts
                  </span>
                </div>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgb(0 0 0 / 0.05)' }}>
                <button className="btn-primary" style={{ width: '100%', fontSize: '0.9rem' }}>
                  <Plus size={16} /> Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        ----------------- MODAL DE VISTA DETALLE DEL PLATO -----------------
      */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(10, 31, 68, 0.6)', // Azul oscuro con opacidad
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{
            maxWidth: '540px',
            width: '100%',
            backgroundColor: 'white',
            padding: '2.5rem',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {/* Botón cerrar */}
            <button 
              onClick={closeProductDetail}
              style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            {/* Encabezado */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '3rem' }}>{selectedProduct.imagen}</span>
              <div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{selectedProduct.nombre}</h2>
                <span className="badge badge-primary">+{selectedProduct.puntos} puntos El Nacional</span>
              </div>
            </div>

            {/* Descripción */}
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              {selectedProduct.descripcion}
            </p>

            {/* Ajuste de cantidad */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)', padding: '1rem 1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <span style={{ fontWeight: 600 }}>Cantidad</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <button 
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(q => q - 1)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', opacity: quantity <= 1 ? 0.5 : 1, border: 'none', cursor: quantity <= 1 ? 'default' : 'pointer' }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', border: 'none', cursor: 'pointer' }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* 
              BLOQUE DE UPSELLING (El motor comercial para subir el ticket promedio)
            */}
            {selectedProduct.categoria !== "bebida" && (
              <div style={{
                border: '2px solid #cbd5e1',
                borderRadius: '16px',
                padding: '1.25rem',
                backgroundColor: '#f8fafc',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-accent)', backgroundColor: 'var(--color-secondary)', borderRadius: '50%', padding: '0.25rem' }}>
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '0.25rem' }}>
                      ¿Sumamos la bebida? (Promo Combo)
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                      Agregá una Gaseosa helada por solo **+$1.000** adicionales (Ahorrás $500).
                    </p>
                    <button 
                      onClick={() => setAddUpsell(!addUpsell)}
                      className={addUpsell ? "btn-secondary" : "btn-outline"}
                      style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      {addUpsell ? "✓ Bebida Agregada" : "+ Agregar Gaseosa"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Totalizador del Modal y Botón de compra */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgb(0 0 0 / 0.08)', paddingTop: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block' }}>Total</span>
                <strong style={{ fontSize: '1.75rem', color: 'var(--color-secondary)', fontWeight: 900 }}>
                  ${((selectedProduct.precio + (addUpsell ? 1000 : 0)) * quantity).toLocaleString()}
                </strong>
              </div>
              <button 
                onClick={handleAddToCart}
                className="btn-primary" 
                style={{ padding: '0.9rem 2.5rem' }}
              >
                Agregar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 
        ----------------- MODAL DEL CARRITO -----------------
      */}
      {isCartOpen && cart.length > 0 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(10, 31, 68, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{
            maxWidth: '480px',
            width: '100%',
            backgroundColor: 'white',
            padding: '2rem',
            position: 'relative',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <button 
              onClick={() => setIsCartOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid rgb(0 0 0 / 0.08)', paddingBottom: '1rem' }}>
              <div style={{ backgroundColor: 'var(--color-surface)', padding: '0.5rem', borderRadius: '8px' }}>
                <ShoppingBag size={24} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Tu Pedido</h2>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)', padding: '1rem', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <span style={{ fontSize: '2rem' }}>{item.imagen}</span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{item.nombre}</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, color: 'var(--color-secondary)' }}>${(item.precio * item.cantidad).toLocaleString()}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'white', padding: '0.2rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
                          <button 
                            onClick={() => updateCartQuantity(index, -1)}
                            style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, width: '20px', textAlign: 'center' }}>{item.cantidad}</span>
                          <button 
                            onClick={() => updateCartQuantity(index, 1)}
                            style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeCartItem(index)}
                    style={{ marginLeft: '1rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.7 }}
                    title="Eliminar item"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px dashed rgb(0 0 0 / 0.1)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>
                <span>Subtotal</span>
                <span>${cartSubtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                <span>Puntos a sumar</span>
                <span>+{cartPoints} pts</span>
              </div>
              <a href="/checkout" className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '1.1rem', padding: '1rem' }}>
                Ir a Pagar ${cartSubtotal.toLocaleString()}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 
        ----------------- BARRA FLOTANTE DE CARRITO (STICKY BOTTOM BAR) -----------------
      */}
      {!isCartOpen && cart.length > 0 && (
        <div 
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '600px',
            backgroundColor: 'var(--color-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 900,
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '8px' }}>
              <ShoppingBag size={24} style={{ color: 'var(--color-accent)' }} />
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 800,
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cart.reduce((sum, item) => sum + item.cantidad, 0)}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: '1.1rem', color: 'white' }}>${cartSubtotal.toLocaleString()}</strong>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>Acumulás +{cartPoints} pts El Nacional</span>
            </div>
          </div>
          <div className="btn-primary" style={{ backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '0.9rem', pointerEvents: 'none' }}>
            Ver Pedido
          </div>
        </div>
      )}

    </div>
  );
}
