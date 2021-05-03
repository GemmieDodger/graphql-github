import React from 'react';
import '../App.css';
import fetchGraphQL from '../fetchGraphQL';
import {
  Link
} from "react-router-dom";
const { useState, useEffect } = React;
// EXPLORER: https://docs.github.com/en/graphql/overview/explorer
//repository(owner: "gemmiedodger" name: "boathook") {
 // name
//}
function App() {
  // We'll load the name of a repository, initially setting it to null
  const [name, setName] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  // When the component mounts we'll fetch a repository name
  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
      query UserQuery {
        user(login: "gemmiedodger") {
          name
          createdAt
        }
      }
    `).then(response => {
      // Avoid updating state if the component unmounted before the fetch completes
      if (!isMounted) {
        return;
      }
      const data = response.data;
      console.log(data)
      setName(data.user.name);
      setCreatedAt(data.user.createdAt);
    }).catch(error => {
      console.error(error);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Render "Loading" until the query completes
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {name != null ? `This GitHub showcase belongs to: ${name}` : "Loading"}
        </h1>
        <p>Part of GitHub since {createdAt}</p>
        <Link to="./UserDetail"><button>See more here</button></Link>
      </header>
    </div>
  );
}

export default App;