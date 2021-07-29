const express = require("express");
const app = express();

app.use(express.json());

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(people);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has information for ${
      people.length
    } people.</p><p>${Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = people.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.send(
      "<h1>404</h1><p>Error!  That note id could not be found in the dataset.</p>"
    );
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  person = people.filter((p) => p.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const new_number = {
    id: parseInt(Math.random(0, 100000) * 100000),
    name: body.name,
    number: body.number,
  };
  people = people.concat(new_number);
  response.json(new_number);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App listening on: ${PORT}`);
});
