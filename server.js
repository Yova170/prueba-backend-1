import express from 'express';
import fs from "fs";
import bodyParser from "body-parser"


const app = express()
app.use(bodyParser.json())

// 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
//Problema 1
  app.get('/', (req, res) => {
    res.send('Hola Equipo!!');
  });

//Prolmema 2

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

  //multiplicacion
  app.get('/mult/:num1/:num2', (req, res) => {
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);

    const resultado = num1 * num2;

    res.send(`El resultado de su multiplicacion es: ${resultado}`);
  });

  //division
  app.get('/div/:num1/:num2', (req, res) => {
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);

    const resultado = num1 / num2;

    res.send(`El resultado de su divicion es: ${resultado}`);
  });


//Prolmema 3

  //leer datos
  const readData = () =>{
    try {
      const data = fs.readFileSync("./tareas.json");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return { rednblue: [] };
    }
    
  };

  //Escribir data
  const writeData = (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('tareas.json', jsonData);
  };

  //Mostrar todos los datos
  app.get('/rnb', (req, res) => {
    const data = readData();
    res.json(data.rednblue);
  });

  // Buscar por id
  app.get('/rnb/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const rnb = data.rednblue.find((rednblue) => rednblue.id === id); 
    res.json(rnb);
    
  });

  //Agregar 
  app.get('/add/:name/:desc/:status', (req, res) => {
    const name = req.params.name;
    const desc = req.params.desc;
    const status = req.params.status;

    const data = readData();

    const newsuc = {
      id: data.rednblue.length + 1,
      name: name,
      desc: desc,
      status: status
      
    }
    
    data.rednblue.push(newsuc);
    writeData(data);
    res.json(newsuc);
    
  });

  //eliminar
  app.get('/del/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    data.rednblue = data.rednblue.filter(item => item.id !== id);
    writeData(data);

    res.json({ message: "Elemento eliminado Correctamente" });
    
  })

  //actualizar
  app.get('/act/:id/:name/:desc/:status', (req, res) => {
      const id = parseInt(req.params.id);
      const name = req.params.name;
      const desc = req.params.desc;
      const status = req.params.status;

      const data = readData();

      const tareaActualizada = {
          id: id,
          name: name,
          desc: desc,
          status: status
      };

      const tareaIndex = data.rednblue.findIndex(item => item.id === id);
      
      if (tareaIndex !== -1) {
          data.rednblue[tareaIndex] = tareaActualizada;
          writeData(data);
          res.json({ message: 'Tarea actualizada correctamente', tareaActualizada });
      } else {
          res.status(404).json({ error: 'Tarea no encontrada' });
      }
    });

//puerto de comunicacion 3000    
app.listen(3000, () => {
  console.log(`Apliacacion Corriendo en Puerto:3000`)
})
