import React, { useState } from 'react';

const codeValidar = `function validarProducto(producto) {
  if (!producto.nombre || producto.nombre.trim() === "") {
    throw new Error("El nombre del producto es obligatorio");
  }

  if (!producto.categoria || producto.categoria.trim() === "") {
    throw new Error("La categoría del producto es obligatoria");
  }

  if (producto.precio <= 0) {
    throw new Error("El precio debe ser mayor que cero");
  }

  if (producto.existencia < 0) {
    throw new Error("La existencia no puede ser negativa");
  }

  return true;
}`;

const codeRegistrar = `function registrarProducto(producto) {
  try {
    validarProducto(producto);

    return {
      ok: true,
      mensaje: "Producto registrado correctamente",
      datos: producto
    };
  } catch (error) {
    return {
      ok: false,
      mensaje: error.message,
      datos: null
    };
  }
}`;

const explicaciones = [
  { keyword: 'validarProducto()', color: '#4f8ef7', desc: 'Revisa si cada campo cumple las reglas del negocio. Si detecta un error, lanza una excepción en lugar de continuar.' },
  { keyword: 'throw new Error()', color: '#f59e0b', desc: 'Genera una excepción con un mensaje descriptivo. Detiene la ejecución y transfiere el control al bloque catch.' },
  { keyword: 'try { }', color: '#22c55e', desc: 'Intenta ejecutar el registro del producto. Si validarProducto() lanza un error, salta al bloque catch automáticamente.' },
  { keyword: 'catch (error) { }', color: '#f43f5e', desc: 'Captura la excepción lanzada. Lee el mensaje del error y construye una respuesta JSON con ok: false para el cliente.' },
];

export default function SeccionCodigo() {
  const [tab, setTab] = useState(0);

  return (
    <section id="codigo" style={{ padding: '80px 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <SectionHeader
          tag="Código Fuente"
          title="Cómo funciona la validación"
          subtitle="El backend usa dos funciones: una para validar y otra para registrar con manejo de errores."
        />

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['validarProducto()', 'registrarProducto()'].map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding: '8px 18px', borderRadius: 8,
              background: tab === i ? 'var(--accent)' : 'var(--surface)',
              border: `1px solid ${tab === i ? 'var(--accent)' : 'var(--border)'}`,
              color: tab === i ? '#fff' : 'var(--text2)',
              fontFamily: 'var(--mono)', fontSize: 12, cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              {t}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div style={{
          background: '#0d111c', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          marginBottom: 28,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px', borderBottom: '1px solid var(--border)', background: '#0a0d16' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#f43f5e', '#f59e0b', '#22c55e'].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)', marginLeft: 6 }}>
              validacion.js
            </span>
          </div>
          <pre style={{
            padding: '20px 22px', overflowX: 'auto', margin: 0,
            fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 1.75,
            color: '#c9d1d9',
          }}>
            <CodeHighlight code={tab === 0 ? codeValidar : codeRegistrar} />
          </pre>
        </div>

        {/* Explicaciones */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {explicaciones.map((e, i) => (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '18px 20px',
              borderLeft: `3px solid ${e.color}`,
              animation: `fadeIn 0.4s ease ${i * 0.07}s both`,
            }}>
              <code style={{ fontFamily: 'var(--mono)', fontSize: 12, color: e.color, display: 'block', marginBottom: 8 }}>
                {e.keyword}
              </code>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeHighlight({ code }) {
  const keywords = ['function', 'if', 'throw', 'new', 'return', 'try', 'catch', 'true', 'false', 'null'];
  const lines = code.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        let parts = [line];
        let coloredLine = line
          .replace(/(".*?")/g, '<str>$1</str>')
          .replace(/\b(function|if|throw|new|return|try|catch|true|false|null)\b/g, '<kw>$1</kw>')
          .replace(/\b(\d+)\b/g, '<num>$1</num>');

        return (
          <div key={i} style={{ display: 'flex' }}>
            <span style={{ color: '#3d4a5e', minWidth: 32, userSelect: 'none', textAlign: 'right', marginRight: 16, fontSize: 11 }}>{i + 1}</span>
            <span dangerouslySetInnerHTML={{
              __html: coloredLine
                .replace(/<kw>(.*?)<\/kw>/g, '<span style="color:#7c5fe6;font-weight:600">$1</span>')
                .replace(/<str>(.*?)<\/str>/g, '<span style="color:#22c55e">$1</span>')
                .replace(/<num>(.*?)<\/num>/g, '<span style="color:#f59e0b">$1</span>')
            }} />
          </div>
        );
      })}
    </>
  );
}

function SectionHeader({ tag, title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase' }}>{tag}</span>
      <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, fontFamily: 'var(--mono)', marginTop: 6, marginBottom: 12 }}>{title}</h2>
      {subtitle && <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 600, lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  );
}
