import express from 'express'
const app = express();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Suma
app.get('/suma/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);

  const resultado = num1 + num2;

  res.send(`El resultado de su suma es: ${resultado}`);
});

//Resta
app.get('/resta/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);

  const resultado = num1 - num2;

  res.send(`El resutlado de su restas es: ${resultado}`);
});

//Multiplicacion
app.get('/mult/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);

  const resultado = num1 * num2;

  res.send(`El resultado de su multiplicacion es: ${resultado}`);
});

//Divicion
app.get('/div/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);

  const resultado = num1 / num2;

  res.send(`El resultado de su divicion es: ${resultado}`);
});

app.listen(3000, () => {
  console.log("Servidor en funcionamiento en el puerto 3000");
});

