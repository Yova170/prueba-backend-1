import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hola Equipo!!');
});


app.listen(3000, () => {
  console.log(`Aplicación corriendo en el puerto 3000`);
});

