const express = require('express'); // npm install express

const app = express();
const port = 3000;

// Express JSON Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Tasks
let tasks = [
  { id: '01', title: 'hallo' },
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
    response.status(400).send('Bad Request');
  }
});

// gibt einen einzelnen Task zurück
app.get('/tasks/:id', (request, response) => {
  const findTask = tasks.find((task) => task.id === request.params.id);
  if (findTask !== undefined) {
    response.status(200).send(findTask);
  } else {
    response.status(404).send('Task not found');
  }
});

// verändert einen bestehenen Task und gibt diesen zurück
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
// ########### noch einfügen, wenn es die id nicht gibt
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

// ###################### Authentifizierung  (ev. später in anderes File)

// app.post('/login', (request, response) => {
//   const { email, password } = request.body;
//   const secretAdminCredentials = request.body;
//   // Check the credentials against store
//   if (
//     email?.toLowerCase() === secretAdminCredentials.email
//     && password === secretAdminCredentials.password
//   ) {
//     // Link email to session
//     request.session.email = email;
//     return response.status(200).json({ email: request.session.email });
//   }
//   return response.status(401).json({ error: 'Invalid credentials' });
// });

// Server
app.listen(port);
