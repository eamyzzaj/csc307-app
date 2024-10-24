// backend.js
import express from "express";
import cors from "cors";
import services from "./models/user-services.js"
//services.method()
//ex. services.getUsers(param, param)

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


const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);
  
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

const addUser = (user) => {
    user["users_list"].push(user);
    return user;
    };

const assignRandomId = () => {
    console.log("Random Id created!")
    const result = Math.floor(Math.random() * 100000);
    return result;
};
    
app.post("/users", async (req, res) => {
    const userToAdd = req.body;

    services
      .addUser(userToAdd)
      .then((result) => res.status(201).send(result));
    });

const deleteUserById = (userId) => {
    const userIndex = users["users_list"].findIndex((user) => user.id === userId);
    users["users_list"].splice(userIndex, 1);
    return userId;
   
};
  
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const deletedUser = deleteUserById(userId);

  if (deletedUser) {
    res.status(204).send(deletedUser);
  }
  else {
    res.status(404).send("Error: User not found")
  }

});

