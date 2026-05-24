import React from 'react';

const puntos = [
  {
    icon: '🔒', color: '#4f8ef7',
    title: 'El backend es el guardián de los datos',
    desc: 'Nunca se debe confiar únicamente en la validación del frontend. El backend siempre debe revisar y rechazar datos inválidos, independientemente de cómo lleguen.',
  },
  {
    icon: '🔄', color: '#7c5fe6',
    title: 'try/catch previene fallos totales',
    desc: 'Sin manejo de excepciones, un dato inválido puede lanzar un error no controlado y tumbar el servidor completo. El bloque try/catch aísla el error y devuelve una respuesta controlada.',
  },
  {
    icon: '📨', color: '#22c55e',
    title: 'Los mensajes claros mejoran la UX',
    desc: 'En lugar de un genérico "Error 500", el usuario recibe exactamente qué campo está mal y cómo corregirlo. Esto reduce la frustración y acelera la corrección.',
  },
  {
    icon: '📐', color: '#f59e0b',
    title: 'JSON estructurado facilita la integración',
    desc: 'Usar siempre { ok, mensaje, datos } permite que cualquier cliente (web, móvil, otra API) procese la respuesta de forma predecible sin lógica adicional.',
  },
];

export default function SeccionConclusion() {
  return (
    <section id="conclusion" style={{ padding: '80px 24px 100px', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      {/* BG glow */}
      <div style={{
        position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300,
        background: 'radial-gradient(ellipse, rgba(79,142,247,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHeader
          tag="Conclusión"
          title="¿Por qué importa todo esto?"
          subtitle="El manejo correcto de errores y validaciones no es opcional: es parte fundamental de cualquier aplicación robusta."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 48 }}>
          {puntos.map((p, i) => (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '22px 24px',
              borderTop: `3px solid ${p.color}`,
              animation: `fadeIn 0.5s ease ${i * 0.08}s both`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Final rule */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(79,142,247,0.1), rgba(124,95,230,0.1))',
          border: '1px solid rgba(79,142,247,0.3)',
          borderRadius: 'var(--radius-lg)', padding: '32px 36px',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--accent)', marginBottom: 12, letterSpacing: 1 }}>REGLA DE ORO</div>
          <p style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 600, lineHeight: 1.5, color: 'var(--text)', maxWidth: 600, margin: '0 auto' }}>
            "Un backend bien diseñado nunca guarda datos inválidos y siempre explica claramente por qué rechazó una operación."
          </p>
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {[['Validar antes de guardar', '#4f8ef7'], ['Manejar excepciones', '#7c5fe6'], ['Responder con JSON claro', '#22c55e']].map(([t, c]) => (
              <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: 12, color: c, padding: '4px 12px', background: `${c}15`, borderRadius: 999, border: `1px solid ${c}40` }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title, subtitle }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase' }}>{tag}</span>
      <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, fontFamily: 'var(--mono)', marginTop: 6, marginBottom: 12 }}>{title}</h2>
      {subtitle && <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 620, lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  );
}
