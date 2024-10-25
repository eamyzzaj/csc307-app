// src/Table.jsx
import React from "react";

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
          <th>ID</th>
          <th>Remove</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody(props) {
    console.log("Table body props is", props);
    const rows = props.characterData.map((row, index) => {
      // Add another check to avoid mapping over undefined/null rows
      if (!row) {
          return null;
      }
        console.log("Row in TableBody is ", row);
        return (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.job}</td>
            <td>{row._id}</td>
            <td>
                <button onClick={() => props.removeCharacter(index)}>
                 Delete
                </button>
            </td>
          </tr>
        );
       }
      );
      
      return (
          <tbody>
            {rows}
           </tbody>
       );
       
  }


function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody 
         characterData={props.characterData}
         removeCharacter={props.removeCharacter}
        />
      </table>
    );
}

export default Table;