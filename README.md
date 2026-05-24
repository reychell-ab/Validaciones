# 🎓 backend.edu — Validaciones y Manejo de Excepciones

Aplicación educativa interactiva sobre manejo de excepciones y validaciones en el backend.

## Pregunta guía
> ¿Cómo debe responder una aplicación cuando el usuario envía datos incorrectos o cuando ocurre un error durante la ejecución?

## Secciones
1. **Inicio** — Importancia de validar datos y manejar errores
2. **Códigos HTTP** — 200, 201, 400, 404, 500 con ejemplos interactivos
3. **Registro de Productos** — Formulario interactivo con validación real
4. **Código y Explicación** — Código fuente con syntax highlighting
5. **Respuesta JSON** — Visualización de la respuesta del servidor
6. **Conclusión** — Reglas de oro del backend

## Instalación y ejecución

### Con pnpm (recomendado)
\`\`\`bash
pnpm install
pnpm dev
\`\`\`

### Con npm
\`\`\`bash
npm install
npm run dev
\`\`\`

Luego abre: http://localhost:5173

## Tecnologías
- React 18
- Vite 5
- JavaScript puro (sin librerías de UI externas)
- CSS-in-JS con variables CSS

## Estructura del proyecto
\`\`\`
src/
├── App.jsx                    # Componente raíz
├── main.jsx                   # Entry point
├── index.css                  # Variables CSS globales y animaciones
├── validacion.js              # Lógica de validación del backend
└── components/
    ├── NavBar.jsx             # Navegación fija
    ├── SeccionInicio.jsx      # Pantalla de bienvenida e importancia
    ├── SeccionHTTP.jsx        # Códigos de estado HTTP
    ├── SeccionPractica.jsx    # Formulario interactivo
    ├── SeccionCodigo.jsx      # Código con syntax highlighting
    ├── SeccionRespuesta.jsx   # Visualización JSON
    └── SeccionConclusion.jsx  # Conclusiones y regla de oro
\`\`\`
