const express = require('express')
const app = express();
const mysql = require('mysql2')
const port = 8082;

// Configurar la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydatabase',
});

//Verificar la conexión a la base de datos MySQL
db.connect((err) => {
    if (err) {
        console.err('Error de conexión a la base de datos', err);
    } else {
        console.log('Conexiónn exitosa a la base de datos.');
    }
});

//Configurar el motor de vistas
app.set('view engine', 'ejs');

//Middleware para el manejo de datos del formulario
app.use(express.urlencoded({ extended: true }));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.render('index')
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    //Consultar a la base de datos para verificar las credenciales
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta;', err);
            res.send('Error en la consulta');
            return;
        }

        if (results.length > 0) {
            res.send('Inicio de sesión exitoso');            
        } else {
            res.send('Credenciales incorrectas');
        }
    });
});


// Ruta PUT - actualizar datos del usuario
app.put('/prueba/:id', (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;
  db.query('UPDATE prueba SET username = ?, password = ? WHERE id = ?', [username, password, userId], (err, results) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Usuario actualizado correctamente', rowsAffected: results.affectedRows });
  });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});