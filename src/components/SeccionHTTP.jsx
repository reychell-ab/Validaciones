import React, { useState } from 'react';

const codigos = [
  { code: 200, name: 'OK', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', uso: 'Cuando una operación se realiza correctamente', ejemplo: 'GET /productos → lista devuelta con éxito' },
  { code: 201, name: 'Created', color: '#4f8ef7', bg: 'rgba(79,142,247,0.1)', uso: 'Cuando se registra un nuevo recurso', ejemplo: 'POST /productos → producto guardado' },
  { code: 400, name: 'Bad Request', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', uso: 'Cuando el usuario envía datos inválidos', ejemplo: 'precio: -500 → dato fuera de rango' },
  { code: 404, name: 'Not Found', color: '#f97316', bg: 'rgba(249,115,22,0.1)', uso: 'Cuando el recurso solicitado no existe', ejemplo: 'GET /productos/999 → no encontrado' },
  { code: 500, name: 'Internal Server Error', color: '#f43f5e', bg: 'rgba(244,63,94,0.1)', uso: 'Cuando ocurre un fallo interno en el servidor', ejemplo: 'DB desconectada → error inesperado' },
];

export default function SeccionHTTP() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="http" style={{ padding: '80px 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <SectionHeader
          tag="HTTP"
          title="Códigos de Estado"
          subtitle="El servidor comunica el resultado de cada operación usando códigos numéricos estándar."
        />

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {codigos.map(c => (
            <div
              key={c.code}
              onClick={() => setSelected(selected === c.code ? null : c.code)}
              style={{
                background: selected === c.code ? c.bg : 'var(--surface)',
                border: `1px solid ${selected === c.code ? c.color : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                padding: '20px 22px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 22,
                  color: c.color, minWidth: 48,
                }}>{c.code}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: c.color, background: c.bg, padding: '2px 8px', borderRadius: 4 }}>{c.name}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{c.uso}</p>
              {selected === c.code && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontFamily: 'var(--mono)', fontSize: 12, color: c.color, animation: 'fadeIn 0.2s ease' }}>
                  💡 {c.ejemplo}
                </div>
              )}
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text3)' }}>Haz clic en un código para ver un ejemplo práctico</p>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title, subtitle }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase' }}>{tag}</span>
      <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, fontFamily: 'var(--mono)', marginTop: 6, marginBottom: 12 }}>{title}</h2>
      {subtitle && <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 600, lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  );
}
