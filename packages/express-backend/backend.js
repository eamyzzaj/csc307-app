// backend.js
import express from "express";
import cors from "cors";
import services from "./models/user-services.js"

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

  app.get("/users", (req, res) => {
      // declaring request variables
      // req.query asks what is user requesting
      // this is the submission button
      const name = req.query.name
      const job = req.query.job

      services.getUsers(name, job)
      //.then() is promise of what backend will send
      // users is made-up variable from me
      // mongoose / user_services is way to link to db
      // .then(users => res.send({users_lists: users}))
      // .catch(error => res.status(500).send('Error: Request not completed'))
        .then((result) => {
          if (result) res.status(200).send(result);
          else res.status(400).send(`Users not found`);
        })
        .catch((error) => {
          res.status(500).send(error.name);
        });

  });

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id

    services.findUserById(id)
      .then((result) => {
        if (result) res.send(result);
        else res.status(404).send(`Not Found: ${id}`);
      })
      .catch((error) => {
        res.status(500).send(error.name);
      });
    }); 

    
app.post("/users", async (req, res) => {
    const userToAdd = req.body;

    services
      .addUser(userToAdd)
      .then((result) => res.status(201).send(result));
    });

  
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  services
    .deleteUserById(id)
    .then((result) => {
      if (result.success) {
        res.status(204).send(); // No content on successful deletion
      } else {
        res.status(404).json({ message: result.message });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error", error });
    });
  });

