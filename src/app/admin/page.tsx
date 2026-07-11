"use client";

import React, { useState } from "react";
import "./admin.css";
import { 
  ShoppingBag, 
  Truck, 
  Clock, 
  User, 
  CheckCircle, 
  DollarSign, 
  XCircle, 
  ChevronRight, 
  AlertCircle,
  TrendingUp,
  RotateCcw,
  Plus,
  Trash2,
  Save,
  Coffee,
  Users,
  Search,
  BookOpen,
  Megaphone,
  Home,
  Sliders,
  Building,
  BarChart2,
  ArrowRight,
  Sparkles,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

// Mock inicial de productos para el ABM
const INITIAL_PRODUCTS = [
  { id: "p1", nombre: "Tapa de asado", descripcion: "Porción abundante con papas rústicas al romero. Carne cocida lentamente.", precio: 9500, precio_puntos: 950, puntos_ganados: 95, categoria: "carta", dia_semana: 0, imagen: "🥩" },
  { id: "p2", nombre: "Bife de chorizo", descripcion: "Bife de 400g con papas fritas o puré cremoso.", precio: 12000, precio_puntos: 1200, puntos_ganados: 120, categoria: "carta", dia_semana: 0, imagen: "🥩" },
  { id: "p3", nombre: "Pechuga grille", descripcion: "Pechuga de pollo deshuesada a la plancha con ensalada mixta.", precio: 8500, precio_puntos: 850, puntos_ganados: 85, categoria: "carta", dia_semana: 0, imagen: "🍗" },
  { id: "p4", nombre: "Milanesa Napolitana", descripcion: "Milanesa de carne con salsa de tomate, jamón y queso mozzarella.", precio: 9000, precio_puntos: 900, puntos_ganados: 90, categoria: "carta", dia_semana: 0, imagen: "🥘" },
  { id: "pd1", nombre: "Bifes a la criolla", descripcion: "Plato del día lunes. Cocidos en salsa criolla con papas españolas.", precio: 8500, precio_puntos: 850, puntos_ganados: 85, categoria: "menu_dia", dia_semana: 1, imagen: "🍲" },
  { id: "pd2", nombre: "Entraña al verdeo", descripcion: "Plato del día martes. Entraña tierna con salsa suave de verdeo y puré.", precio: 9000, precio_puntos: 900, puntos_ganados: 90, categoria: "menu_dia", dia_semana: 2, imagen: "🥩" }
];

// Mock inicial del Staff y Usuarios Administradores con credenciales
const INITIAL_STAFF = [
  { id: "s1", nombre: "Juan", apellido: "Gómez", usuario: "juan.delivery", contrasena: "delivery123", rol: "repartidor", telefono: "11-2222-3333" },
  { id: "s2", nombre: "Carlos", apellido: "Pérez", usuario: "carlos.delivery", contrasena: "delivery123", rol: "repartidor", telefono: "11-4444-5555" },
  { id: "s3", nombre: "Marta", apellido: "Rodríguez", usuario: "marta.caja", contrasena: "cajero123", rol: "cajero", telefono: "11-6666-7777" },
  { id: "s4", nombre: "Sofía", apellido: "Fernández", usuario: "sofia.marketing", contrasena: "marketing123", rol: "marketing", telefono: "11-9999-8888" },
  { id: "s5", nombre: "Hernán", apellido: "López", usuario: "admin", contrasena: "admin123", rol: "gerente", telefono: "11-5555-5555" }
];

// Mock inicial de Empresas (Marketing B2B)
const INITIAL_COMPANIES = [
  { id: "c1", nombre: "Accenture", direccion: "Alsina 150", telefono: "4321-5555", descuento: 10 },
  { id: "c2", nombre: "Banco BID", direccion: "Esmeralda 130", telefono: "4311-6666", descuento: 15 },
  { id: "c3", nombre: "Globant", direccion: "Tucumán 100", telefono: "4555-9999", descuento: 10 }
];

// Mock inicial de Campañas de Marketing (Volanteada)
const INITIAL_CAMPAIGNS = [
  { id: "m1", empresaId: "c1", volantes: 100, fecha: "2026-07-01", notas: "Frente al edificio Alsina 124 por la mañana." },
  { id: "m2", empresaId: "c2", volantes: 50, fecha: "2026-07-05", notas: "Se dejaron volantes en la recepción corporativa." }
];

// Mock de registros de clientes corporativos para analítica
const MOCK_CORP_CLIENTS = [
  { id: "cl1", nombre: "Esteban Russo", email: "esteban@accenture.com", empresaId: "c1", consumido: 22000, puntos: 220 },
  { id: "cl2", nombre: "Clara Domínguez", email: "clara@accenture.com", empresaId: "c1", consumido: 18500, puntos: 185 },
  { id: "cl3", nombre: "Martín Sosa", email: "martin@bid.org", empresaId: "c2", consumido: 45000, puntos: 450 },
  { id: "cl4", nombre: "Agustina Paz", email: "agustina@globant.com", empresaId: "c3", consumido: 0, puntos: 0 }
];

// Mock de Pedidos activos
const INITIAL_ORDERS = [
  {
    id: "1024",
    cliente: "Mariano Alvarez",
    telefono: "11-3456-7890",
    tipo: "delivery", 
    estado: "pendiente", 
    total: 11000,
    metodoPago: "efectivo", 
    pagaCon: 15000, 
    direccion: "Alsina 124, Piso 4B (Accenture)",
    repartidor: "",
    rendido: false,
    hora: "11:42",
    items: [
      { nombre: "Tapa de asado con papas", cant: 1, precio: 9500 },
      { nombre: "Gaseosa Coca-Cola", cant: 1, precio: 1500 }
    ]
  },
  {
    id: "1023",
    cliente: "Laura Benítez",
    telefono: "11-9876-5432",
    tipo: "mostrador",
    estado: "preparando",
    total: 9000,
    metodoPago: "mercadopago",
    direccion: "",
    repartidor: "",
    rendido: false,
    hora: "11:38",
    items: [
      { nombre: "Milanesa Napolitana", cant: 1, precio: 9000 }
    ]
  },
  {
    id: "1022",
    cliente: "Damián Rossi",
    telefono: "11-2345-6789",
    tipo: "delivery",
    estado: "listo",
    total: 10500,
    metodoPago: "efectivo",
    pagaCon: 12000,
    direccion: "Bolívar 250, Oficina 12 (BID)",
    repartidor: "Juan Gómez",
    rendido: false,
    hora: "11:30",
    items: [
      { nombre: "Entraña al verdeo", cant: 1, precio: 9000 },
      { nombre: "Agua Mineral", cant: 1, precio: 1500 }
    ]
  }
];

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState("portal"); // 'portal', 'pedidos', 'rendicion', 'marketing', 'informes', 'menu', 'staff'
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState("1024");
  const [filterType, setFilterType] = useState("todos"); 
  const [filterStatus, setFilterStatus] = useState("activos"); 

  // --- ESTADOS DE MARKETING Y B2B ---
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [campaignForm, setCampaignForm] = useState({
    empresaId: "c1",
    volantes: 100,
    fecha: "2026-07-11",
    notas: ""
  });
  
  // Agregar Empresas
  const [showAddCompanyForm, setShowAddCompanyForm] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    descuento: 10
  });

  // --- ESTADOS DEL ABM DE MENU ---
  const [menuItems, setMenuItems] = useState(INITIAL_PRODUCTS);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [searchMenu, setSearchMenu] = useState("");
  const [menuForm, setMenuForm] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    precio_puntos: 0,
    puntos_ganados: 0,
    categoria: "carta",
    dia_semana: 0,
    imagen: "🍽️"
  });

  // --- ESTADOS DEL ABM DE USUARIOS ADMINISTRADORES ---
  const [staffItems, setStaffItems] = useState(INITIAL_STAFF);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [searchStaff, setSearchStaff] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [staffForm, setStaffForm] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    contrasena: "",
    rol: "repartidor",
    telefono: ""
  });

  // Obtener repartidores activos dinámicamente
  const deliveryDrivers = staffItems
    .filter(member => member.rol === "repartidor")
    .map(member => `${member.nombre} ${member.apellido}`);

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  // --- HANDLERS PEDIDOS Y KDS ---
  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        const autoRendido = newStatus === "entregado" && (order.tipo === "mostrador" || order.metodoPago === "mercadopago");
        return { 
          ...order, 
          estado: newStatus,
          rendido: autoRendido ? true : order.rendido 
        };
      }
      return order;
    }));
  };

  const handleAssignDriver = (id: string, driver: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        return { 
          ...order, 
          repartidor: driver,
          estado: order.estado === "pendiente" || order.estado === "preparando" ? order.estado : "en_camino"
        };
      }
      return order;
    }));
  };

  const handleToggleRendido = (id: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        return { ...order, rendido: !order.rendido };
      }
      return order;
    }));
  };

  const handleRendirTodoRepartidor = (driverName: string) => {
    setOrders(prev => prev.map(order => {
      if (order.repartidor === driverName && order.metodoPago === "efectivo" && order.estado === "entregado") {
        return { ...order, rendido: true };
      }
      return order;
    }));
  };

  const filteredOrders = orders.filter(order => {
    const matchesType = filterType === "todos" || order.tipo === filterType;
    const matchesStatus = filterStatus === "activos" 
      ? order.estado !== "entregado" 
      : order.estado === "entregado";
    return matchesType && matchesStatus;
  });

  const reconciliationData = deliveryDrivers.map(driver => {
    const driverOrders = orders.filter(o => 
      o.repartidor === driver && 
      o.metodoPago === "efectivo" && 
      o.estado === "entregado"
    );
    
    const totalCollected = driverOrders.reduce((acc, curr) => acc + curr.total, 0);
    const totalPendingRendicion = driverOrders
      .filter(o => !o.rendido)
      .reduce((acc, curr) => acc + curr.total, 0);

    return {
      nombre: driver,
      pedidosTotales: driverOrders.length,
      pedidosPendientes: driverOrders.filter(o => !o.rendido).length,
      totalCobrado: totalCollected,
      cajaPendiente: totalPendingRendicion,
      ordenes: driverOrders
    };
  });

  const stats = {
    totalHoy: 134,
    totalPesos: orders.reduce((acc, curr) => acc + curr.total, 0),
    efectivoSinRendir: orders
      .filter(o => o.metodoPago === "efectivo" && !o.rendido && o.estado === "entregado")
      .reduce((acc, curr) => acc + curr.total, 0)
  };

  // --- HANDLERS MARKETING ---
  const handleSelectCampaign = (id: string) => {
    const camp = campaigns.find(c => c.id === id);
    if (camp) {
      setSelectedCampaignId(id);
      setCampaignForm({
        empresaId: camp.empresaId,
        volantes: camp.volantes,
        fecha: camp.fecha,
        notes: camp.notes || "",
        notas: camp.notas || ""
      } as any);
    }
  };

  const handleCreateNewCampaign = () => {
    setSelectedCampaignId("new");
    setCampaignForm({
      empresaId: companies[0]?.id || "",
      volantes: 100,
      fecha: new Date().toISOString().split("T")[0],
      notas: ""
    });
  };

  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCampaignId === "new") {
      const newCamp = {
        id: "m_" + Date.now(),
        ...campaignForm
      };
      setCampaigns(prev => [...prev, newCamp]);
      setSelectedCampaignId(newCamp.id);
    } else if (selectedCampaignId) {
      setCampaigns(prev => prev.map(item => {
        if (item.id === selectedCampaignId) {
          return { ...item, ...campaignForm };
        }
        return item;
      }));
    }
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    if (selectedCampaignId === id) setSelectedCampaignId(null);
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    const newComp = {
      id: "c_" + Date.now(),
      ...companyForm
    };
    setCompanies(prev => [...prev, newComp]);
    setShowAddCompanyForm(false);
    setCompanyForm({ nombre: "", direccion: "", telefono: "", descuento: 10 });
  };

  const handleDeleteCompany = (id: string) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
  };

  // --- HANDLERS ABM MENU ---
  const handleSelectMenuProduct = (id: string) => {
    const prod = menuItems.find(p => p.id === id);
    if (prod) {
      setSelectedMenuId(id);
      setMenuForm({
        nombre: prod.nombre,
        descripcion: prod.descripcion,
        precio: prod.precio,
        precio_puntos: prod.precio_puntos || 0,
        puntos_ganados: prod.puntos_ganados || 0,
        categoria: prod.categoria,
        dia_semana: prod.dia_semana || 0,
        imagen: prod.imagen || "🍽️"
      });
    }
  };

  const handleCreateNewMenuProduct = () => {
    setSelectedMenuId("new");
    setMenuForm({
      nombre: "",
      descripcion: "",
      precio: 0,
      precio_puntos: 0,
      puntos_ganados: 0,
      categoria: "carta",
      dia_semana: 0,
      imagen: "🍽️"
    });
  };

  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMenuId === "new") {
      const newProd = {
        id: "p_" + Date.now(),
        ...menuForm
      };
      setMenuItems(prev => [...prev, newProd]);
      setSelectedMenuId(newProd.id);
    } else if (selectedMenuId) {
      setMenuItems(prev => prev.map(item => {
        if (item.id === selectedMenuId) {
          return { ...item, ...menuForm };
        }
        return item;
      }));
    }
  };

  const handleDeleteMenu = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    if (selectedMenuId === id) {
      setSelectedMenuId(null);
    }
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.nombre.toLowerCase().includes(searchMenu.toLowerCase()) ||
    item.categoria.toLowerCase().includes(searchMenu.toLowerCase())
  );

  // --- HANDLERS ABM EMPLEADOS / USUARIOS ---
  const handleSelectStaffMember = (id: string) => {
    const member = staffItems.find(s => s.id === id);
    if (member) {
      setSelectedStaffId(id);
      setStaffForm({
        nombre: member.nombre,
        apellido: member.apellido,
        usuario: member.usuario || "",
        contrasena: member.contrasena || "",
        rol: member.rol,
        telefono: member.telefono || ""
      });
    }
  };

  const handleCreateNewStaffMember = () => {
    setSelectedStaffId("new");
    setStaffForm({
      nombre: "",
      apellido: "",
      usuario: "",
      contrasena: "",
      rol: "repartidor",
      telefono: ""
    });
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStaffId === "new") {
      const newMember = {
        id: "s_" + Date.now(),
        ...staffForm
      };
      setStaffItems(prev => [...prev, newMember]);
      setSelectedStaffId(newMember.id);
    } else if (selectedStaffId) {
      setStaffItems(prev => prev.map(item => {
        if (item.id === selectedStaffId) {
          return { ...item, ...staffForm };
        }
        return item;
      }));
    }
  };

  const handleDeleteStaff = (id: string) => {
    setStaffItems(prev => prev.filter(item => item.id !== id));
    if (selectedStaffId === id) {
      setSelectedStaffId(null);
    }
  };

  const filteredStaffItems = staffItems.filter(member => 
    `${member.nombre} ${member.apellido}`.toLowerCase().includes(searchStaff.toLowerCase()) ||
    member.usuario.toLowerCase().includes(searchStaff.toLowerCase()) ||
    member.rol.toLowerCase().includes(searchStaff.toLowerCase())
  );

  return (
    <div className="admin-container">
      {/* Sidebar de navegación lateral unificado */}
      <div style={{ width: '85px', backgroundColor: 'var(--color-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0', gap: '2.25rem', borderRight: '1px solid rgb(255 255 255 / 0.1)' }}>
        <div style={{ color: 'var(--color-accent)', fontWeight: 900, fontSize: '1.4rem', marginBottom: '1rem', letterSpacing: '-0.05em' }}>EN</div>
        
        <button 
          onClick={() => setCurrentTab("portal")}
          style={{ 
            color: currentTab === "portal" ? "var(--color-accent)" : "white", 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            fontSize: '0.75rem', 
            gap: '0.35rem',
            opacity: currentTab === "portal" ? 1 : 0.7
          }}
          title="Portal Inicio"
        >
          <Home size={22} />
          <span>Inicio</span>
        </button>

        <button 
          onClick={() => setCurrentTab("pedidos")}
          style={{ 
            color: currentTab === "pedidos" ? "var(--color-accent)" : "white", 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            fontSize: '0.75rem', 
            gap: '0.35rem',
            opacity: currentTab === "pedidos" ? 1 : 0.7
          }}
          title="Cocina y KDS"
        >
          <ShoppingBag size={22} />
          <span>KDS</span>
        </button>

        <button 
          onClick={() => setCurrentTab("rendicion")}
          style={{ 
            color: currentTab === "rendicion" ? "var(--color-accent)" : "white", 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            fontSize: '0.75rem', 
            gap: '0.35rem',
            opacity: currentTab === "rendicion" ? 1 : 0.7
          }}
          title="Arqueo de Caja"
        >
          <Truck size={22} />
          <span>Caja</span>
        </button>

        <button 
          onClick={() => setCurrentTab("marketing")}
          style={{ 
            color: currentTab === "marketing" ? "var(--color-accent)" : "white", 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            fontSize: '0.75rem', 
            gap: '0.35rem',
            opacity: currentTab === "marketing" ? 1 : 0.7
          }}
          title="Módulo de Marketing"
        >
          <Megaphone size={22} />
          <span>Marketing</span>
        </button>

        <button 
          onClick={() => setCurrentTab("informes")}
          style={{ 
            color: currentTab === "informes" ? "var(--color-accent)" : "white", 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            fontSize: '0.75rem', 
            gap: '0.35rem',
            opacity: currentTab === "informes" ? 1 : 0.7
          }}
          title="Central de Informes"
        >
          <BarChart2 size={22} />
          <span>Informes</span>
        </button>

        <button 
          onClick={() => setCurrentTab("menu")}
          style={{ 
            color: currentTab === "menu" ? "var(--color-accent)" : "white", 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            fontSize: '0.75rem', 
            gap: '0.35rem',
            opacity: currentTab === "menu" ? 1 : 0.7
          }}
          title="ABM del Menú"
        >
          <Coffee size={22} />
          <span>Menú</span>
        </button>

        <button 
          onClick={() => setCurrentTab("staff")}
          style={{ 
            color: currentTab === "staff" ? "var(--color-accent)" : "white", 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            fontSize: '0.75rem', 
            gap: '0.35rem',
            opacity: currentTab === "staff" ? 1 : 0.7
          }}
          title="ABM de Usuarios del Sistema"
        >
          <Lock size={22} />
          <span>Usuarios</span>
        </button>
      </div>

      {/* --- VISTA: PORTAL INICIO (PORTAL HUB) --- */}
      {currentTab === "portal" && (
        <div className="admin-content" style={{ backgroundColor: 'var(--color-surface)', padding: '3rem 2rem', overflowY: 'auto' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem' }}>
              <span className="badge badge-accent" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>Administración Central</span>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-secondary)' }}>
                Portal de Gestión | El Nacional
              </h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginTop: '0.25rem' }}>
                Monitorea ventas, gestiona la logística de envíos, analiza el ROI corporativo y edita la carta desde una sola interfaz.
              </p>
            </div>

            {/* Grilla de Accesos Directos */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              
              {/* Acceso 1: Pedidos */}
              <div className="card" onClick={() => setCurrentTab("pedidos")} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', cursor: 'pointer', border: '1px solid rgb(0 0 0 / 0.05)' }}>
                <div>
                  <div style={{ color: 'var(--color-primary)', backgroundColor: '#f0f7ff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <ShoppingBag size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Monitor KDS & Pedidos</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Visualiza y cambia los estados de los pedidos de cocina, takeaway y envíos a domicilio en tiempo real.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem' }}>
                  Ingresar al Monitor <ArrowRight size={16} />
                </div>
              </div>

              {/* Acceso 2: Caja */}
              <div className="card" onClick={() => setCurrentTab("rendicion")} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', cursor: 'pointer', border: '1px solid rgb(0 0 0 / 0.05)' }}>
                <div>
                  <div style={{ color: 'var(--color-secondary)', backgroundColor: '#f1f5f9', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Truck size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Arqueo & Rendición de Caja</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Administra el efectivo de las cobranzas de delivery y el dinero en mano de cada repartidor de forma simple.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem' }}>
                  Ver Liquidaciones <ArrowRight size={16} />
                </div>
              </div>

              {/* Acceso 3: Marketing */}
              <div className="card" onClick={() => setCurrentTab("marketing")} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', cursor: 'pointer', border: '1px solid rgb(0 0 0 / 0.05)' }}>
                <div>
                  <div style={{ color: '#059669', backgroundColor: '#ecfdf5', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Megaphone size={24} style={{ color: '#059669' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Campañas de Marketing B2B</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Registra las campañas de volanteada física, agrega convenios con nuevas empresas y mide conversiones.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem' }}>
                  Gestionar Campañas <ArrowRight size={16} />
                </div>
              </div>

              {/* Acceso 4: Informes */}
              <div className="card" onClick={() => setCurrentTab("informes")} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', cursor: 'pointer', border: '1px solid rgb(0 0 0 / 0.05)' }}>
                <div>
                  <div style={{ color: '#d97706', backgroundColor: '#fffbeb', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <BarChart2 size={24} style={{ color: '#d97706' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Central de Informes & ROI</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Visualiza estadísticas generales, ticket promedio, facturación, volumen y el rendimiento del marketing B2B.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d97706', fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem' }}>
                  Ver Analíticas del Bodegón <ArrowRight size={16} />
                </div>
              </div>

              {/* Acceso 5: ABMs Menú */}
              <div className="card" onClick={() => setCurrentTab("menu")} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', cursor: 'pointer', border: '1px solid rgb(0 0 0 / 0.05)' }}>
                <div>
                  <div style={{ color: '#7c3aed', backgroundColor: '#f5f3ff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Sliders size={24} style={{ color: '#7c3aed' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>ABM del Menú Carta y Diario</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Configura y edita los platos de la carta tradicional, los menús de día semanales y los precios de canje de premios.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7c3aed', fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem' }}>
                  Modificar Catálogos <ArrowRight size={16} />
                </div>
              </div>

              {/* Acceso 6: ABMs Usuarios */}
              <div className="card" onClick={() => setCurrentTab("staff")} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', cursor: 'pointer', border: '1px solid rgb(0 0 0 / 0.05)' }}>
                <div>
                  <div style={{ color: 'var(--color-secondary)', backgroundColor: '#f1f5f9', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Lock size={24} style={{ color: 'var(--color-secondary)' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Usuarios Administradores</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Administra las cuentas de acceso al sistema para los distintos roles (Cajero, Repartidor, Gerente, Marketing).
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem' }}>
                  Gestionar Accesos <ArrowRight size={16} />
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- VISTA: KDS MONITOR DE PEDIDOS --- */}
      {currentTab === "pedidos" && (
        <>
          <div className="admin-sidebar">
            <div className="admin-header">
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Monitoreo</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Proyección: ~150 ped. hoy</span>
              </div>
              <div className="badge badge-primary">{stats.totalHoy} Hoy</div>
            </div>

            <div style={{ padding: '1rem', borderBottom: '1px solid rgb(0 0 0 / 0.08)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: '#f1f5f9', padding: '0.25rem', borderRadius: '8px' }}>
                <button 
                  onClick={() => setFilterType("todos")}
                  style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, backgroundColor: filterType === "todos" ? 'white' : 'transparent', color: filterType === "todos" ? 'var(--color-secondary)' : 'var(--color-text-muted)' }}
                >
                  Todos
                </button>
                <button 
                  onClick={() => setFilterType("mostrador")}
                  style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, backgroundColor: filterType === "mostrador" ? 'white' : 'transparent', color: filterType === "mostrador" ? 'var(--color-secondary)' : 'var(--color-text-muted)' }}
                >
                  Mostrador
                </button>
                <button 
                  onClick={() => setFilterType("delivery")}
                  style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, backgroundColor: filterType === "delivery" ? 'white' : 'transparent', color: filterType === "delivery" ? 'var(--color-secondary)' : 'var(--color-text-muted)' }}
                >
                  Delivery
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => setFilterStatus("activos")}
                  className="btn-outline" 
                  style={{ 
                    flex: 1, 
                    fontSize: '0.75rem', 
                    padding: '0.3rem', 
                    backgroundColor: filterStatus === "activos" ? "var(--color-secondary)" : "transparent",
                    color: filterStatus === "activos" ? "white" : "var(--color-secondary)"
                  }}
                >
                  Activos
                </button>
                <button 
                  onClick={() => setFilterStatus("entregados")}
                  className="btn-outline" 
                  style={{ 
                    flex: 1, 
                    fontSize: '0.75rem', 
                    padding: '0.3rem', 
                    backgroundColor: filterStatus === "entregados" ? "var(--color-secondary)" : "transparent",
                    color: filterStatus === "entregados" ? "white" : "var(--color-secondary)"
                  }}
                >
                  Entregados
                </button>
              </div>
            </div>

            <div className="order-list">
              {filteredOrders.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                  No hay pedidos activos
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div 
                    key={order.id} 
                    className={`order-card ${selectedOrderId === order.id ? 'active' : ''}`}
                    onClick={() => setSelectedOrderId(order.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>#{order.id} - {order.cliente}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{order.hora}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className={`badge ${order.tipo === 'delivery' ? 'badge-delivery' : 'badge-takeaway'}`} style={{ fontSize: '0.7rem' }}>
                        {order.tipo === 'delivery' ? 'Delivery' : 'Mostrador'}
                      </span>

                      <span className={`badge ${
                        order.estado === 'pendiente' ? 'status-pending' :
                        order.estado === 'preparando' ? 'status-preparing' :
                        order.estado === 'listo' ? 'status-ready' :
                        order.estado === 'en_camino' ? 'status-out' : ''
                      }`} style={{ fontSize: '0.7rem' }}>
                        {order.estado.toUpperCase().replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="admin-content" style={{ backgroundColor: 'white' }}>
            {selectedOrder ? (
              <div className="detail-view">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgb(0 0 0 / 0.08)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>PEDIDO #{selectedOrder.id}</span>
                    <h1 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>{selectedOrder.cliente}</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Celular: {selectedOrder.telefono}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-secondary)' }}>${selectedOrder.total.toLocaleString()}</div>
                    <span className="badge badge-accent" style={{ marginTop: '0.5rem' }}>
                      {selectedOrder.metodoPago === 'mercadopago' ? 'Pago Online MP' : 'Paga en Efectivo'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Truck size={18} /> Datos de Entrega
                    </h3>
                    
                    {selectedOrder.tipo === "delivery" ? (
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>Dirección:</p>
                        <p style={{ color: 'var(--color-text-main)', marginBottom: '1rem' }}>{selectedOrder.direccion}</p>
                        
                        <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>Repartidor Asignado:</p>
                        <select 
                          value={selectedOrder.repartidor} 
                          onChange={(e) => handleAssignDriver(selectedOrder.id, e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgb(0 0 0 / 0.15)', fontWeight: 600 }}
                        >
                          <option value="">-- Asignar Repartidor --</option>
                          {deliveryDrivers.map(driver => (
                            <option key={driver} value={driver}>{driver}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-primary)' }}>Retira en Mostrador</p>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                          El cliente se presentará en la caja con el celular registrado.
                        </p>
                      </div>
                    )}
                  </div>

                  <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <DollarSign size={18} /> Lógica de Cobro
                    </h3>

                    {selectedOrder.metodoPago === "efectivo" ? (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span>Total a cobrar:</span>
                          <strong style={{ color: 'var(--color-secondary)' }}>${selectedOrder.total.toLocaleString()}</strong>
                        </div>
                        {selectedOrder.pagaCon && (
                          <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span>Paga con:</span>
                              <strong>${selectedOrder.pagaCon.toLocaleString()}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.5rem 0', borderTop: '1px dashed rgb(0 0 0 / 0.1)', color: 'var(--color-success)' }}>
                              <span style={{ fontWeight: 700 }}>Vuelto a llevar:</span>
                              <strong style={{ fontSize: '1.1rem', fontWeight: 800 }}>${(selectedOrder.pagaCon - selectedOrder.total).toLocaleString()}</strong>
                            </div>
                          </>
                        )}
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                          <input 
                            type="checkbox" 
                            id={`rendido-${selectedOrder.id}`} 
                            checked={selectedOrder.rendido} 
                            onChange={() => handleToggleRendido(selectedOrder.id)}
                            style={{ width: '18px', height: '18px' }}
                          />
                          <label htmlFor={`rendido-${selectedOrder.id}`} style={{ fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                            {selectedOrder.rendido ? "💰 Efectivo Rendido en Caja" : "⚠️ Falta Rendir Efectivo"}
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p style={{ color: 'var(--color-success)', fontWeight: 700 }}>✓ Pagado electrónicamente</p>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                          No requiere cobranza por parte del repartidor. Acreditado en MercadoPago.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>Detalle de Consumos</h3>
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th style={{ width: '80px', textAlign: 'center' }}>Cant</th>
                        <th style={{ width: '120px', textAlign: 'right' }}>Precio</th>
                        <th style={{ width: '120px', textAlign: 'right' }}>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td><strong>{item.nombre}</strong></td>
                          <td style={{ textAlign: 'center' }}>{item.cant}</td>
                          <td style={{ textAlign: 'right' }}>${item.precio.toLocaleString()}</td>
                          <td style={{ textAlign: 'right', fontWeight: 700 }}>${(item.cant * item.precio).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ borderTop: '1px solid rgb(0 0 0 / 0.08)', paddingTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  {selectedOrder.estado === "pendiente" && (
                    <button onClick={() => handleUpdateStatus(selectedOrder.id, "preparando")} className="btn-primary" style={{ backgroundColor: 'var(--color-secondary)' }}>
                      Aceptar y Cocinar
                    </button>
                  )}
                  {selectedOrder.estado === "preparando" && (
                    <button onClick={() => handleUpdateStatus(selectedOrder.id, "listo")} className="btn-primary" style={{ backgroundColor: 'var(--color-primary)' }}>
                      Marcar como Listo
                    </button>
                  )}
                  {selectedOrder.estado === "listo" && selectedOrder.tipo === "delivery" && (
                    <button 
                      onClick={() => handleUpdateStatus(selectedOrder.id, "en_camino")} 
                      className="btn-primary"
                      disabled={!selectedOrder.repartidor}
                      style={{ opacity: selectedOrder.repartidor ? 1 : 0.5 }}
                    >
                      Enviar con Repartidor
                    </button>
                  )}
                  {(selectedOrder.estado === "listo" && selectedOrder.tipo === "mostrador") || selectedOrder.estado === "en_camino" ? (
                    <button onClick={() => handleUpdateStatus(selectedOrder.id, "entregado")} className="btn-primary" style={{ backgroundColor: 'var(--color-success)' }}>
                      Confirmar Entrega
                    </button>
                  ) : null}
                  {selectedOrder.estado !== "entregado" && (
                    <button onClick={() => handleUpdateStatus(selectedOrder.id, "pendiente")} className="btn-outline" style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}>
                      Cancelar Pedido
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
                Seleccioná un pedido para ver los detalles.
              </div>
            )}
          </div>
        </>
      )}

      {/* --- VISTA: ARQUEO DE CAJA DE REPARTIDORES --- */}
      {currentTab === "rendicion" && (
        <div className="admin-content" style={{ backgroundColor: 'white', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem' }}>Rendición de Repartidores</h1>
              <p style={{ color: 'var(--color-text-muted)' }}>Control de caja chica y cobranzas de delivery en efectivo.</p>
            </div>
            <div className="card" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '2rem', backgroundColor: 'var(--color-surface)', border: 'none' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block' }}>Efectivo sin Rendir</span>
                <strong style={{ fontSize: '1.5rem', color: 'var(--color-error)' }}>${stats.efectivoSinRendir.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          <div className="reconciliation-grid">
            {reconciliationData.map(driver => (
              <div key={driver.nombre} className="driver-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-secondary)' }}>{driver.nombre}</h3>
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{driver.pedidosTotales} Entregas</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgb(0 0 0 / 0.05)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Total Recaudado:</span>
                    <strong style={{ color: 'var(--color-text-main)' }}>${driver.totalCobrado.toLocaleString()}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', marginBottom: '1.5rem' }}>
                    <span style={{ fontWeight: 600 }}>Caja a Entregar:</span>
                    <strong style={{ color: driver.cajaPendiente > 0 ? 'var(--color-error)' : 'var(--color-success)', fontSize: '1.1rem', fontWeight: 800 }}>
                      ${driver.cajaPendiente.toLocaleString()}
                    </strong>
                  </div>

                  {driver.ordenes.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '150px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                      {driver.ordenes.map(ord => (
                        <div key={ord.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', padding: '0.4rem', backgroundColor: 'var(--color-surface)', borderRadius: '6px' }}>
                          <span>#{ord.id} - ${ord.total.toLocaleString()}</span>
                          <button 
                            onClick={() => handleToggleRendido(ord.id)}
                            style={{ 
                              color: ord.rendido ? 'var(--color-success)' : 'var(--color-error)', 
                              fontSize: '0.75rem', 
                              fontWeight: 700 
                            }}
                          >
                            {ord.rendido ? "✓ Rendido" : "Marcar Rendido"}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center', margin: '2rem 0' }}>
                      No realizó cobros en efectivo hoy.
                    </p>
                  )}
                </div>

                {driver.cajaPendiente > 0 && (
                  <button 
                    onClick={() => handleRendirTodoRepartidor(driver.nombre)}
                    className="btn-primary" 
                    style={{ width: '100%', padding: '0.6rem', fontSize: '0.9rem' }}
                  >
                    Rendir Caja Completa
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- VISTA: MÓDULO DE MARKETING & EMPRESAS --- */}
      {currentTab === "marketing" && (
        <>
          {/* Listado de Campañas de Marketing */}
          <div className="admin-sidebar" style={{ width: '400px' }}>
            <div className="abm-list-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Campañas B2B</h2>
                <button 
                  onClick={handleCreateNewCampaign}
                  className="btn-primary" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }}
                >
                  <Plus size={16} /> Volanteada
                </button>
              </div>
            </div>

            <div className="abm-list-items">
              {campaigns.map(camp => {
                const comp = companies.find(c => c.id === camp.empresaId);
                return (
                  <div 
                    key={camp.id} 
                    className={`abm-item-card ${selectedCampaignId === camp.id ? 'active' : ''}`}
                    onClick={() => handleSelectCampaign(camp.id)}
                  >
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <div style={{ backgroundColor: '#eef2f6', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Megaphone size={16} style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{comp?.nombre || "Empresa"}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{camp.volantes} volantes • {camp.fecha}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCampaign(camp.id);
                      }}
                      style={{ color: 'var(--color-error)', opacity: 0.7 }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
            
            {/* Tabla de Empresas Asociadas */}
            <div style={{ padding: '1rem', borderTop: '1px solid rgb(0 0 0 / 0.08)', backgroundColor: '#fafbfb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Empresas Convenio</h3>
                <button 
                  onClick={() => setShowAddCompanyForm(!showAddCompanyForm)}
                  className="btn-outline" 
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '6px' }}
                >
                  {showAddCompanyForm ? "Cerrar" : "+ Agregar"}
                </button>
              </div>

              {showAddCompanyForm ? (
                <form onSubmit={handleAddCompany} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid rgb(0 0 0 / 0.08)', marginBottom: '1rem' }}>
                  <input type="text" placeholder="Nombre (Ej: Globant)" required value={companyForm.nombre} onChange={e => setCompanyForm(prev => ({...prev, nombre: e.target.value}))} style={{ padding: '0.4rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem' }} />
                  <input type="text" placeholder="Dirección" value={companyForm.direccion} onChange={e => setCompanyForm(prev => ({...prev, direccion: e.target.value}))} style={{ padding: '0.4rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem' }} />
                  <input type="text" placeholder="Teléfono" value={companyForm.telefono} onChange={e => setCompanyForm(prev => ({...prev, telefono: e.target.value}))} style={{ padding: '0.4rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>Descuento B2B:</span>
                    <input type="number" required value={companyForm.descuento} onChange={e => setCompanyForm(prev => ({...prev, descuento: Number(e.target.value)}))} style={{ width: '60px', padding: '0.4rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem' }} />
                    <span style={{ fontSize: '0.8rem' }}>%</span>
                  </div>
                  <button type="submit" className="btn-primary" style={{ padding: '0.4rem', fontSize: '0.8rem' }}>Añadir Convenio</button>
                </form>
              ) : null}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
                {companies.map(c => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid rgb(0 0 0 / 0.05)', fontSize: '0.85rem' }}>
                    <div>
                      <strong>{c.nombre}</strong>
                      <span style={{ display: 'block', fontSize: '0.7er', color: 'var(--color-text-muted)' }}>{c.direccion} • {c.descuento}% desc.</span>
                    </div>
                    <button onClick={() => handleDeleteCompany(c.id)} style={{ color: 'var(--color-error)', opacity: 0.7 }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Registro y Gestión de Campañas B2B */}
          <div className="admin-content" style={{ backgroundColor: 'white', padding: '2rem' }}>
            {selectedCampaignId ? (
              <form onSubmit={handleSaveCampaign} className="detail-view" style={{ maxWidth: '600px', margin: '0' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
                  {selectedCampaignId === "new" ? "📣 Registrar Nueva Volanteada B2B" : "📝 Editar Registro de Campaña"}
                </h2>

                <div className="abm-form-container">
                  <div className="abm-form-group">
                    <label>Empresa de la Zona Destino</label>
                    <select 
                      className="abm-select"
                      value={campaignForm.empresaId}
                      onChange={(e) => setCampaignForm(prev => ({ ...prev, empresaId: e.target.value }))}
                    >
                      {companies.map(c => (
                        <option key={c.id} value={c.id}>{c.nombre} (Calle: {c.direccion})</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="abm-form-group">
                      <label>Cantidad de Volantes Entregados</label>
                      <input 
                        type="number" 
                        required 
                        className="abm-input" 
                        value={campaignForm.volantes || ""}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, volantes: Number(e.target.value) }))}
                        placeholder="Ej. 100"
                      />
                    </div>

                    <div className="abm-form-group">
                      <label>Fecha de Distribución</label>
                      <input 
                        type="date" 
                        required
                        className="abm-input" 
                        value={campaignForm.fecha}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, fecha: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="abm-form-group">
                    <label>Notas de Campo / Ubicación exacta</label>
                    <textarea 
                      className="abm-input" 
                      rows={4}
                      value={campaignForm.notas}
                      onChange={(e) => setCampaignForm(prev => ({ ...prev, notas: e.target.value }))}
                      placeholder="Ej. Dejamos 100 folletos en el mostrador del 4to piso. El personal de seguridad colaboró con la entrega."
                      style={{ fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Save size={18} /> Guardar Registro
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setSelectedCampaignId(null)}
                      className="btn-outline"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
                <Megaphone size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <span>Seleccioná una campaña del listado o creá una nueva volanteada para registrar notas operativas.</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* --- VISTA: CENTRAL DE INFORMES Y ROI DE CAMPAÑAS --- */}
      {currentTab === "informes" && (
        <div className="admin-content" style={{ backgroundColor: 'white', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* Encabezado */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid rgb(0 0 0 / 0.08)', paddingBottom: '1.5rem' }}>
              <div>
                <h1 style={{ fontSize: '2rem' }}>Central de Informes & Estadísticas</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Análisis del rendimiento comercial, mix de ventas y ROI de marketing.</p>
              </div>
              <div style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                <TrendingUp size={20} /> Ventas Estables (Ligeramente Positivas)
              </div>
            </div>

            {/* KPI Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <div className="card" style={{ border: 'none', backgroundColor: 'var(--color-surface)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>FACTURACIÓN GENERAL (Marzo Est.)</span>
                <strong style={{ fontSize: '1.75rem', color: 'var(--color-secondary)', display: 'block', marginTop: '0.5rem' }}>$150.0M</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>+5.2% vs Enero ($142.9M)</span>
              </div>

              <div className="card" style={{ border: 'none', backgroundColor: 'var(--color-surface)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>TICKET PROMEDIO ACTUAL</span>
                <strong style={{ fontSize: '1.75rem', color: 'var(--color-secondary)', display: 'block', marginTop: '0.5rem' }}>$7.400</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}>Oportunidad: +$1.000 combo upselling</span>
              </div>

              <div className="card" style={{ border: 'none', backgroundColor: 'var(--color-surface)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>CUBIERTOS MENSUALES</span>
                <strong style={{ fontSize: '1.75rem', color: 'var(--color-secondary)', display: 'block', marginTop: '0.5rem' }}>17.500</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Operación de alto volumen</span>
              </div>

              <div className="card" style={{ border: 'none', backgroundColor: 'var(--color-surface)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>PUNTOS EMITIDOS (FIDELIDAD)</span>
                <strong style={{ fontSize: '1.75rem', color: 'var(--color-secondary)', display: 'block', marginTop: '0.5rem' }}>45.200 pts</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>12% de tasa de retorno</span>
              </div>
            </div>

            {/* Split Section: Platos Más Vendidos vs ROI de Volanteada */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
              
              {/* Bloque Izquierdo: Platos Más Vendidos (Mix de Ventas Core) */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid rgb(0 0 0 / 0.08)', paddingBottom: '0.5rem' }}>Mix de Ventas - Productos Estrella</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                      <span>🥩 Tapa de Asado & Bifes</span>
                      <span>24% de la facturación</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '24%', backgroundColor: 'var(--color-primary)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                      <span>🥘 Milanesas (Napolitana/Día)</span>
                      <span>18% de la facturación</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '18%', backgroundColor: 'var(--color-primary)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                      <span>🥩 Bife de chorizo & Entraña</span>
                      <span>19% de la facturación</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '19%', backgroundColor: 'var(--color-primary)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                      <span>🐟 Pescados (Brótola del día)</span>
                      <span>10% de la facturación</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '10%', backgroundColor: 'var(--color-primary)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                      <span>🥤 Bebidas y otros</span>
                      <span>29% de la facturación</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '29%', backgroundColor: 'var(--color-primary)' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloque Derecho: ROI de Campañas Corporativas B2B */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid rgb(0 0 0 / 0.08)', paddingBottom: '0.5rem' }}>ROI Campañas B2B & Convenios</h3>
                
                <table className="items-table" style={{ marginTop: '0' }}>
                  <thead>
                    <tr>
                      <th>Empresa</th>
                      <th style={{ textAlign: 'center' }}>Volantes</th>
                      <th style={{ textAlign: 'center' }}>Regs</th>
                      <th style={{ textAlign: 'right' }}>Consumo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(c => {
                      const totalVolantes = campaigns
                        .filter(camp => camp.empresaId === c.id)
                        .reduce((sum, camp) => sum + camp.volantes, 0);

                      const registeredClients = MOCK_CORP_CLIENTS.filter(cl => cl.empresaId === c.id);
                      const totalRevenue = registeredClients.reduce((sum, cl) => sum + cl.consumido, 0);

                      return (
                        <tr key={c.id}>
                          <td><strong>{c.nombre}</strong></td>
                          <td style={{ textAlign: 'center' }}>{totalVolantes || 0}</td>
                          <td style={{ textAlign: 'center' }}>{registeredClients.length}</td>
                          <td style={{ textAlign: 'right', fontWeight: 700, color: totalRevenue > 0 ? 'var(--color-success)' : 'inherit' }}>
                            ${totalRevenue.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem', backgroundColor: '#ecfdf5', borderRadius: '8px', fontSize: '0.8rem', color: '#047857', fontWeight: 700, alignItems: 'center' }}>
                  <Sparkles size={16} />
                  <span>Accenture posee la mayor tasa de conversión tras la volanteada (15% registro).</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* --- VISTA: ABM DE MENU / PLATOS --- */}
      {currentTab === "menu" && (
        <>
          {/* Listado de Platos */}
          <div className="admin-sidebar">
            <div className="abm-list-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Platos del Menú</h2>
                <button 
                  onClick={handleCreateNewMenuProduct}
                  className="btn-primary" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }}
                >
                  <Plus size={16} /> Nuevo
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--color-text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Buscar plato o categoría..." 
                  value={searchMenu}
                  onChange={(e) => setSearchMenu(e.target.value)}
                  className="abm-input"
                  style={{ paddingLeft: '2.2rem' }}
                />
              </div>
            </div>

            <div className="abm-list-items">
              {filteredMenuItems.map(item => (
                <div 
                  key={item.id} 
                  className={`abm-item-card ${selectedMenuId === item.id ? 'active' : ''}`}
                  onClick={() => handleSelectMenuProduct(item.id)}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem' }}>{item.imagen}</span>
                    <div>
                      <div style={{ fontSize: '0.95rem' }}>{item.nombre}</div>
                      <span className="badge badge-accent" style={{ fontSize: '0.65rem', marginTop: '0.2rem' }}>{item.categoria}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>${item.precio.toLocaleString()}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMenu(item.id);
                      }}
                      style={{ color: 'var(--color-error)', opacity: 0.7 }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario de Platos */}
          <div className="admin-content" style={{ backgroundColor: 'white', padding: '2rem' }}>
            {selectedMenuId ? (
              <form onSubmit={handleSaveMenu} className="detail-view" style={{ maxWidth: '600px', margin: '0' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
                  {selectedMenuId === "new" ? "🍽️ Agregar Nuevo Plato" : `📝 Editar Plato: ${menuForm.nombre}`}
                </h2>

                <div className="abm-form-container">
                  <div className="abm-form-group">
                    <label>Nombre del Plato</label>
                    <input 
                      type="text" 
                      required 
                      className="abm-input" 
                      placeholder="Ej. Entraña al verdeo" 
                      value={menuForm.nombre}
                      onChange={(e) => setMenuForm(prev => ({ ...prev, nombre: e.target.value }))}
                    />
                  </div>

                  <div className="abm-form-group">
                    <label>Descripción</label>
                    <textarea 
                      className="abm-input" 
                      rows={3}
                      placeholder="Breve descripción del plato, acompañamientos, etc." 
                      value={menuForm.descripcion}
                      onChange={(e) => setMenuForm(prev => ({ ...prev, descripcion: e.target.value }))}
                      style={{ fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="abm-form-group">
                      <label>Precio en Efectivo ($)</label>
                      <input 
                        type="number" 
                        required 
                        className="abm-input" 
                        value={menuForm.precio || ""}
                        onChange={(e) => setMenuForm(prev => ({ ...prev, precio: Number(e.target.value) }))}
                      />
                    </div>

                    <div className="abm-form-group">
                      <label>Icono / Emoji</label>
                      <input 
                        type="text" 
                        className="abm-input" 
                        value={menuForm.imagen}
                        onChange={(e) => setMenuForm(prev => ({ ...prev, imagen: e.target.value }))}
                        placeholder="Ej: 🥩, 🥤, 🍲"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="abm-form-group">
                      <label>Costo en Puntos (Canjes)</label>
                      <input 
                        type="number" 
                        className="abm-input" 
                        placeholder="Puntos requeridos para canje"
                        value={menuForm.precio_puntos || ""}
                        onChange={(e) => setMenuForm(prev => ({ ...prev, precio_puntos: Number(e.target.value) }))}
                      />
                    </div>

                    <div className="abm-form-group">
                      <label>Puntos que Otorga al Comprar</label>
                      <input 
                        type="number" 
                        className="abm-input" 
                        placeholder="Puntos acumulados al comprar"
                        value={menuForm.puntos_ganados || ""}
                        onChange={(e) => setMenuForm(prev => ({ ...prev, puntos_ganados: Number(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="abm-form-group">
                      <label>Categoría</label>
                      <select 
                        className="abm-select"
                        value={menuForm.categoria}
                        onChange={(e) => setMenuForm(prev => ({ ...prev, categoria: e.target.value }))}
                      >
                        <option value="menu_dia">Menú del Día</option>
                        <option value="carta">Carta Tradicional</option>
                        <option value="bebida">Bebidas</option>
                        <option value="postre">Postres</option>
                        <option value="combo">Combos Promocionales</option>
                      </select>
                    </div>

                    {menuForm.categoria === "menu_dia" && (
                      <div className="abm-form-group" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                        <label>Día del Menú Semanal</label>
                        <select 
                          className="abm-select"
                          value={menuForm.dia_semana}
                          onChange={(e) => setMenuForm(prev => ({ ...prev, dia_semana: Number(e.target.value) }))}
                        >
                          <option value={1}>Lunes</option>
                          <option value={2}>Martes</option>
                          <option value={3}>Miércoles</option>
                          <option value={4}>Jueves</option>
                          <option value={5}>Viernes</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Save size={18} /> Guardar Plato
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setSelectedMenuId(null)}
                      className="btn-outline"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
                <BookOpen size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <span>Seleccioná un plato del listado para editarlo o creá uno nuevo.</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* --- VISTA: ABM DE USUARIOS ADMINISTRADORES --- */}
      {currentTab === "staff" && (
        <>
          {/* Listado de Usuarios */}
          <div className="admin-sidebar">
            <div className="abm-list-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Usuarios del Sistema</h2>
                <button 
                  onClick={handleCreateNewStaffMember}
                  className="btn-primary" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }}
                >
                  <Plus size={16} /> Nuevo
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--color-text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Buscar usuario o rol..." 
                  value={searchStaff}
                  onChange={(e) => setSearchStaff(e.target.value)}
                  className="abm-input"
                  style={{ paddingLeft: '2.2rem' }}
                />
              </div>
            </div>

            <div className="abm-list-items">
              {filteredStaffItems.map(member => (
                <div 
                  key={member.id} 
                  className={`abm-item-card ${selectedStaffId === member.id ? 'active' : ''}`}
                  onClick={() => handleSelectStaffMember(member.id)}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'var(--color-surface)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={18} style={{ color: 'var(--color-secondary)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem' }}>{member.nombre} {member.apellido}</div>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>@{member.usuario}</span>
                      <span className="badge" style={{ 
                        fontSize: '0.65rem', 
                        marginTop: '0.2rem', 
                        backgroundColor: member.rol === 'repartidor' ? '#e6f4ea' : member.rol === 'gerente' ? '#fef7e0' : member.rol === 'cajero' ? '#e8f0fe' : '#f5f3ff', 
                        color: member.rol === 'repartidor' ? '#137333' : member.rol === 'gerente' ? '#b06000' : member.rol === 'cajero' ? '#1a73e8' : '#7c3aed' 
                      }}>
                        {member.rol.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteStaff(member.id);
                    }}
                    style={{ color: 'var(--color-error)', opacity: 0.7 }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario de Usuarios */}
          <div className="admin-content" style={{ backgroundColor: 'white', padding: '2rem' }}>
            {selectedStaffId ? (
              <form onSubmit={handleSaveStaff} className="detail-view" style={{ maxWidth: '600px', margin: '0' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
                  {selectedStaffId === "new" ? "👤 Registrar Nuevo Usuario" : `📝 Editar Credenciales: ${staffForm.nombre} ${staffForm.apellido}`}
                </h2>

                <div className="abm-form-container">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="abm-form-group">
                      <label>Nombre</label>
                      <input 
                        type="text" 
                        required 
                        className="abm-input" 
                        placeholder="Ej. Juan" 
                        value={staffForm.nombre}
                        onChange={(e) => setStaffForm(prev => ({ ...prev, nombre: e.target.value }))}
                      />
                    </div>

                    <div className="abm-form-group">
                      <label>Apellido</label>
                      <input 
                        type="text" 
                        required 
                        className="abm-input" 
                        placeholder="Ej. Gómez" 
                        value={staffForm.apellido}
                        onChange={(e) => setStaffForm(prev => ({ ...prev, apellido: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="abm-form-group">
                      <label>Nombre de Usuario / Login</label>
                      <input 
                        type="text" 
                        required 
                        className="abm-input" 
                        placeholder="Ej. juan.delivery" 
                        value={staffForm.usuario}
                        onChange={(e) => setStaffForm(prev => ({ ...prev, usuario: e.target.value }))}
                      />
                    </div>

                    <div className="abm-form-group">
                      <label>Contraseña</label>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type={showPassword ? "text" : "password"} 
                          required 
                          className="abm-input" 
                          placeholder="Clave de acceso" 
                          value={staffForm.contrasena}
                          onChange={(e) => setStaffForm(prev => ({ ...prev, contrasena: e.target.value }))}
                          style={{ paddingRight: '2.5rem' }}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ position: 'absolute', right: '10px', top: '10px', color: 'var(--color-text-muted)' }}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="abm-form-group">
                    <label>Teléfono de Contacto</label>
                    <input 
                      type="text" 
                      className="abm-input" 
                      placeholder="Ej. 11-2222-3333" 
                      value={staffForm.telefono}
                      onChange={(e) => setStaffForm(prev => ({ ...prev, telefono: e.target.value }))}
                    />
                  </div>

                  <div className="abm-form-group">
                    <label>Rol / Función en el Sistema</label>
                    <select 
                      className="abm-select"
                      value={staffForm.rol}
                      onChange={(e) => setStaffForm(prev => ({ ...prev, rol: e.target.value }))}
                    >
                      <option value="repartidor">Repartidor (Caja & Delivery)</option>
                      <option value="cajero">Cajero / Recepción</option>
                      <option value="gerente">Gerente (Reportes & Administración)</option>
                      <option value="marketing">Marketing (B2B & Campañas)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Save size={18} /> Registrar Credenciales
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setSelectedStaffId(null)}
                      className="btn-outline"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
                <Users size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <span>Seleccioná un usuario del listado para editar sus accesos o crea uno nuevo.</span>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}
