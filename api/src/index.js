const app = require('./app');


//conexion a bases de datos
require('./database');
app.set('port', process.env.PORT || 4000);

function init() {
    app.listen(app.get('port'));
    console.log('Server on port: ', app.get('port'))
}

init();