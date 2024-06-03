const express = require('express')
const app = express();
const mysql = require('mysql2');
const path = require('path');
const port = 8080;

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas específicas para servir los archivos HTML
app.get('/templates/sobrenosotros_galeria/sobrenosotros_galeria/sobrenosotros.html', (req, res) => {
    const filePath = path.join(__dirname, 'templates/sobrenosotros_galeria/sobrenosotros_galeria/sobrenosotros.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Archivo no encontrado');
        }
    });
});

app.get('/templates/sobrenosotros_galeria/sobrenosotros_galeria/galeria.html', (req, res) => {
    const filePath = path.join(__dirname, 'templates/sobrenosotros_galeria/sobrenosotros_galeria/galeria.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Archivo no encontrado');
        }
    });
});

app.get('/templates/experiencia/experiencia.html', (req, res) => {
    const filePath = path.join(__dirname, 'templates/experiencia/experiencia.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Archivo no encontrado');
        }
    });
});


// HandlebarsS
app.get('/ingreso', (req, res) => {
    res.sendFile(__dirname + '/public/ingreso.html')
});

// Handlebars
app.get('/registro', (req, res) => {
    res.sendFile(__dirname + '/public/registro.html')
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});