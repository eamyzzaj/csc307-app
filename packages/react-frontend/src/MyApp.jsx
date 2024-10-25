import Table from "./Table.jsx";
import Form from "./Form.jsx";
import React, { useState, useEffect } from 'react';

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function fetchUsers() {
        return fetch("http://localhost:8000/users")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error fetching users: ${res.statusText}`);
                }
                return res.json();
            });
    }

    useEffect(() => {
        fetchUsers()
            .then((json) => {
                console.log("Fetched users:", json);
                setCharacters(json);
            })
            .catch((error) => {
                console.error("Failed to fetch users:", error);
            });
    }, []);

    function postUser(person) {
        return fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`Error adding user: ${res.statusText}`);
            }
            return res.json();
        });
    }

    function removeOneCharacter(index) {
        const userId = characters[index]._id;

        fetch(`http://localhost:8000/users/${userId}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.status === 204) {
                    console.log({ message: "User was deleted successfully" });
                    const updated = characters.filter((_, i) => i !== index);
                    setCharacters(updated);
                } else if (response.status === 404) {
                    console.log({ error: "User not found" });
                } else {
                    console.log({ error: "Delete not successful" });
                }
            })
            .catch((error) => {
                console.error({ error: "Delete not successful" }, error);
            });
    }

    function updateList(person) {
        postUser(person)
            .then((user) => {
                setCharacters([...characters, user]);
                console.log({ message: "User added!", user });
            })
            .catch((error) => {
                console.error("Failed to add user:", error);
            });
    }

    return (
        <div className="container">
            <Table 
                characterData={characters}
                removeCharacter={removeOneCharacter} 
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;
