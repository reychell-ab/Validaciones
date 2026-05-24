import React, { useState } from 'react';
import { registrarProducto } from '../validacion.js';

const categorias = ['Alimentos', 'Bebidas', 'Electrónica', 'Ropa', 'Hogar', 'Juguetes'];

const VALIDO = { nombre: 'Café artesanal', categoria: 'Alimentos', precio: '3500', existencia: '20' };
const INVALIDO = { nombre: '', categoria: '', precio: '-100', existencia: '-5' };

export default function SeccionPractica({ onRespuesta }) {
  const [form, setForm] = useState({ nombre: '', categoria: '', precio: '', existencia: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = (f) => {
    const e = {};
    if (!f.nombre?.trim()) e.nombre = 'El nombre es obligatorio';
    if (!f.categoria?.trim()) e.categoria = 'La categoría es obligatoria';
    if (!f.precio || Number(f.precio) <= 0) e.precio = 'El precio debe ser mayor que cero';
    if (f.existencia === '' || Number(f.existencia) < 0) e.existencia = 'La existencia no puede ser negativa';
    return e;
  };

  const handleChange = (field, value) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);
    if (touched[field]) {
      setErrors(validate(newForm));
    }
  };

  const handleBlur = (field) => {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = () => {
    const allTouched = { nombre: true, categoria: true, precio: true, existencia: true };
    setTouched(allTouched);
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const primerError = Object.values(e)[0];
      const result = { ok: false, mensaje: primerError, datos: null };
      setLoading(true);
      setTimeout(() => { onRespuesta(result); setLoading(false); }, 600);
      return;
    }
    const producto = { nombre: form.nombre.trim(), categoria: form.categoria, precio: Number(form.precio), existencia: Number(form.existencia) };
    setLoading(true);
    setTimeout(() => {
      const result = registrarProducto(producto);
      onRespuesta(result);
      setLoading(false);
    }, 600);
  };

  const fill = (preset) => {
    setForm(preset);
    setTouched({});
    setErrors({});
  };

  const inputStyle = (field) => ({
    width: '100%', padding: '11px 14px', borderRadius: 8,
    background: 'var(--bg)',
    border: `1px solid ${errors[field] && touched[field] ? 'var(--error)' : 'var(--border)'}`,
    color: 'var(--text)', fontSize: 14, fontFamily: 'var(--sans)',
    outline: 'none', transition: 'border-color 0.2s',
  });

  return (
    <section id="practica" style={{ padding: '80px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <SectionHeader
          tag="Práctica Interactiva"
          title="Registro de Productos"
          subtitle="Completa el formulario. El backend validará cada campo antes de aceptar el registro."
        />

        {/* Quick fill buttons */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          <button onClick={() => fill(VALIDO)} style={quickBtn('#22c55e', 'rgba(34,197,94,0.12)')}>
            ✅ Probar producto válido
          </button>
          <button onClick={() => fill(INVALIDO)} style={quickBtn('#f43f5e', 'rgba(244,63,94,0.12)')}>
            ❌ Probar producto inválido
          </button>
          <button onClick={() => fill({ nombre: '', categoria: '', precio: '', existencia: '' })} style={quickBtn('var(--text3)', 'var(--surface)')}>
            ↺ Limpiar
          </button>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Nombre */}
          <Field label="Nombre del producto" required error={touched.nombre && errors.nombre} hint="Texto no vacío">
            <input
              type="text"
              placeholder="ej. Café artesanal"
              value={form.nombre}
              onChange={e => handleChange('nombre', e.target.value)}
              onBlur={() => handleBlur('nombre')}
              style={inputStyle('nombre')}
            />
          </Field>

          {/* Categoría */}
          <Field label="Categoría" required error={touched.categoria && errors.categoria} hint="Selección obligatoria">
            <select
              value={form.categoria}
              onChange={e => handleChange('categoria', e.target.value)}
              onBlur={() => handleBlur('categoria')}
              style={{ ...inputStyle('categoria'), cursor: 'pointer' }}
            >
              <option value="">-- Selecciona una categoría --</option>
              {categorias.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          {/* Precio + Existencia */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Precio" required error={touched.precio && errors.precio} hint="Mayor que 0">
              <input
                type="number"
                placeholder="ej. 3500"
                value={form.precio}
                onChange={e => handleChange('precio', e.target.value)}
                onBlur={() => handleBlur('precio')}
                style={inputStyle('precio')}
              />
            </Field>
            <Field label="Existencia" required error={touched.existencia && errors.existencia} hint="≥ 0">
              <input
                type="number"
                placeholder="ej. 20"
                value={form.existencia}
                onChange={e => handleChange('existencia', e.target.value)}
                onBlur={() => handleBlur('existencia')}
                style={inputStyle('existencia')}
              />
            </Field>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginTop: 8,
              padding: '13px 24px',
              background: loading ? 'var(--surface2)' : 'linear-gradient(135deg, var(--accent), var(--accent2))',
              border: 'none', borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer',
              color: '#fff', fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15,
              transition: 'opacity 0.2s', opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? '⏳ Validando...' : '🚀 Registrar producto'}
          </button>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, error, hint, children }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
          {label} {required && <span style={{ color: 'var(--error)' }}>*</span>}
        </label>
        <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{hint}</span>
      </div>
      {children}
      {error && (
        <p style={{ marginTop: 5, fontSize: 12, color: 'var(--error)', animation: 'fadeIn 0.2s ease' }}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

function quickBtn(color, bg) {
  return {
    padding: '8px 16px', borderRadius: 8,
    background: bg, border: `1px solid ${color}40`,
    color: color, fontSize: 13, fontWeight: 500,
    cursor: 'pointer', fontFamily: 'var(--sans)',
    transition: 'opacity 0.2s',
  };
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
