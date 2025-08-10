const app = require('./app');
require('./jobs/purgeDeleted');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor escuchando a http://localhost:' + PORT);
});