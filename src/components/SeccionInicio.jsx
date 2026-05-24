import React from 'react';

const puntos = [
  { icon: '🗄️', title: 'Protege la base de datos', desc: 'Los datos inválidos corrompen la información almacenada y generan inconsistencias difíciles de corregir.' },
  { icon: '🧭', title: 'Guía al usuario', desc: 'Un mensaje claro le indica exactamente qué campo corregir, mejorando la experiencia de uso.' },
  { icon: '🛡️', title: 'Evita fallos inesperados', desc: 'Sin validación, un dato inválido puede lanzar excepciones no controladas y tumbar el servidor.' },
  { icon: '📦', title: 'Garantiza información correcta', desc: 'El backend actúa como guardián: solo acepta datos que cumplan todas las reglas del negocio.' },
  { icon: '📡', title: 'Respuestas claras y ordenadas', desc: 'Devuelve JSON estructurado con el estado de la operación para que el frontend pueda reaccionar correctamente.' },
];

export default function SeccionInicio() {
  return (
    <section id="inicio" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden' }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(circle at 60% 30%, rgba(79,142,247,0.08) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(124,95,230,0.07) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        opacity: 0.15,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1, animation: 'fadeIn 0.7s ease both' }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(79,142,247,0.12)', border: '1px solid rgba(79,142,247,0.3)', borderRadius: 999, padding: '6px 16px', marginBottom: 28 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'blink 1.5s infinite' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase' }}>Desarrollo Web · Backend</span>
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 20, color: 'var(--text)' }}>
          Validaciones y<br />
          <span style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Manejo de Excepciones
          </span>
        </h1>

        {/* Pregunta guía */}
        <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 20, marginBottom: 48 }}>
          <p style={{ color: 'var(--text2)', fontSize: 16, fontStyle: 'italic', maxWidth: 680, lineHeight: 1.7 }}>
            ¿Cómo debe responder una aplicación cuando el usuario envía datos incorrectos o cuando ocurre un error durante la ejecución?
          </p>
        </div>

        {/* Importancia cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {puntos.map((p, i) => (
            <div key={i} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '20px 22px',
              animation: `fadeIn 0.5s ease ${i * 0.08}s both`,
              transition: 'border-color 0.2s, transform 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
