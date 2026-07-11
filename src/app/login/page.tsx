"use client";

import React, { useState } from "react";
import { User, Phone, Briefcase, Key, Check, Mail } from "lucide-react";

const MOCK_EMPRESAS = [
  { id: "1", nombre: "Accenture (Alsina 124)" },
  { id: "2", nombre: "BID (Bolívar 250)" },
  { id: "3", nombre: "Globant (Tucumán 1)" },
  { id: "4", nombre: "Mercado Libre (Caseros 3039)" },
  { id: "other", nombre: "Otra / Particular (No listada)" }
];

export default function LoginRegistro() {
  const [activeTab, setActiveTab] = useState<"login" | "registro">("registro");
  
  // Estados para Registro
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  
  // Estados para Login
  const [loginTelefono, setLoginTelefono] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre && telefono) {
      setIsRegistered(true);
      setTimeout(() => {
        // Redirigir o simular login
        setIsLoggedIn(true);
      }, 1500);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginTelefono) {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 8rem)', padding: '2rem' }}>
        <div className="card" style={{ maxWidth: '450px', width: '100%', textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e6f4ea', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: 'var(--color-success)' }}>
            <Check size={36} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>¡Bienvenido, {nombre || "Cliente"}!</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Ya estás identificado. Tus compras ahora sumarán puntos automáticamente para canjear por premios.
          </p>
          <a href="/" className="btn-primary" style={{ width: '100%' }}>
            Ir al Menú
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 8rem)', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem' }}>
        
        {/* Pestañas */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid rgb(0 0 0 / 0.05)', marginBottom: '2rem' }}>
          <button 
            onClick={() => setActiveTab("registro")}
            style={{ 
              flex: 1, 
              paddingBottom: '1rem', 
              fontWeight: 700, 
              color: activeTab === "registro" ? "var(--color-primary)" : "var(--color-text-muted)", 
              borderBottom: activeTab === "registro" ? "3px solid var(--color-primary)" : "none",
              fontSize: '1.1rem' 
            }}
          >
            Registrarse
          </button>
          <button 
            onClick={() => setActiveTab("login")}
            style={{ 
              flex: 1, 
              paddingBottom: '1rem', 
              fontWeight: 700, 
              color: activeTab === "login" ? "var(--color-primary)" : "var(--color-text-muted)", 
              borderBottom: activeTab === "login" ? "3px solid var(--color-primary)" : "none",
              fontSize: '1.1rem' 
            }}
          >
            Ya tengo cuenta
          </button>
        </div>

        {activeTab === "registro" ? (
          <form onSubmit={handleRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Creá tu cuenta</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Identificate en segundos para pedir y acumular beneficios.</p>
            </div>

            {/* Input Nombre */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={16} /> Nombre Completo
              </label>
              <input 
                type="text" 
                required
                placeholder="Ej. Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgb(0 0 0 / 0.15)', fontSize: '1rem' }}
              />
            </div>

            {/* Input Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={16} /> Correo Electrónico
              </label>
              <input 
                type="email" 
                required
                placeholder="Ej. juan@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgb(0 0 0 / 0.15)', fontSize: '1rem' }}
              />
            </div>

            {/* Input Teléfono */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={16} /> Número de Celular
              </label>
              <input 
                type="tel" 
                required
                placeholder="Ej. 11 3456 7890 (Sin 0 ni 15)"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgb(0 0 0 / 0.15)', fontSize: '1rem' }}
              />
            </div>

            {/* Selector Empresa */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Briefcase size={16} /> ¿Dónde trabajás? (Opcional)
              </label>
              <select 
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgb(0 0 0 / 0.15)', fontSize: '1rem', backgroundColor: 'white' }}
              >
                <option value="">Selecciona tu empresa</option>
                {MOCK_EMPRESAS.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.nombre}</option>
                ))}
              </select>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                * Al seleccionar tu empresa, podés acceder a beneficios corporativos especiales.
              </span>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '0.9rem', marginTop: '0.5rem' }}>
              Registrarme y Pedir
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Ingresá a tu cuenta</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Ingresá tu celular para recuperar tus puntos e historial.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={16} /> Número de Celular
              </label>
              <input 
                type="tel" 
                required
                placeholder="Ej. 11 3456 7890"
                value={loginTelefono}
                onChange={(e) => setLoginTelefono(e.target.value)}
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgb(0 0 0 / 0.15)', fontSize: '1rem' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '0.9rem', marginTop: '0.5rem' }}>
              Ingresar
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
