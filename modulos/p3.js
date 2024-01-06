import express from 'express';
import fs from "fs";
import bodyParser from "body-parser"


const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send('Problema numero 3')
})

//Leer Datos
const readData = () =>{
  try {
    const data = fs.readFileSync("./tareas.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return { rednblue: [] }; 
  }
  
};

//Leer data
const writeData = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync('tareas.json', jsonData);
};

  //leer
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

//Puerto de Comunicacion
app.listen(3000, () => {
  console.log(`Apliacacion Corriendo en Puerto:3000`)
})
