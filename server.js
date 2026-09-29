// SERVER.JS — Express Backend API & Web Portal Server for console-fix-api

const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'console-fix-api',
        timestamp: new Date().toISOString()
    });
});

// 3. Integración de Rutas de la API (si existe la carpeta /routes)
try {
    const ticketRoutes = require('./routes/tickets');
    app.use('/api/tickets', ticketRoutes);
} catch (err) {
    console.log('ℹ️ Opcional: No se encontró /routes/tickets. Continuando...');
}

try {
    const userRoutes = require('./routes/users');
    app.use('/api/users', userRoutes);
} catch (err) {
    console.log('ℹ️ Opcional: No se encontró /routes/users. Continuando...');
}

// 4. Servir Archivos Estáticos del Portal Web (desde la carpeta /web-portal)
const webPortalPath = path.join(__dirname, 'web-portal');
app.use(express.static(webPortalPath));
app.use(express.static(__dirname));

// 5. Ruta de Respaldo para el Portal Web
app.get('*', (req, res) => {
    const indexPath = path.join(webPortalPath, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            // Respaldar si index.html está en la raíz
            res.sendFile(path.join(__dirname, 'index.html'));
        }
    });
});

// 6. Iniciar Servidor
app.listen(PORT, () => {
    console.log(`🚀 console-fix-api corriendo en el puerto ${PORT}`);
    console.log(`🌐 Sirviendo Web Portal desde: ${webPortalPath}`);
});
