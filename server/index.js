import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Cargar datos iniciales desde el archivo JSON
// Obtenido desde https://api.sampleapis.com/coffee/hot
const datos = JSON.parse(fs.readFileSync('server/initial-data.json', 'utf8'));
let ultimoId = 20;

app.use(bodyParser.json());
app.use(cors({origin:true,credentials: true}));

// Proveer archivos estaticos desde dist
app.use(express.static('dist'))

// Endpoint para obtener todos los cafes
app.get('/api/coffee', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(datos);
});

// Endpoint para obtener un cafe con un ID especifico
app.get('/api/coffee/:id', (req, res) => {
  const coffeeId = parseInt(req.params.id, 10);
  const coffee = datos.find(coffee => coffee.id === coffeeId);
  res.header("Access-Control-Allow-Origin", "*");

  if (coffee) {
    res.json(coffee);
  } else {
    res.status(404).json({ error: 'Coffee not found' });
  }
});

// Endpoint para añadir un nuevo cafe
app.post('/api/coffee', (req, res) => {
  const nuevoCoffee = {
    ...req.body,
    id: ++ultimoId,
  };
  datos.push(nuevoCoffee);

  res.header("Access-Control-Allow-Origin", "*");
  res.json(nuevoCoffee);
});

// Endpoint para actualizar un cafe existente
app.put('/api/coffee/:id', (req, res) => {
  const coffeeId = parseInt(req.params.id, 10);
  const updatedCoffee = req.body;
  res.header("Access-Control-Allow-Origin", "*");

  // Encontrar el indice del cafe buscando por ID
  const index = datos.findIndex(coffee => coffee.id === coffeeId);

  if (index !== -1) {
    // Actualizar el cafe con los nuevos datos
    datos[index] = { ...datos[index], ...updatedCoffee };

    res.json(datos[index]);
  } else {
    res.status(404).json({ error: 'Coffee no encontrado' });
  }
});

// Endpoint para eliminar un cafe
app.delete('/api/coffee/:id', (req, res) => {
  const coffeeId = parseInt(req.params.id, 10);
  res.header("Access-Control-Allow-Origin", "*");

  // Encontrar el indice del cafe buscando por ID
  const index = datos.findIndex(coffee => coffee.id === coffeeId);

  if (index !== -1) {
    // Elimina el cafe en el arreglo
    const deletedCoffee = datos.splice(index, 1)[0];

    res.json(deletedCoffee);
  } else {
    res.status(404).json({ error: 'Coffee no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
