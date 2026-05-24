import React, { useState, useEffect } from 'react';

const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'http', label: 'Códigos HTTP' },
  { id: 'practica', label: 'Práctica' },
  { id: 'codigo', label: 'Código' },
  { id: 'respuesta', label: 'Respuesta JSON' },
  { id: 'conclusion', label: 'Conclusión' },
];

export default function NavBar() {
  const [active, setActive] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map(l => document.getElementById(l.id));
      let current = 'inicio';
      sections.forEach(s => {
        if (s && window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(15,17,23,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontFamily: 'var(--mono)', fontWeight: 700, color: '#fff',
          }}>{ }</div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text2)', letterSpacing: 1 }}>
            backend.<span style={{ color: 'var(--accent)' }}>edu</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 4 }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              background: active === l.id ? 'var(--surface2)' : 'transparent',
              border: 'none', cursor: 'pointer',
              color: active === l.id ? 'var(--accent)' : 'var(--text2)',
              padding: '6px 14px', borderRadius: 8,
              fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
              transition: 'all 0.2s',
            }}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
