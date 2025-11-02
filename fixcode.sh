# Backup de código importante
mkdir backup
cp -r src backup/

# Crear una app React mínima funcional
rm -rf src
mkdir -p src/{components,pages}

# App.jsx mínimo
cat >src/App.jsx <<'EOF'
import React from 'react';

function App() {
  return (
    <div>
      <h1>TicketBoard - Vite + React</h1>
      <p>Application is working!</p>
    </div>
  );
}

export default App;
EOF

# main.jsx mínimo
cat >src/main.jsx <<'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# index.css mínimo
cat >src/index.css <<'EOF'
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
EOF

# Probar build
npm run build
