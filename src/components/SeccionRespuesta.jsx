import React, { useEffect, useRef } from 'react';

export default function SeccionRespuesta({ respuesta }) {
  const ref = useRef(null);

  useEffect(() => {
    if (respuesta && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [respuesta]);

  const isEmpty = !respuesta;
  const isOk = respuesta?.ok;

  return (
    <section id="respuesta" style={{ padding: '80px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }} ref={ref}>
        <SectionHeader
          tag="Respuesta JSON"
          title="Respuesta del Servidor"
          subtitle="Aquí verás la respuesta generada por el backend después de intentar registrar el producto."
        />

        {isEmpty ? (
          <div style={{
            background: 'var(--surface)', border: '1px dashed var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '48px 24px',
            textAlign: 'center', color: 'var(--text3)',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.5 }}>📭</div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>
              Todavía no hay respuesta.<br />Usa el formulario de arriba para generar una.
            </p>
          </div>
        ) : (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Status banner */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 20px', borderRadius: '12px 12px 0 0',
              background: isOk ? 'rgba(34,197,94,0.15)' : 'rgba(244,63,94,0.15)',
              border: `1px solid ${isOk ? '#22c55e' : '#f43f5e'}`,
              borderBottom: 'none',
            }}>
              <span style={{ fontSize: 24 }}>{isOk ? '✅' : '❌'}</span>
              <div>
                <div style={{ fontWeight: 700, color: isOk ? '#22c55e' : '#f43f5e', fontSize: 15 }}>
                  {isOk ? 'Registro exitoso' : 'Datos inválidos'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>
                  Código HTTP: <code style={{ fontFamily: 'var(--mono)', color: isOk ? '#22c55e' : '#f59e0b' }}>{isOk ? '201 Created' : '400 Bad Request'}</code>
                </div>
              </div>
              <div style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)' }}>
                Content-Type: application/json
              </div>
            </div>

            {/* JSON block */}
            <div style={{
              background: '#0d111c', border: `1px solid ${isOk ? '#22c55e' : '#f43f5e'}`,
              borderTop: 'none', borderRadius: '0 0 12px 12px',
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 18px', borderBottom: '1px solid var(--border)', background: '#0a0d16' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)' }}>response.json()</span>
                <CopyButton text={JSON.stringify(respuesta, null, 2)} />
              </div>
              <pre style={{
                padding: '22px', margin: 0, overflowX: 'auto',
                fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 1.8,
              }}>
                <JsonHighlight obj={respuesta} />
              </pre>
            </div>

            {/* Explanation */}
            <div style={{ marginTop: 20, padding: '16px 20px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
                {isOk
                  ? <>✅ El campo <code style={{ color: '#22c55e', fontFamily: 'var(--mono)' }}>ok: true</code> indica que todos los datos son válidos y el producto fue registrado. El campo <code style={{ color: '#22c55e', fontFamily: 'var(--mono)' }}>datos</code> contiene el producto guardado.</>
                  : <>❌ El campo <code style={{ color: '#f43f5e', fontFamily: 'var(--mono)' }}>ok: false</code> indica que hubo un error de validación. El campo <code style={{ color: '#f43f5e', fontFamily: 'var(--mono)' }}>mensaje</code> explica exactamente qué salió mal. El backend <strong>no guardó nada</strong>.</>
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function JsonHighlight({ obj }) {
  const json = JSON.stringify(obj, null, 2);
  const colored = json
    .replace(/("(?:ok|mensaje|datos|nombre|categoria|precio|existencia)")\s*:/g, '<key>$1</key>:')
    .replace(/:\s*(true|false|null)/g, ': <bool>$1</bool>')
    .replace(/:\s*(".*?")/g, ': <str>$1</str>')
    .replace(/:\s*(\d+)/g, ': <num>$1</num>');

  return (
    <span dangerouslySetInnerHTML={{
      __html: colored
        .replace(/<key>(.*?)<\/key>/g, '<span style="color:#4f8ef7">$1</span>')
        .replace(/<bool>(.*?)<\/bool>/g, '<span style="color:#f59e0b;font-weight:600">$1</span>')
        .replace(/<str>(.*?)<\/str>/g, '<span style="color:#22c55e">$1</span>')
        .replace(/<num>(.*?)<\/num>/g, '<span style="color:#f97316">$1</span>')
    }} />
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={copy} style={{
      background: 'var(--surface2)', border: '1px solid var(--border)',
      color: copied ? 'var(--success)' : 'var(--text3)',
      padding: '4px 12px', borderRadius: 6, cursor: 'pointer',
      fontFamily: 'var(--mono)', fontSize: 11, transition: 'all 0.2s',
    }}>
      {copied ? '✓ Copiado' : '⎘ Copiar'}
    </button>
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
