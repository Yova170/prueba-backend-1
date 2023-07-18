const express = require('express');
const app = express();
const port = 3000;
var result;

app.set("query parser", (queryString) => {
  return new URLSearchParams(queryString);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//Query parameters

app.get('/suma', (req, res) => {
  if  (req.query.has('num1') && req.query.has('num2')) {
    if (isNaN(req.query.get('num1')) || isNaN(req.query.get('num2'))) res.send('Valores no válidos.')
    else {
      result = parseFloat(req.query.get('num1')) + parseFloat(req.query.get('num2'));
      res.send('Resultado de la suma: ' + result.toString());
    }
  } else res.send('Faltan datos.')
});

app.get('/resta', (req, res) => {
  if  (req.query.has('num1') && req.query.has('num2')) {
    if (isNaN(req.query.get('num1')) || isNaN(req.query.get('num2'))) res.send('Valores no válidos.')
    else {
      result = parseFloat(req.query.get('num1')) - parseFloat(req.query.get('num2'));
      res.send('Resultado de la resta: ' + result.toString());
    }
  } else res.send('Faltan datos.')
});

app.get('/multi', (req, res) => {
  if  (req.query.has('num1') && req.query.has('num2')) {
    if (isNaN(req.query.get('num1')) || isNaN(req.query.get('num2'))) res.send('Valores no válidos.')
    else {
      result = parseFloat(req.query.get('num1')) * parseFloat(req.query.get('num2'));
      res.send('Resultado de la multiplicación: ' + result.toString());
    }
  } else res.send('Faltan datos.')
});

app.get('/div', (req, res) => {
  if  (req.query.has('num1') && req.query.has('num2')) {
    if (isNaN(req.query.get('num1')) || isNaN(req.query.get('num2')) || req.query.get('num2') == '0') res.send('Valores no válidos.')
    else {
      result = parseFloat(req.query.get('num1')) / parseFloat(req.query.get('num2'));
      res.send('Resultado de la división: ' + result.toString());
    }
  } else res.send('Faltan datos.')
});

//Route parameters
//Ejemplo: /suma/num1/-20/num2/3.2

app.get('/suma/num1/:num1(-?[0-9]?[.[0-9]+]?)/num2/:num2(-?[0-9]?[.[0-9]+]?)', (req, res) => {
  result = parseFloat(req.params.num1) + parseFloat(req.params.num2);
  res.send('Resultado de la suma: ' + result.toString());
});

app.get('/resta/num1/:num1(-?[0-9]?[.[0-9]+]?)/num2/:num2(-?[0-9]?[.[0-9]+]?)', (req, res) => {
  result = parseFloat(req.params.num1) - parseFloat(req.params.num2);
  res.send('Resultado de la resta: ' + result.toString());
});

app.get('/multi/num1/:num1(-?[0-9]?[.[0-9]+]?)/num2/:num2(-?[0-9]?[.[0-9]+]?)', (req, res) => {
  result = parseFloat(req.params.num1) * parseFloat(req.params.num2);
  res.send('Resultado de la multiplicación: ' + result.toString());
});

app.get('/div/num1/:num1(-?[0-9]?[.[0-9]+]?)/num2/:num2(-?[0-9]?[.[0-9]+]?)', (req, res) => {
  result = parseFloat(req.params.num2);
  if (result == 0) res.send('La división entre cero (0) es indefinido.');
  else {
    result = parseFloat(req.params.num1) / parseFloat(req.params.num2);
    res.send('Resultado de la división: ' + result.toString());
}});

app.use(function(req, res) {
  res.status(404).send('No válido!');
});

app.use(function(err, req, res) {
  console.error(err.stack);
  res.status(500).send('Ocurrió un fallo!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});