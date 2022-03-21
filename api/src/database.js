const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/DBcontact";
mongoose.connect(URI, {});

const db = mongoose.connection;
db.on('error', ()=> console.log('Error en la conexion'));
db.once('open', () => console.log('DB conectada'));