const express = require('express'); // npm install express
const session = require('express-session');
const swaggerAutogen = require('swagger-autogen');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {},
}));

swaggerAutogen('./swagger_output.json', ['./server.js']);
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerAutogen));

// Tasks
let tasks = [
  {
    id: '01', title: 'documentation', author: 'Rahel', creationDate: '22.12.2023', fulfillmentDate: '',
  },
]; // { id: "", title: "", author: "", creationDate: "", fulfillmentDate: "" }

// gibt eine Liste aller Tasks zurück
app.get('/tasks', (request, response) => {
  response.status(200).send(tasks);
});

// erstellt einen neuen Task und gibt diesen zurück
// ################ noch eine random uuid machen
// ################ 400 funktioniert noch nicht
app.post('/tasks', (request, response) => {
  if (request.body) {
    // let uuid = randomUUID();
    tasks.push(request.body);
    response.status(201).send(tasks);
  } else {
    response.status(400).send({ error: 'Bad Request' });
  }
});

// gibt einen einzelnen Task zurück
app.get('/tasks/:id', (request, response) => {
  const findTask = tasks.find((task) => task.id === request.params.id);
  if (findTask !== undefined) {
    response.status(200).send(findTask);
  } else {
    response.status(404).send({ error: 'Task not found' });
  }
});

// verändert einen bestehenen Task und gibt diesen zurück
// basiert auf dem Quellcode von R. Bühler (Aufgabe 4-3)
app.patch('/tasks/:id', (request, response) => {
  const findTask = tasks.find((task) => task.id === request.params.id);
  if (findTask !== undefined) {
    const keys = Object.keys(request.body);
    const oldTask = tasks.find((task) => task.id === request.params.id);
    keys.forEach((key) => {
      oldTask[key] = request.body[key];
    });
    tasks = tasks.map((task) => (task.id === request.params.id ? oldTask : task));
    response.status(200).send(tasks);
  } else {
    response.status(404).send({ error: 'Task not found' });
  }
});

// löscht einen bestehenden Task aus der Liste
app.delete('/tasks/:id', (request, response) => {
  const { id } = request.params;
  const deletedTask = tasks.find((task) => task.id === request.params.id);
  if (deletedTask !== undefined) {
    tasks = tasks.filter((task) => (task.id !== id));
    response.status(200).send(`You deleted this book: ${JSON.stringify(deletedTask)}`);
  } else {
    response.status(404).send({ error: 'Task not found' });
  }
});

// Authentifizierung
app.post('/login', (request, response) => {
  const { email, password } = request.body;
  if (email !== undefined && password === 'm295') {
    request.session.email = email;
    return response.status(200).json({ email: request.session.email });
  }
  return response.status(401).json({ error: 'Invalid credentials' });
});

app.get('/verify', (request, response) => {
  if (request.session.email) {
    return response.status(200).json({ email: request.session.email });
  }
  return response.status(401).json({ error: 'User is not in a session' });
});

app.delete('/logout', (request, response) => {
  if (request.session.email) {
    // Link der Sitzung zurücksetzen
    request.session.email = null;
    return response.status(204).send();
  }
  return response.status(401).json({ error: 'Not logged in' });
});

// Server
app.listen(3000);
