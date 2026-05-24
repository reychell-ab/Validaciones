import React, { useState } from 'react';
import NavBar from './components/NavBar.jsx';
import SeccionInicio from './components/SeccionInicio.jsx';
import SeccionHTTP from './components/SeccionHTTP.jsx';
import SeccionPractica from './components/SeccionPractica.jsx';
import SeccionCodigo from './components/SeccionCodigo.jsx';
import SeccionRespuesta from './components/SeccionRespuesta.jsx';
import SeccionConclusion from './components/SeccionConclusion.jsx';

export default function App() {
  const [respuesta, setRespuesta] = useState(null);

  const handleRespuesta = (r) => {
    setRespuesta(r);
    // Scroll to respuesta section after a short delay
    setTimeout(() => {
      document.getElementById('respuesta')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div>
      <NavBar />
      <main>
        <SeccionInicio />
        <SeccionHTTP />
        <SeccionPractica onRespuesta={handleRespuesta} />
        <SeccionCodigo />
        <SeccionRespuesta respuesta={respuesta} />
        <SeccionConclusion />
      </main>

      {/* Footer */}
      <footer style={{
        padding: '24px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
        textAlign: 'center',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text3)' }}>
          backend.edu · Validaciones y Manejo de Excepciones · Desarrollo Web
        </span>
      </footer>
    </div>
  );
}
