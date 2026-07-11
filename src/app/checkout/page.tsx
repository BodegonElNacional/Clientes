"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, MapPin, CreditCard, DollarSign, Clock, Check, Sparkles } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Checkout() {
  const { cart, cartSubtotal, cartPoints, clearCart } = useCart();
  const [tipoEntrega, setTipoEntrega] = useState<"mostrador" | "delivery">("mostrador");
  const [metodoPago, setMetodoPago] = useState<"mercadopago" | "efectivo">("mercadopago");
  
  // Datos de envío
  const [direccion, setDireccion] = useState("");
  const [aclaraciones, setAclaraciones] = useState("");
  
  // Pago en efectivo
  const [pagaCon, setPagaCon] = useState("");
  
  // Simulación de orden enviada
  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal = cartSubtotal;
  const costoEnvio = tipoEntrega === "delivery" ? 1200 : 0;
  const total = subtotal + costoEnvio;
  const puntosGanados = cartPoints;

  // Vuelto estimado si paga en efectivo
  const vuelto = pagaCon ? Number(pagaCon) - total : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 8rem)', padding: '1rem' }}>
        <div className="card" style={{ maxWidth: '480px', width: '100%', textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#e6f4ea', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: 'var(--color-success)' }}>
            <Check size={40} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: 800 }}>¡Pedido Recibido!</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.5' }}>
            Tu pedido está ingresando a la cocina. Podés seguir el estado desde el monitor o esperar el aviso.
          </p>

          <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: '12px', textAlign: 'left', marginBottom: '2rem', fontSize: '0.95rem' }}>
            <p style={{ marginBottom: '0.5rem' }}><strong>Entrega:</strong> {tipoEntrega === 'delivery' ? 'Delivery a domicilio' : 'Retiro por mostrador'}</p>
            {tipoEntrega === 'delivery' && <p style={{ marginBottom: '0.5rem' }}><strong>Dirección:</strong> {direccion}</p>}
            <p style={{ marginBottom: '0.5rem' }}><strong>Pago:</strong> {metodoPago === 'mercadopago' ? 'Pago Online (Aprobado)' : `Efectivo (Pagas con $${Number(pagaCon).toLocaleString()})`}</p>
            {metodoPago === 'efectivo' && vuelto > 0 && <p style={{ color: 'var(--color-success)', fontWeight: 600 }}><strong>Vuelto que te llevan:</strong> ${vuelto.toLocaleString()}</p>}
          </div>

          <a href="/" className="btn-primary" style={{ width: '100%' }}>
            Volver al Menú
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1000px' }}>
      
      {/* Botón de retorno */}
      <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '2rem', fontSize: '0.95rem' }}>
        <ArrowLeft size={18} /> Volver al menú
      </a>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
        
        {/* Lado Izquierdo: Formularios de envío y pago */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Tarjeta 1: Método de Entrega */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} /> ¿Cómo querés recibir tu pedido?
            </h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="button"
                onClick={() => setTipoEntrega("mostrador")}
                style={{ 
                  flex: 1, 
                  padding: '1.25rem', 
                  borderRadius: '16px', 
                  border: '2px solid',
                  borderColor: tipoEntrega === "mostrador" ? "var(--color-primary)" : "#e2e8f0",
                  backgroundColor: tipoEntrega === "mostrador" ? "#f0f7ff" : "white",
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--color-secondary)' }}>Mostrador (Take Away)</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', display: 'block' }}>Sin costo de envío • Retirás en caja</span>
              </button>
              
              <button 
                type="button"
                onClick={() => setTipoEntrega("delivery")}
                style={{ 
                  flex: 1, 
                  padding: '1.25rem', 
                  borderRadius: '16px', 
                  border: '2px solid',
                  borderColor: tipoEntrega === "delivery" ? "var(--color-primary)" : "#e2e8f0",
                  backgroundColor: tipoEntrega === "delivery" ? "#f0f7ff" : "white",
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--color-secondary)' }}>Delivery a domicilio</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', display: 'block' }}>Costo: $1.200 • Llega rápido</span>
              </button>
            </div>

            {/* Dirección (si es Delivery) */}
            {tipoEntrega === "delivery" && (
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeIn 0.3s ease-out' }}>
                <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={16} /> Dirección de Entrega
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Ej. Alsina 124, Piso 4B (Accenture)"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgb(0 0 0 / 0.15)', fontSize: '1rem' }}
                />
                <input 
                  type="text"
                  placeholder="Aclaraciones (Ej: Tocar timbre de oficina, o dejar en recepción)"
                  value={aclaraciones}
                  onChange={(e) => setAclaraciones(e.target.value)}
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgb(0 0 0 / 0.15)', fontSize: '0.95rem' }}
                />
              </div>
            )}
          </div>

          {/* Tarjeta 2: Método de Pago */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={20} /> Método de Pago
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* MercadoPago */}
              <label 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1.25rem', 
                  borderRadius: '12px', 
                  border: '1px solid',
                  borderColor: metodoPago === "mercadopago" ? "var(--color-primary)" : "rgb(0 0 0 / 0.08)",
                  backgroundColor: metodoPago === "mercadopago" ? "#f0f7ff" : "white",
                  cursor: 'pointer'
                }}
              >
                <input 
                  type="radio" 
                  name="metodoPago" 
                  checked={metodoPago === "mercadopago"} 
                  onChange={() => setMetodoPago("mercadopago")}
                  style={{ width: '18px', height: '18px' }}
                />
                <div>
                  <strong style={{ display: 'block', fontSize: '1rem' }}>Pagar Online con Mercado Pago</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Débito, crédito o saldo en cuenta</span>
                </div>
              </label>

              {/* Efectivo */}
              <label 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1.25rem', 
                  borderRadius: '12px', 
                  border: '1px solid',
                  borderColor: metodoPago === "efectivo" ? "var(--color-primary)" : "rgb(0 0 0 / 0.08)",
                  backgroundColor: metodoPago === "efectivo" ? "#f0f7ff" : "white",
                  cursor: 'pointer'
                }}
              >
                <input 
                  type="radio" 
                  name="metodoPago" 
                  checked={metodoPago === "efectivo"}
                  onChange={() => setMetodoPago("efectivo")}
                  style={{ width: '18px', height: '18px' }}
                />
                <div>
                  <strong style={{ display: 'block', fontSize: '1rem' }}>Pagar en Efectivo</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Pagas al retirar o al recibir el repartidor</span>
                </div>
              </label>

              {/* Input "Paga con" (si es efectivo) */}
              {metodoPago === "efectivo" && (
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-surface)', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '0.5rem', animation: 'fadeIn 0.3s ease-out' }}>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <DollarSign size={16} /> ¿Con cuánto vas a pagar?
                  </label>
                  <input 
                    type="number"
                    required
                    placeholder="Ej. 12000"
                    value={pagaCon}
                    onChange={(e) => setPagaCon(e.target.value)}
                    style={{ padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid rgb(0 0 0 / 0.15)', fontSize: '1rem', maxWidth: '200px' }}
                  />
                  {vuelto > 0 ? (
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 600 }}>
                      Tu vuelto estimado será de: ${vuelto.toLocaleString()}
                    </span>
                  ) : pagaCon && Number(pagaCon) < total ? (
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-error)', fontWeight: 600 }}>
                      El monto debe ser igual o mayor al total del pedido.
                    </span>
                  ) : null}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Lado Derecho: Resumen del Pedido */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', borderBottom: '1px solid rgb(0 0 0 / 0.08)', paddingBottom: '0.75rem' }}>Resumen</h3>
            
            {/* Lista de Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>{item.imagen} {item.nombre} x{item.cantidad}</span>
                  <strong>${(item.precio * item.cantidad).toLocaleString()}</strong>
                </div>
              ))}
            </div>

            {/* Sumatoria de Precios */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid rgb(0 0 0 / 0.05)', paddingTop: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {tipoEntrega === "delivery" && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Envío</span>
                  <span>$1.200</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgb(0 0 0 / 0.08)', paddingTop: '0.75rem', fontSize: '1.2rem', fontWeight: 800 }}>
                <span style={{ color: 'var(--color-secondary)' }}>Total</span>
                <span style={{ color: 'var(--color-secondary)' }}>${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Banner de puntos a acumular */}
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', backgroundColor: '#fef7e0', borderRadius: '10px', fontSize: '0.8rem', color: '#b06000', fontWeight: 700, alignItems: 'center', marginBottom: '1.5rem' }}>
              <Sparkles size={16} />
              <span>¡Sumás +{puntosGanados} puntos El Nacional!</span>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.9rem' }}>
              {metodoPago === "mercadopago" ? "Pagar con Mercado Pago" : "Confirmar Pedido"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
