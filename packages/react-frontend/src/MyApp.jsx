// src/MyApp.jsx
import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';


function MyApp() {

  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );
  
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
  
  // modified
  function removeOneCharacter(index) {
      // const updated = characters.filter((character, i) => {
      //   return i !== index;
      // });
      // setCharacters(updated);
      const userId = characters[index].id;

      fetch(`http://localhost:8000/users/${userId}`, {
        method: 'DELETE'
      })
      .then((response) => {
          if (response.status === 204) {
            console.log({ message: "User was able to be deleted"});
            const updated = characters.filter((character, i) => {
                return i !== index;
            });
            setCharacters(updated);
          }
          else if (response.status === 404) {
            console.log({ error: "User not found" });
          }
          else {
            console.log({ error: "Delete not successful"});
          }
      })
      .catch((error) => {
          console.log({ error: "Delete not successful" }, error);
      });
  }


  function updateList(person) {
      setCharacters([...characters, person]);
  }
  
  function updateList(person) { 
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          console.log("If statement inside updateList reached");
          setCharacters([...characters, person])
        }
        else {
          console.log("Response other than 201 received, user not added on frontend")
        }
      })
      //.then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      })
  }

  return (
      <div className="container">
          <Table 
           characterData={characters}
           removeCharacter={removeOneCharacter} 
          />
          <Form handleSubmit={updateList}/>
      </div>
    );

  
}



export default MyApp;